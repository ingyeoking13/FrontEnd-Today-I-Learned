# 일지 

2020 01 19 이전  

`Dispatcher`, `DependencyObject` 작성

2020 01 19

1. 어떤 컨트롤들의 `control template`에서 내부 컨트롤들은 "PART_" 이름으로 시적한다.  
이러한 이름을 가진 control들은 이름을 변경해서는 안된다. 판매 vendor에 따라(`Telerik`,`grapecity`, `syncfusion`, `devexpress` 등) 이름의 컨벤션은 다르지만, 주의할 점은 이름을 변경할 땐 주의를 기울여야한다는 점이다. 만약 변경하게 된다면 해당 컨트롤에 접근하는 비하인드 코드 (이벤트) 등이 제대로 동작하지 않을 가능성이 있기 때문이다. 

2. TemplateBinding Markup Extension 은 control의 property를 연결하는 one-way binding 이다.  

3. RelativeSource TemplateParent는 항상 같이 다니며, control의 다른 프로퍼티에 바인딩 할 수 있다. 바인딩 Mode(OneWay,TwoWay) 그리고 컨버터, 트리거 등을 설정할 수도 있다.    

4. Inline vs External Template 중 External Template을 선호해보자.   
전자는 Control Template를 Style 내부에 선언하여 구조는 Style-Control Template이고, 후자는 Control Template을 바깥에 선언하여 Style-(Trigger)  ~> (Control Template A, Control Template B)에서 선택할 수 있다.   

5. ItemRresenter를 가지는 control stye를 정의할 때 자식 style부터 정의하여야 한다.   
왜냐하면 xaml staticresource 특성 때문이다. 항상 선형적으로 정의되어야기 때문이다.   



