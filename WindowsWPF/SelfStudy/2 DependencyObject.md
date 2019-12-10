# Dependency Object & dependency property 

그다음 하위 클래스인 `Dependency Object`를 봅시다.  
이 클래스의 목적은 `dependency Property` 시스템 때문입니다.  

저는 이 문서를 정리할 때 두가지 프레임워크인-`wpf`, `uwp`에서의 정의를 살펴볼 건데, 두 프레임워크에서 사용되는 개념은 매우 닮았음에도 다른 점이 있기 때문입니다.  

우선 `wpf`에서 `dependency object`를 살펴보겠습니다. 
```cs

#region 어셈블리 WindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
#endregion

using System.ComponentModel;
using System.Windows.Markup;
using System.Windows.Threading;
using MS.Internal.ComponentModel;

namespace System.Windows
{
    [NameScopeProperty("NameScope", typeof(NameScope))]
    [TypeDescriptionProvider(typeof(DependencyObjectProvider))]
    public class DependencyObject : DispatcherObject
    {
        public DependencyObject();
        public DependencyObjectType DependencyObjectType { get; }
        public bool IsSealed { get; }
        public void ClearValue(DependencyProperty dp);
        public void ClearValue(DependencyPropertyKey key);
        public void CoerceValue(DependencyProperty dp);
     
        public sealed override bool Equals(object obj);
        public sealed override int GetHashCode();
        
        public LocalValueEnumerator GetLocalValueEnumerator();
       
        public object GetValue(DependencyProperty dp);
        public void InvalidateProperty(DependencyProperty dp);
      
        public object ReadLocalValue(DependencyProperty dp);
        public void SetCurrentValue(DependencyProperty dp, object value);
      
        public void SetValue(DependencyProperty dp, object value);
        public void SetValue(DependencyPropertyKey key, object value);

        protected virtual void OnPropertyChanged(DependencyPropertyChangedEventArgs e);
        protected internal virtual bool ShouldSerializeProperty(DependencyProperty dp);
    }
}
```

`dependencyObject` 이하 줄여서 `DO`의 상속받는 클래스는 `WPF`에서 종속성 시스템 서비스를 이용 할 수 있습니다. 종속성 시스템의 주 목적은 프로퍼티의 값을 연산하는 것과 값의 변화를 알리는 것입니다. 그리고 종속성 시스템과 연관되어있는 주요 클래스는 `DependnecyProperty`(`DP`)입니다. `DP`는 종속성 시스템에서 종속성 프로퍼티들(`dependency properties`)를 등록하고, 각 종속성 프로퍼티들에 대한 정보와 식별화를 제공해줍니다. 반면에 `DO`는 베이스 클래스로서 종속성 프로퍼티들을 사용합니다.   

그렇다면 종속성 프로퍼티는 무엇일까요?  
종속성 프로퍼티란 속성의 한 종류입니다. 윈도우즈 런타임의 일부로서 동작하는 어느 한 프로퍼티 시스템을 추적하고 영향을 받는 값을 가지고 있습니다. 앱이 런타임에 있을 때, 기존의 윈도우즈 런타임 프로퍼티 기능에서 글로벌, 인터널 프로퍼티 저장소를 제공해서 모든 종속성 프로퍼티를 저장하는 기능을 가집니다. 이 설계 패턴을 이용하면, 각 속성들이 그 속성을 정의하는 클래스 내부에 그 값을 가지고 있지 않아도 됩니다.   
인터널 프로퍼티 저장소가 특정 객체(`DO`를 상속하는)를 위해 존재하는 프로퍼티의 식별자와 값을 가지고 있다고 봐도 무방합니다. 윈도우즈 속성 시스템의 디테일한 구현 로직은 숨겨져 있지만 `xaml`의 속성 또는 코드로 작성한 프로퍼티 이름을 이용하여 종속성 프로퍼티에 한에서는 쉽게 접근 가능합니다.   

실질적으로 이 프로퍼티 시스템은 윈도우즈 에서 돌아가는 앱, `XAML` UI와 C#, VB, C++/CX 를 이용한 개발에서 이용되고 다음을 지원합니다.  

* 데이터바인딩  
* 스타일링  
* 스토리보드 애니메이션  
* PropertyChanged 동작
* Property metadata의 default value 사용  

`DO`는 다음과 같은 주요 기능을 하는데요. 크게 다섯가지로 나눌 수 있습니다. 

1. 종속성 프로퍼티(`Dependency Property`) 호스팅 지원. 내부적으로 `DependencyProperty.Register` 메서드를 호출하여 종속성 프로퍼티를 등록하고, 클래스 내부에 public static field를 두어 메서드의 리턴 값을 저장해둡니다.  
2. 연결된 프로퍼티(`Attached Property`) 호스팅 지원. 내부적으로 `DependencyProperty.RegisterAttached` 메서드를 호출하여 연결된 프로퍼티를 등록하고, 클래스 내부에 public static field를 두어 메서드의 리턴 값을 저장해둡니다.  
3. Get, Set, Clear 메서드를 두어서 `DO`에 존재하는 종속성 프로퍼티의 값을 조종합니다.  
4. 종속성 프로퍼티나 연결된 프로퍼티에 대해, Metadata, coerce value support, **Property Changed notification**, override callbacks 를 지원합니다. 
5. 여러 클래스 `Visual`(`UIElement`) 

이 모든걸 정리하자면 다음과 같습니다.  
1. `DP`와 종속성 프로퍼티와 차이는 `DP`는 종속성 시스템에서 종속성 프로퍼티를 식별하는데 이용되는 클래스이고, 종속성 프로퍼티는 MS가 설계한 프로퍼티 시스템에 존재하는 속성의 한 종류이다.    
2. 종속성 프로퍼티를 생성하는데 사용되어야할 클래스는 반드시 `DO`여야 한다.  
3. `DO`는 여러개의 `DP`를 가질수 있다.  

아래 소스는 `DO` 하위 클래스에서 `DP`를 생성하는 방식입니다.  

```cs
// IsSpinningProperty is the dependency property identifier
// no need for info in the last PropertyMetadata parameter, so we pass null
public static readonly DependencyProperty IsSpinningProperty =
    DependencyProperty.Register(
        "IsSpinning", typeof(Boolean),
        typeof(ExampleClass), null
    );
// The property wrapper, so that callers can use this property through a simple ExampleClassInstance.IsSpinning usage rather than requiring property system APIs
public bool IsSpinning
{
    get { return (bool)GetValue(IsSpinningProperty); }
    set { SetValue(IsSpinningProperty, value); }
}
```

아래는 UWP에서의 `DO`입니다. `Dispatcher`를 제외하고는 크게 다른 특징은 없습니다.

```cs
#region 어셈블리 Windows.Foundation.UniversalApiContract, Version=8.0.0.0, Culture=neutral, PublicKeyToken=null, ContentType=WindowsRuntime
#endregion

using Windows.Foundation;
using Windows.Foundation.Metadata;
using Windows.UI.Core;

namespace Windows.UI.Xaml
{
    [Composable(typeof(IDependencyObjectFactory), CompositionType.Protected, 65536, "Windows.Foundation.UniversalApiContract")]
    [ContractVersion(typeof(UniversalApiContract), 65536)]
    [MarshalingBehavior(MarshalingType.Agile)]
    [Threading(ThreadingModel.Both)]
    [WebHostHidden]
    public class DependencyObject : IDependencyObject, IDependencyObject2
    {
        protected DependencyObject();

        public object GetValue(DependencyProperty dp);
        public void SetValue(DependencyProperty dp, object value);
       
        public void ClearValue(DependencyProperty dp);
        public object ReadLocalValue(DependencyProperty dp);
        public object GetAnimationBaseValue(DependencyProperty dp);
        public long RegisterPropertyChangedCallback(DependencyProperty dp, DependencyPropertyChangedCallback callback);
        public void UnregisterPropertyChangedCallback(DependencyProperty dp, long token);
        public CoreDispatcher Dispatcher { get; }
    }
}
```



