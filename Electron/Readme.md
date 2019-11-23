# Electron


19 11 20
1. 브라우저를 우아하게 사용하기   
실제로 사용경험이 좋음 
* [URL](https://electronjs.org/docs/api/browser-window)
* Frameless window
* 윈도우 로드 될 때까지 기다리기 
* browser 객체 background 속성 설정 

2. 창을 여러개 띄우기 

19 11 23
1. 창 포커스 이벤트 
* `focus` 단일창, `browser-window-focus` 모든 브라우저에 대한 이벤트 
2. 브라우저 객체정보보기 
* 모든 브라우저 `BrowserWindow.GetAllWindows()`  
* BrowserWindow 객체   
* 단일 윈도우 `윈도우.webContents`
3. `webContents` 스태틱 객체 활용
* `wc.on(...)` 이벤트 활용
* 브라우저 dom 레디 `dom-ready`, 컨텐츠 로드가 다 끝났을 때  `did-finish-load`, 새 윈도우 `new-window`, 리다이렉트 `will-redirect`   






