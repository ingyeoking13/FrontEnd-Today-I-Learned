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
        // 요약:
        //     이 System.Windows.DependencyObject에서 종속성 속성의 유효 값이 업데이트될 때마다 호출됩니다. 변경된 특정 종속성
        //     속성이 이벤트 데이터에서 보고됩니다.
        // 매개 변수:
        //   e:
        //     관심 있는 종속성 속성 식별자, 형식에 대한 속성 메타데이터, 기존 값 및 새 값을 포함하는 이벤트 데이터입니다.
        protected virtual void OnPropertyChanged(DependencyPropertyChangedEventArgs e);
        protected internal virtual bool ShouldSerializeProperty(DependencyProperty dp);
    }
}

`
```

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
        //
        // 요약:
        //     로컬 값이 설정된 경우, 종속성 속성의 로컬 값을 반환합니다.
        //
        // 매개 변수:
        //   dp:
        //     로컬 값을 검색할 속성의 DependencyProperty 식별자입니다.
        //
        // 반환 값:
        //     로컬 값을 반환하거나, 로컬 값이 설정되어 있지 않은 경우 센티널 값인 UnsetValue를 반환합니다.
        public object ReadLocalValue(DependencyProperty dp);
        //
        // 요약:
        //     종속성 속성에 대해 설정되어 있고 애니메이션이 활성 상태가 아닐 때 적용되는 기준 값을 반환합니다.
        //
        // 매개 변수:
        //   dp:
        //     원하는 종속성 속성의 식별자입니다.
        //
        // 반환 값:
        //     반환된 기준 값입니다.
        public object GetAnimationBaseValue(DependencyProperty dp);
        //
        // 요약:
        //     이 DependencyObject 인스턴스에 대한 특정 DependencyProperty의 변경 내용을 수신하도록 알림 기능을 등록합니다.
        //
        // 매개 변수:
        //   dp:
        //     속성 변경 알림에 등록할 속성의 종속성 속성 식별자입니다.
        //
        //   callback:
        //     DependencyPropertyChangedCallback 대리자 기반 호출로, 지정된 속성의 값이 변경될 때 시스템에서 호출됩니다.
        //
        // 반환 값:
        //     호출을 나타내는 토큰으로, UnregisterPropertyChangedCallback 호출 시 호출을 식별하는 데 사용됩니다.
        public long RegisterPropertyChangedCallback(DependencyProperty dp, DependencyPropertyChangedCallback callback);
        //
        // 요약:
        //     이전에 RegisterPropertyChangedCallback을 호출하여 등록된 변경 알림을 취소합니다.
        //
        // 매개 변수:
        //   dp:
        //     속성 변경 알림에서 등록 취소할 속성의 종속성 속성 식별자입니다.
        //
        //   token:
        //     호출(RegisterPropertyChangedCallback에 의해 반환됨)을 나타내는 토큰입니다.
        public void UnregisterPropertyChangedCallback(DependencyProperty dp, long token);

        //
        // 요약:
        //     이 개체와 연결된 CoreDispatcher를 가져옵니다. CoreDispatcher는 코드가 UI가 아닌 스레드에 의해 시작되었더라도 UI
        //     스레드에서 DependencyObject에 액세스할 수 있는 기능을 나타냅니다.
        //
        // 반환 값:
        //     DependencyObject 개체가 연결되어 있는 CoreDispatcher로, UI 스레드를 나타냅니다.
        public CoreDispatcher Dispatcher { get; }
    }
}
```



