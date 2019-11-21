# CSS

CSS 는 HTML 을 디자인 하는 역할.   
[CSSZENGARDEN](http://www.csszengarden.com/214/)  

## CSS 문법   

```css
h1 { color : yellow; font-size : 2em; }
```

선택자 `h1`, 속성 `color, font-size`, 값, 선언 `h1 { .. }` , 선언부 `color : yellow;`, 규칙 이 있다.   


```html
<!-- inline -->
<div style="color: red"> 
<!--internal (헤드 태그 내에 존재한다.) -->
<style></style>
<!-- External -->
<link rel="stylesheet" href="css/style.css">
<!-- import -->
@import url('css/style.css');
```

## 선택자 

* 요소 선택자
```css
/* 단일 선택자 */
h1 { color: yellow;}
/* 선택자 그룹화 */
h1, h2 { color : yellow; }
/* 전체 선택자 */
* {color: yellow; }
/* 선택자 및 선언 그룹화 */
h1, h2, h3 { color:yellow; font-size:2em; }
```

* 클래스 선택자 

```html
<style media="screen" >
/* class 선택자 */
.yellowFont { color: yellow; }
.bigFont { font-size: 5em; }
/* id 선택자 */
#underLineHead { text-decoration: underline; }
</style>

<!-- 다중 클래스 -->
<p class="yellowFont bigFont">HELLO </p>
```

* 조합 선택자 
```css
/* 요소와 클래스의 조합 */
p.bar { ... }
/* 다중 클래스 */
.foo.bar { ... }
/* 아이디와 클래스의 조합 */
#foo.bar { ... }
```

* 속성 선택자
```css
/* 클래스 속성을 가진 요소를 선택 */
p[class] {...}
/* 클래스, 아이디 속성을 가진 요소 선택 */
p[class][id] { ... }
/* 정확한 클래스 속성을 가진 요소를 선택  */
p[class="foo"] { ... }
p[class="foo"][id="bar"] { ... }

/* 클래스로 bar를 포함한 요소를 선택 */
[class~="bar"]
/* 클래스 속성의 첫 값이 bar 문자열로 시작하는 요소를 선택 */ 
[class^="bar"]  /* "barcode" "bar ..." */ 
/* 클래스 속성의 끝 값이 bar 문자열로 시작하는 요소를 선택 */ 
[class$="bar"] /* ".... barcode" "... bar" */
/* 클래스 속성 값중 bar문자열을 포함한 요소를 선택 */
[class*="bar"] /* "... foobar ..."  "... bbarbbar ..." k*/
```

* 자손 선택자, 자식 선택자, 인접 형제 선택자

```css
/*자식, 자손 요소 선택됨*/
div span { ... }
/*자식 요소만 선택됨*/
div>span { ... }
/*인접 형제 선택자, div 요소의 양 옆 형제만 선택됨*/
div+span { ... }
/* 조합 선택자 */
body > div table + ul { ... }
/* 바디 자식 중 div 요소의 모든 자식 자손 요소인 table의 양옆 형제인 ul 요소 선택됨 */
```

* 가상 클래스 
어떠한 상황이 되면 브라우저 스스로 클래스를 추가하여 적용해 줌, 만약 상황이 되지 않으면 클래스를 삭제한다.  

```css  
/* 앵커 관련 */
/* 하이퍼 링크이면서 아직 방문 안한 것 */
a:link { ... }
/* 방문 한 링크 */ 
a:visited { ... }

/* 마우스를 올렸을 때  */
p:hover  { ... }

/* 첫 또는 마지막 요소 선택 */
p:first-child { ... }
p:last-child { ... }
```

* 가상 요소 
HTML 코드에 존재하지 않는 구조 요소에 스타일을 부여한다.  

```css
p::before {
    color : "red";
    content : "before 가상 요소를 활용한 내용 " ;
}
p::after {
    color : "blue";
    content : "after 가상 요소를 활용한 내용"; 
}
p::first-line { ... }
p::first-letter { ...}
```


