# 쿠키 

일렉트론 세션 모듈 일부로서, 쿠키로 작업할 수 있는 API를 제공받는다. 쿠키란 웹 베이스의 저장소인데, 일렉트론에서는 web Content 객체의 session에서 접근할 수 있다.

> electron.BrowserWindow.webContents.session.cookies 

디폴트 세션의 쿠키에 접근해보자. 

```js
function createWindow () {

    let ses = session.defaultSession
    //디폴트 세션에 있는 모든 쿠키에 접근하되, 완료가 되면 모든 쿠키를 출력하기로 하자. 
    ses.cookies.get({}, (err, cookies)=>{
        console.log(cookies);
    }
}
```
아무런 쿠키가 설정되지 않았기 때문에 출력에는 `[]` empty set이 뜬다. 원격 컨텐츠도 디폴트 세션의 쿠키에 접근할 수 있으므로, 원격 컨텐츠를 브라우저에 올려 쿠키를 살펴보자.  

원격 컨텐츠인 깃헙 컨텐츠를 올리되, 모든 컨텐츠가 로드되었을 때 세션의 모든 쿠키에 접근하여 출력하는 함수를 호출하기로 한다.  

```js
function createWindow () {

  let ses = session.defaultSession

  let getCookies = () =>
  {
    ses.cookies.get({}, (err, cookies)=>{
      console.log(cookies);
    })
  }

  mainWindow = new BrowserWindow({
    width: 1000, height: 800
  })

  mainWindow.loadURL('https://github.com')
  mainWindow.webContents.on('did-finish-load', e=>{
    getCookies()
  })

  mainWindow.webContents.openDevTools()

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null;
  })
}
```

콘솔에서 쿠키 출력물의 일부다.
```
 [
  {
    name: 'CGIC',
    value: 'InZ0ZXh0L2h0bWwsYXBwbGljYXRpb24veGh0bWwreG1sLGFwcGxpY2F0aW9uL3htbDtxPTAuOSxpbWFnZS93ZWJwLGltYWdlL2FwbmcsKi8qO3E9MC44LGFwcGxpY2F0aW9uL3NpZ25lZC1leGNoYW5nZTt2PWIz',
    domain: '.google.com',
    hostOnly: false,
    path: '/complete/search',
    secure: false,
    httpOnly: true,
    session: false,
    expirationDate: 1589778356.575281
  }
]
```

사용자 정의 쿠키를 만드는 방법은 다음과 같다. 쿠키는 항상 url 키를 가지고 있어야하는데 `http://` 또는 `https://` 접두사로 시작해야한다.  

```js
mainWindow.loadFile('index.html')

  let cookie = { url: 'http://www.github.com', name: 'cookie1', value: 'electron'}
  ses.cookies.set( cookie, err => {
    console.log('cookie1 set.')
    getCookies()
})
```

결과물은 다음과 같다.  

```
cookie1 set.
[
  {
    name: 'cookie1',
    value: 'electron',
    domain: 'www.github.com',
    hostOnly: true,
    path: '/',
    secure: false,
    httpOnly: false,
    session: true
  }
]
```

* 쿠키에는 `session`키가 있는데, 위 깃헙 쿠키들은 `false`로 사용자 정의 쿠키는 `true`로 값이 설정되어 있다. 유무에 따라 `expirationDate` 키가 있다. 
> `expirationDate`가 없다면, 세션 객체이 아닌 프로세스에서의 세션 객체 라이프사이클에 종속되어 있다. 이 뜻은, 프로세스가 꺼진다면 쿠키가 만료되는 것이다. 만약 `expirationDate`가 있다면 프로세스에 상관없이 영구적으로 존재할 수 있는 쿠키가 된다(다만 기한이 존재함).      

`expirationDate`가 있는 쿠키 생성방법은 아래와 같다. 
```js
 let cookie = { url: 'http://www.myapp.com', name: 'cookie1', value: 'electron', expirationDate : 1613852855}
```

특정 쿠키를 얻는 방법은 다음과 같다.  
```js
let ses = session.defaultSession
ses.cookies.get({ name :'cookie1'}, (err, cookies)=>{
    console.log(cookies);
})
```

쿠키를 삭제하는 방법은 remove함수를 사용하면 된다. 인자는 URL, 이름, 콜백함수이다.   
```js
ses.cookies.remove( URL, name, e => {
})
```

EOF
