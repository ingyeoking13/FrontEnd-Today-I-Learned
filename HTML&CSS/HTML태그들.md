# HTML태그들

## 1. 제목과 단락 태그 

## Heading Tag

문서 내에 제목을 표현할 때 사용되는 태그이다. 

```html
<h1></h1>
<h2></h2>
...
<h5></h5>
<h6></h6>
```

## Paragraph Tag

`<p></p>`는 `단락 태그`이며 문단을 만들 때 사용된다. 

## linebreak Tag 

`<br></br>`는 `개행 태그`이며 문장 간의 개행을 위해 사용된다. *HTML에서 내용은 하나 이상의 공백 외엔 공백 및 개행이 허용 되지 않기 때문에, 개행을 위해서라면 반드시 `<br></br>` 태그를 이용하여야 한다.*


## 2. 텍스트를 꾸며주는 태그 

대표적으로 다음이 있다. `<b></b>` 볼드체, `<i></i>` 이탤릭체, `<u></u>` 밑줄, `<s></s>` 취소선이다. 

## 3. 앵커 태그  

`<a href="..."></a>`는 a, 앵커, 링크 등 여러 이름으로 불린다. 속성은 다음과 같다.  

> href : 링크의 목적지가 되는 URL   
>> #{elem-id}를 사용하게 되면 내부의 특정 요소로 이동할 수 있음.    

> target : 링크된 리소스를 어디에 포현해야 될지 설정    
>> _self : 현재 창   
>> _blank : 새로운 창   

## 4. 의미없이 요소를 묶기 위한 태그 (Container)  

태그 자체에 아무 의미가 없으며, 단순히 요소들을 묶기 위해 사용된다. 스타일을 주거나 서버에서 받은 데이터를 담기 위한 용도로 이런 의미 없는 요소들을 사용한다. 제일 빈도가 많은 태그이다. `<div></div>, <span></span>`이다.   
두 태그의 차이는 `<div>`는 블록 레벨이며, `<span>`은 인라인 레벨이다.

## 5. 리스트 요소

`ul`, `ol`, `dl` 각각 unordered, ordered, definition list 이다. 앞 두 태그는 `<li></li>` 태그를 자식으로 가지고, 마지막 태그인 `dl`은 `<dt></dt> <dd></dd>`를 자식 태그로 갖는다. `dt`는 definition term, `dd`는 definition description 으로 자식 태그는 각각 용어, 용어 설명 역할을 한다. 

`<ul>, <ol>` 태그는 자식 태그를 항상 위에 서술된 태그들로만 가질 수 있지만, `<li>`는 여러 태그를 자식으로 가질 수 있다.   
[예제 소스](../coding-job/191118/list.html)  


## 6. 이미지 요소

`<img>` 태그는 이미지의 경로를 표시하는 `src` 속성을 항상 가지고 있어야한다. `alt` 속성은 이미지의 정보를 텍스트로 담는다. 서버 문제 때문에 이미지를 읽어올 수 없을 때 `alt`에 표시된 글을 대신 출력한다. 시각 장애인분들이 사용하는 특수 기기 또한 이미지의 `alt` 속성을 읽는 동작을 하기도 하므로 웹 접근성과 크게 관련되어있다.   
`width/ height`는 선택적인 속성이지만 고정적으로 사용한다면 성능 개선과 관련이 있다.   

## 7. 테이블 

`<table></table>` 표를 나타내는 태그    
`<th></th>` 제목 셀을 나타내는 태그   
`<tr></tr>` 행을 나타내는 태그   
`<td></td>` 셀을 나타내는 태그   
`<th></th>` 제목 셀을 나타내는 태그   
`<caption></caption>` 표 제목을 나타내는 태그  
`<thead></thead> <tbody></tbody> <tfoot></tfoot>` 제목 행, 본문 행, 바닥 행을 그룹   

```html
<table>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
    </tr>
    <tr>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
    </tr>
    <tr>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
    </tr>
    <tr>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
    </tr>
</table>
```

## 8. 데이터를 전송하기 위한 요소 input, button  
 
속성에 따라 특징이 결정되는 `<input>` 빈 태그  

```cpp
type = "text" placehorder="please input text" // 한 줄만 
type = "password"
type = "radio" name="group1"
type = "file" //파일업로드
type = "submit" //제출 < form > 태그필요
tpye = "reset" //초기화  < from > 태그필요
type = "button" //아무 기능이 없음 
type = "image" // 이미지 삽입 가능, submit 과 동작같음
```
콤보박스 태그인 `<select> <option></option> </select>`, 여러줄 입력을 받을 수 있는 태그 `<textarea></textarea>`.  

그리고 사용자가 클릭 가능한 버튼 태그인 `<button></button>`이 있다.  

```cpp
// 역할은 input 태그의 동종 type과 같으나, button은 빈태그가 아님.   
type= "submit" 
type= "reset"
type= "button"
```

## 9. 데이터를 전송하기 위한 요소2 label, fieldset, legend, form     

`<label></label>`은 다른 form 요소와 연결시키는데 사용한다. 사용자가 해당 태그를 클릭시 해당 form 오소를 클릭한 것과 같은 동작을 하게 한다. 반드시 for 속성을 가지되 값은 form 요소의 id와 갖게 해줌.   
 
`<fieldset></fieldset>` 여러 form 요소를 그룹화 하는 태그, 각각 form 요소 집합들의 제목은 `<legend></legend>`태그다. `<table></table>`의 `<caption></caption>`과 같음.  

`<form></form>`은 form 요소 데이터를 그룹화하여 서버에 전송하는데, form 요소 `<fieldset></fieldset>` 으로 구조화 되어있다면, `<fieldset>`도 함께 감싼다.  

```cpp
action = "..."//폼 데이터를 처리하기 위한 서버의 주소   
method = "..."// 데이터를 전송하는 방식을 지정(get, post)  
```
