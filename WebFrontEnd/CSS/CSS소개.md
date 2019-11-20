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