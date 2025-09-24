---
layout: post
author: dain
title: "[JS] 서로 다른 ReferenceError : variable is not defined vs Cannot access variable before initialization"
date: 2023-01-26 00:05:00 +0900
categories: [Language, JS]
tags: [js, error, browser, engine]
pin: false
---

이걸 이렇게 고민하게 될 줄 몰랐건만... 결과적으로 1500명 풀방의 오픈카톡방을 활활 타오르게 만들었던 재미있는 주제...🔥

<br/>

> 요새 스터디가 너무 재미있어서 [JS 스터디](https://github.com/likelion-ssu/JS-Deep-Dive)도 참여중이다.

시작은 스터디를 진행하며 스치듯 본 `모던 자바스크립트 Deep Dive` 속 한 예제의 주석이었다.🤔  
`let`과 `const`키워드로 변수를 선언했을 때 생기는 일시적 사각지대(TDZ)에서 변수를 참조했을 경우 `ReferenceError`가 발생한다.  
그런데 책 속 예제에서 기술하는 두 상황의 `ReferenceError`의 메세지가 다른 것을 보게되었다.

```js
console.log(foo); // ReferenceError: foo is not defined
let foo;

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo;
}
```

전역 변수의 TDZ 참조 에러와 지역 변수의 TDZ 참조 에러의 메세지가 달랐다. Chrome 브라우저의 console에서 책의 예제와 같이 동작하는 것을 확인했다.

![Figure : Chrome Console](/assets/img/post/230126_reference_error.png)  
_Figure : Chrome Console_

왜 전역 변수와 지역 변수에 차이가 있는지 스터디원끼리 논의를 했지만... 진척이 없었다🤔  
그래서 프론트엔드 관련 오픈카톡방에서 이 내용을 _(복잡한 사정을 거쳐)_ 다루게 되었는데...!

<br/>

많은 가설과 반론을 이어갔다. 몇 가지 내용을 소개해보면...✨

### 🔥 가설 1 : 브라우저 환경에서 전역 변수와 지역 변수를 참조하는 로직이 다를 것이다.

- 근거 : Node 환경에서 위 두 코드를 실행하면 모두 `ReferenceError: Cannot access 'variable'  before initialization` 에러를 발생시킨다.

![Figure : Node](/assets/img/post/230126_reference_error2.png)  
 _Figure : Node_

- 따라서 이는 브라우저와 Node 환경의 차이이고, 추측해보면 브라우저에는 `window` 객체가 있기 때문에 전역 변수를 탐색할 때에는 window 객체의 프로퍼티를 우선적으로 확인한다거나 하는 로직의 차이가 만든 결과 아닐까! 라는 의견이었다.

모두 어느정도 수긍을 하고 있을 때 쯤, 다른 분이 반은 맞고 반은 틀렸을지 모른다는 근거를 가지고 오셨다.

### 💧 반론 1 : '브라우저' 라서만은 아닐 것이다.

- 근거 : `html` 파일을 생성, `<script>` 태그로 위 코드를 입력하고 브라우저에서 열면 동일한 에러 메세지를 출력한다.  
  ![Figure : HTML Inner Script](/assets/img/post/230126_reference_error5.png)  
   _Figure : HTML Inner Script_  
  Uncaught ReferenceError: Cannot access 'a' before initialization
- '브라우저'이기 때문에 차이가 발생하는 것이 아니라, 개발자도구 콘솔에서 차이가 발생하는 것 아닐까.

<br/>

### 🔥 가설 2 : 브라우저 콘솔이 블럭으로 감싸지 않은 문을 분리해서 실행하는 것 아닌가.

- 근거 : 아래와 같이 분리되어 한 줄만 실행했을 때와 결과가 같기 때문이다.  
  ![Figure : Browser Console](/assets/img/post/230126_reference_error3.png)  
   _Figure : Browser Console_

- 브라우저 콘솔에서 `console`문과 `let`선언문을 함께 입력해도 두 문이 분리되어 실행하는 것 아니냐는 추측이였다.

### 💧 반론 2 : 분리해서 실행하지는 않는다.

- 근거 : 분리해서 실행된다면 `var` 키워드에 대한 호이스팅도 이루어지지 않고 에러가 발생해야하는데 잘 동작한다.  
  ![Figure : Browser Console](/assets/img/post/230126_reference_error4.png)  
   _Figure : Browser Console_

<br/>

이렇게 열성적인 토론이 이어지다가 결론은 Javascript 엔진 차이로 힘이 모아졌다.

각 Javascript 엔진들은 ECMAScript에 명시된 표준을 따르도록 되어있지만 정의하고 있지 않은 세부적인 부분은 엔진마다 조금씩 다르게 동작한다.

실제로 여러 실험을 하며 동일한 엔진을 사용하는 환경에서는, 동일한 결과가 나오는 것을 확인하였기 때문에 엔진 차이라는 결론을 내리게 된 것이다.

도음을 주신 모든 분들 감사합니다!🙏  
그리고 나는 이런 토론을 끝마친 후 뿌듯해하며 잠이들... 뻔 했다.

<br/>

### 잠깐만...🙂

그래서 엔진 차이~ 라는 결론으로 포장했지만 사실 해결되지 않은 의문이 남아있었다. 아니 본질적 의문은 해결되지 않았다.

1. 엔진 차이라고 했는데, 그래서 서로 다른 에러 메세지를 출력하는 엔진은 왜 어떠한 원리로 전역변수와 지역변수의 `TDZ Reference Error Message` 를 다르게 출력하는건가.
   - 이게 본래 궁금했던 핵심이었다.
2. 크롬 브라우저를 기준으로 `html`내부 스크립트로 작성하였을 때와 개발자 도구 콘솔에 작성하였을 때 결과의 차이는 왜 일어나는 것일까.
   - 이건 여러 실험 도중에 생긴 의문이다.

의문이 해결된게 아니라 늘었다...🙂  
계속 틈틈이 파헤쳐보겠지만, 혹시 이에 관해 짐작가는 분이 계시다면 댓글 부탁드립니다.
