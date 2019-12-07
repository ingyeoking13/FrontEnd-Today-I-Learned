# Dispatcher & DispatcherObject 

## **왜** `Dispatcher`가 먼저인가요?  

`WPF`프로젝트를 생성해 `Button` 객체를 선언해봅시다. 

```c#/wpf
Button btn;
```
정의 참조키 `F12`를 눌러 `Button`이 상속하는 클래스로 가봅시다.   

> `Button`<-`ButtonBase`<-`ContentControl`<-`Control`<-`FrameworkElement`<-`UIElement`<-`Visual`<-`DependencyObject`<-`DispatcherObject` 

모든 객체는 `object`를 상속하긴 하지만 편의상 위의 상속 리스트에서는 제거하였습니다.  

`F12`를 누르면서 상속을 거슬러 올라가는 길에는 여러 속성들을 볼 수 있습니다. 우리는 먼저, 맨 상위 객체인 `DispatcherObject`를 살펴봅시다.  

```cs
#region 어셈블리 WindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
// C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.2\WindowsBase.dll
#endregion

using System.ComponentModel;

namespace System.Windows.Threading
{
    // 연결 된 Dispatcher 개체를 표현합니다.
    public abstract class DispatcherObject
    {
        // DispatcherObject 클래스의 새 인스턴스를 초기화합니다.
        protected DispatcherObject();

        // 이 Dispatcher와 연결된 DispatcherObject를 가져옵니다.  
        [EditorBrowsable(EditorBrowsableState.Advanced)]
        public Dispatcher Dispatcher { get; }

        //호출 스레드가 이 DispatcherObject에 액세스할 수 있는지 여부를 확인합니다.
        [EditorBrowsable(EditorBrowsableState.Never)]
        public bool CheckAccess();
	
        //호출 스레드에서 이 DispatcherObject에 액세스할 수 있는지 확인합니다.
        // 예외: T:System.InvalidOperationException:
        // 호출 스레드가 이 DispatcherObject에 액세스할 수 없는 경우 
        [EditorBrowsable(EditorBrowsableState.Never)]
        public void VerifyAccess();
    }
}
```

생성자를 제외하고 세개의 메서드를 볼 수 있습니다. `Dispatcher` get 프로퍼티와 임의의 스레드가 `DispatcherObject`에 접근할 수 있는지 없는지 확인시켜주는 함수를 제공합니다.    

그렇다면, `DispatcherObject`의 역할은 단지 `Dispatcher`를 반환하는 역할이라고 봐도 될까요?  

중요한 내용은 `Dispatcher`에 있는 것 같으니, `Dispatcher`를 봅시다. `Dispatcher` 클래스의 역할은 한 스레드가 가질 수 있는 작업 항목에 대해 관리하는 역할을 한다고 `MSDN`에 나와있습니다.  

> Dispatcher: Provides services for managing the queue of work items for a thread.  

한 쓰레드에서 `Dispatcher`가 생성되면, 그 쓰레드와 `Dispatcher`는 일대일 관계가 되고, 해당 `Dispatcher`가 종료되어도 그 관계가 유지됩니다.  

한 쓰레드에서 `CurrentDispatcher`를 호출하여 `Dispatcher`를 얻고자 하면, 대응되는 `Dispatcher`가 없는 경우 `Dispatcher`를 생성합니다. 그리고 `DispatcherObject`를 생성할 때도, 그 객체가 생성되는 쓰레드에서 연결된 `Dispatcher`가 없는경우 `Dispatcher`도 같이 생성됩니다. 또한 백그라운드 쓰레드에서 `Dispatcher`를 생성한 경우, 쓰레드를 종료하기전 반드시 `Dispatcher`를 종료해야합니다. 

만약 `Dispatcher`가 종료된다면, 다시 시작시킬 수 없습니다. 

`MSDN`의 `Dispatcher` 내용 일부였습니다. `Dispatcher`는 쓰레드와 직접적으로 관련되어 있고, 쓰레드보다 오래 생존 할 수 도 있고, 어떤 쓰레드에서 `Dispatcher`가 종료된다면 해당 쓰레드에서 더이상 생성할 수 없다는 것을 알 수 있었습니다.   

문서를 조금더 읽어보면 `WPF` 내용이 나오는데, `DispatcherObject`는 반드시 연관된 `Dispatcher`에 의해서만 접근될 수 있다고 나옵니다. 제가 좀 더 내용을 진전시켜보자면, 자신과 연관된 `Dispatcher`가 아닌 `Dispatcher`는 속성에 접근시키지 않는 것입니다. 예로, `UI thread`가 아닌 다른 쓰레드가 `Button`의 content를 수정하기 위해선 `btn.Content = ".."`와 같은 소스는 불가능합니다. `Invoke`나 `BeginInvoke` 등으로 해당 작업을 수행할 수 있습니다. 

```xml
<Button x:Name="CreateNewThread_And_It_Accesses_TextBlock"
            MinWidth="200"
            MinHeight="50"
            HorizontalAlignment="Left"
            Click="CreateNewThread_And_It_Accesses_TextBlock_Click"
            Content="CreateNewThread_And_It_Accesses_TextBlock" />

<StackPanel Orientation="Horizontal">
    <TextBlock Text="Result : " />
    <TextBlock x:Name="resultTB" />
</StackPanel>
```

```cs 
private void CreateNewThread_And_It_Accesses_TextBlock_Click(object sender, RoutedEventArgs e)
{

    Task.Run(() =>
    {
            //bad
            resultTB.Text = "Modified in new Thread";
            /* System.InvalidOperationException: '다른 스레드가 이 개체를 소유하고 있어 호출한 스레드가 해당 개체에 액세스할 수 없습니다.' */

            //fine
             resultTB.Dispatcher?.Invoke(() => { resultTB.Text = "Modified in new Thread"; });
    });
}
```

## **W**PF에서 Dispatcher란 ...  

`Dispatcher`는 쓰레드와 1:1 대응 관계라고 앞서 이야기 했습니다. 그렇다면 `WPF`의 `Button`이 결국엔 `DispatcherObject`를 상속하였고, `DispatcherObject`는 `Dispatcher`를 반환하는 프로퍼티가 있습니다. 그렇다면 이 `Dispatcher`가 가르키는 쓰레드는 무엇일까요?  

UI Thread입니다.  

WPF에서 두 가지 쓰레드가 동작합니다. 하나는 화면을 그리는 렌더링 스레드이고, 하나는 UI 쓰레드입니다. UI 쓰레드는 입력을 받고, 이벤트를 핸들링하고, 화면을 그리고 어플리케이션 코드를 수행합니다. 대부분의 어플리케이션은 한 쓰레드만 씁니다. 어떨때는 여러개를 쓰는게 좋을 때도 있지만요. UI Thread는 작업 항목을 `Dispatcher`라고 불리는 클래스에 저장해두는데, `Dispatcher`는 우선순위에 따라 완료할 작업을 지정합니다. 모든 UI 쓰레드는 최소 하나의 `Dispatcher`를 가지고 있으며, 각 `Dispatcher` 또한 한 쓰레드에 대해서 작업항목을 수행합니다. 

WPF에서는 대부분의 클래스가 `DispatcherObject`에서 파생되고 있습니다. `DispatcherObject`는 생성자에서 현재 동작하고 있는 쓰레드를 가르키고있는 `Dispatcher`에 대한 정보를 저장해둡니다. 그리고, `DispatcherObject`는 자신을 생성한 쓰레드에 대해 종속성을 가집니다. 그래서 일반적인 방법으로, 다른 쓰레드에서 `DispatcherObject`의 속성을 변경할 수 없습니다. (Invoke, BeginInvoke를 사용해야합니다.)

마지막으로 `Dispatcher`는 작업 항목에 대해 우선순위를 가지고 있습니다. 우선순위에 따라 해당 작업이 어느 정도로 작업에 있어 우선권을 갖는지 결정됩니다. 

아래는 `WPF-Sample` 에 있는 `Single-Threaded-Application`프로젝트의 일부입니다. 이 소스는 작업 항목에 대한 우선권을 설정하는 것을 보여줍니다. 전체 프로젝트는 `MS`사의 `WPF-Sample` 리포지터리에 가면 받으실 수 있습니다.   

```cs
 private void StartOrStop(object sender, EventArgs e)
{
    if (_continueCalculating)
    {
        _continueCalculating = false;
        startStopButton.Content = "Resume";
    }
    else
    {
        _continueCalculating = true;
        startStopButton.Content = "Stop";
        startStopButton.Dispatcher.BeginInvoke(
            DispatcherPriority.Normal,
            new NextPrimeDelegate(CheckNextNumber));
    }
}

public void CheckNextNumber()
{
    var x = new Stopwatch();
    x.Start();

    // Reset flag.
    _notAPrime = false;

    for (long i = 3; i <= Math.Sqrt(_num); i++)
    {
        if (_num%i == 0)
        {
            // Set not a prime flag to true.
            _notAPrime = true;
            break;
        }
    }

    // If a prime number.
    if (!_notAPrime)
    {
        x.Stop();
        elapsed.Text = x.ElapsedMilliseconds.ToString();
        bigPrime.Text = _num.ToString();
    }

    _num += 2;
    if (_continueCalculating)
    {
//               CheckNextNumber(); // 당연히 UI쓰레드멈춤
        startStopButton.Dispatcher.BeginInvoke(
            DispatcherPriority.SystemIdle, // DispatcherPriority Enum은 여러가지가 있음, 경우에 따라 Render 수준의 우선순위를 갖게 만들수도 있음.. 이 경우 UI 멈춤 ...  
            new NextPrimeDelegate(CheckNextNumber));
    }
}
```

아래 소스는 `xaml`단의 `Button`과 메인 윈도우의 쓰레드가 같은지 체크하는 데모 소스입니다. WPF는 단 두 개의 쓰레드로 돌아가고, UI들은 모두 UI쓰레드에 돌아가니 같은 쓰레드이고 같은 `Dispatcher`를 갖습니다. 


```xml
<Button
    x:Name="MainWindow_Dispatcher_Button_Dispatcher_same_btn"
    MinWidth="200"
    MinHeight="50"
    HorizontalAlignment="Left"
    Click="MainWindow_Dispatcher_Button_Dispatcher_same_btn_Click"
Content="MainWindow_Dispatcher_Button_Dispatcher_same_btn?" />

<StackPanel Orientation="Horizontal">
    <TextBlock Text="Result : " />
    <TextBlock x:Name="resultTB" />
</StackPanel>
```

```cs
private void MainWindow_Dispatcher_Button_Dispatcher_same_btn_Click(object sender, RoutedEventArgs e)
{
        if (this.Dispatcher == MainWindow_Dispatcher_Button_Dispatcher_same_btn.Dispatcher )
        {
            resultTB.Text = "MainWindow Dispatcher, this btn Dispatcher Same!";
            if ( this.Dispatcher.Thread == MainWindow_Dispatcher_Button_Dispatcher_same_btn.Dispatcher.Thread)
            {
                resultTB.Text += Environment.NewLine;
                resultTB.Text += "and MainWindow Thread, this btn Thread Same!";
            }
            else
            {
                resultTB.Text += Environment.NewLine;
                resultTB.Text += "but MainWindow Thread, this btn Thread Diff!";
            }
        }
        else
        {
            resultTB.Text = "MainWindow Dispatcher, this btn Dispatcher Same!";
            if (this.Dispatcher.Thread == MainWindow_Dispatcher_Button_Dispatcher_same_btn.Dispatcher.Thread)
            {
                resultTB.Text += Environment.NewLine;
                resultTB.Text += "and MainWindow Thread, this btn Thread Same!";
            }
            else
            {
                resultTB.Text += Environment.NewLine;
                resultTB.Text += "but MainWindow Thread, this btn Thread Diff!";
            }
        }
    }
}

```



# 참고 UWP에서는 Button 상속은 다음과 같습니다.  

`WPF`  
>  `Button`<-`ButtonBase`<-`ContentControl`<-`Control`<-`FrameworkElement`<-`UIElement`<-`Visual`<-`DependencyObject`<-`DispatcherObject` 

`UWP`   
>  `Button`<-`ButtonBase`<-`ContentControl`<-`Control`<-`FrameworkElement`<-`UIElement`<-`DependencyObject` 

그렇다면 `Dispatcher`개념이 없을까요? 실제론 그렇지 않습니다. `UWP`에선 `DependencyObject`가 `Dispatcher`역할을 하는 `CoreDispatcher`를 멤버 변수로 가지고 있습니다. `CoreDispatcher`에 대해선 추후에 정리해보겠습니다.  

다음은 `DependencyObject`에 대해서 살펴보겠습니다.

EOF


