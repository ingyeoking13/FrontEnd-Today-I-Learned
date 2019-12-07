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
    //
    // 요약:종속성 속성 시스템에 참가하는 개체를 나타냅니다.
    [NameScopeProperty("NameScope", typeof(NameScope))]
    [TypeDescriptionProvider(typeof(DependencyObjectProvider))]
    public class DependencyObject : DispatcherObject
    {
        public DependencyObject();
        // 요약:
        //     가져옵니다는 System.Windows.DependencyObjectType 를 래핑하는 CLR 이 인스턴스의 형식입니다.
        public DependencyObjectType DependencyObjectType { get; }
        // 요약:
        //     (읽기 전용)이이 인스턴스가 현재 봉인 되어 있는지 여부를 나타내는 값을 가져옵니다.
        public bool IsSealed { get; }
        // 요약:
        //     속성의 로컬 값을 지웁니다. 지울 속성이 System.Windows.DependencyProperty 식별자에서 지정됩니다.
        // 매개 변수:
        //   dp:
        //     System.Windows.DependencyProperty 개체 참조로 식별되는 지울 종속성 속성입니다.
        public void ClearValue(DependencyProperty dp);
        // 요약:
        //     읽기 전용 속성의 로컬 값을 지웁니다. 선언할 속성이 System.Windows.DependencyPropertyKey에서 지정됩니다.
        // 매개 변수:
        //   key:
        //     지울 종속성 속성의 키입니다.
        // 예외:
        //   T:System.InvalidOperationException:
        //     봉인된 System.Windows.DependencyObject에서 System.Windows.DependencyObject.ClearValue(System.Windows.DependencyProperty)를
        //     호출하려고 시도했습니다.
        public void ClearValue(DependencyPropertyKey key);
        // 요약:
        //     지정된 종속성 속성의 값을 강제 변환합니다. 호출하는 System.Windows.DependencyObject에 있으므로 이 작업은 종속성
        //     속성의 속성 메타데이터에 지정된 System.Windows.CoerceValueCallback 함수를 호출하여 수행합니다.
        // 매개 변수:
        //   dp:
        //     강제 변환할 종속성 속성의 식별자입니다.
        // 예외:
        //   T:System.InvalidOperationException:
        //     지정된 dp 또는 해당 값이 잘못되었거나 존재하지 않습니다.
        public void CoerceValue(DependencyProperty dp);
        // 요약:
        //     제공 된 있는지 여부를 결정 System.Windows.DependencyObject 현재 해당 System.Windows.DependencyObject합니다.
        // 매개 변수:
        //   obj:
        //     System.Windows.DependencyObject 를 현재 인스턴스를 비교 합니다.
        // 반환 값:
        //     true 두 인스턴스가 같으면 그렇지 않으면 false합니다.
        public sealed override bool Equals(object obj);
        // 요약:
        //     이 System.Windows.DependencyObject의 해시 코드를 가져옵니다.
        // 반환 값:
        //     부호 있는 32비트 정수 해시 코드입니다.
        public sealed override int GetHashCode();
        // 요약:
        //     종속성 속성을이 값이 설정 로컬로 결정 하기 위한 특수 열거자를 만듭니다 System.Windows.DependencyObject합니다.
        // 반환 값:
        //     로컬 값을 특수 한 열거자입니다.
        public LocalValueEnumerator GetLocalValueEnumerator();
        // 요약:
        //     이 System.Windows.DependencyObject 인스턴스에서 종속성 속성의 현재 유효 값을 반환합니다.
        // 매개 변수:
        //   dp:
        //     값을 검색할 속성의 System.Windows.DependencyProperty 식별자입니다.
        // 반환 값:
        //     현재 유효 값을 반환합니다.
        // 예외:
        //   T:System.InvalidOperationException:
        //     지정된 dp 또는 해당 값이 잘못되었거나 지정된 dp가 없는 경우
        public object GetValue(DependencyProperty dp);
        // 요약:
        //     지정된 된 종속성 속성에 대 한 유효한 값을 다시 평가합니다.
        // 매개 변수:
        //   dp:
        //     System.Windows.DependencyProperty 을 무효화 하는 속성의 식별자입니다.
        public void InvalidateProperty(DependencyProperty dp);
        //
        // 요약:
        //     있는 경우 종속성 속성의 로컬 값을 반환합니다.
        //
        // 매개 변수:
        //   dp:
        //     값을 검색할 속성의 System.Windows.DependencyProperty 식별자입니다.
        //
        // 반환 값:
        //     로컬 값을 반환하거나, 로컬 값이 설정되지 않은 경우 sentinel 값 System.Windows.DependencyProperty.UnsetValue를
        //     반환합니다.
        public object ReadLocalValue(DependencyProperty dp);
        //
        // 요약:
        //     해당 값 소스를 변경하지 않고 종속성 속성의 값을 설정합니다.
        //
        // 매개 변수:
        //   dp:
        //     설정할 종속성 속성의 식별자입니다.
        //
        //   value:
        //     새 로컬 값입니다.
        //
        // 예외:
        //   T:System.InvalidOperationException:
        //     읽기 전용 종속성 속성 또는 봉인된 System.Windows.DependencyObject의 속성을 수정하려고 했습니다.
        //
        //   T:System.ArgumentException:
        //     value가 dp 속성에 대해 등록된 올바른 형식이 아닙니다.
        public void SetCurrentValue(DependencyProperty dp, object value);
        //
        // 요약:
        //     해당 종속성 속성 식별자를 지정하여 종속성 속성의 로컬 값을 설정합니다.
        //
        // 매개 변수:
        //   dp:
        //     설정할 종속성 속성의 식별자입니다.
        //
        //   value:
        //     새 로컬 값입니다.
        //
        // 예외:
        //   T:System.InvalidOperationException:
        //     읽기 전용 종속성 속성 또는 봉인된 System.Windows.DependencyObject의 속성을 수정하려고 했습니다.
        //
        //   T:System.ArgumentException:
        //     value가 dp 속성에 대해 등록된 올바른 형식이 아닙니다.
        public void SetValue(DependencyProperty dp, object value);
        // 요약:
        //     종속성 속성의 System.Windows.DependencyPropertyKey 식별자에 의해 지정된 읽기 전용 종속성 속성의 로컬 값을
        //     설정합니다.
        // 매개 변수:
        //   key:
        //     설정할 속성의 System.Windows.DependencyPropertyKey 식별자입니다.
        //   value:
        //     새 로컬 값입니다.
        public void SetValue(DependencyPropertyKey key, object value);
        // 요약:
        //     이 System.Windows.DependencyObject에서 종속성 속성의 유효 값이 업데이트될 때마다 호출됩니다. 변경된 특정 종속성
        //     속성이 이벤트 데이터에서 보고됩니다.
        // 매개 변수:
        //   e:
        //     관심 있는 종속성 속성 식별자, 형식에 대한 속성 메타데이터, 기존 값 및 새 값을 포함하는 이벤트 데이터입니다.
        protected virtual void OnPropertyChanged(DependencyPropertyChangedEventArgs e);
        //
        // 요약:
        //     serialization 프로세스가 지정된 종속성 속성의 값을 직렬화해야 하는지 여부를 나타내는 값을 반환합니다.
        //
        // 매개 변수:
        //   dp:
        //     직렬화해야 하는 종속성 속성의 식별자입니다.
        //
        // 반환 값:
        //     제공되는 종속성 속성 값을 직렬화해야 하면 true이고, 그렇지 않으면 false입니다.
        protected internal virtual bool ShouldSerializeProperty(DependencyProperty dp);
    }
}
```



