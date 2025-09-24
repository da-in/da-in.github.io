---
layout: post
title: "[React-Native] Android Http Error, Release Bundle Axios Network Error"
date: 2022-08-19 11:00:00 +0900
categories: [Error, React-Native]
tags: [react native, android, error]
---

## Release Bundle Axios Network Error

React Native App을 야심차게 빌드하고 구글 플레이콘솔 내부 테스트 앱으로 릴리즈 하여 안드로이드 디바이스에서 실행을 했는데...! 세상에 모든 요청이 작동하지 않는 것이다...😱
Axios Network Error 라고만 뜨고...🥲

검색을 열심히 하니, 백엔드 서버가 Http 를 사용할 경우 Android에서 문제가 발생한다고 한다.

`root` > `android` > `app` > `src` > `main` 의 `AndroidManifest.xml` 에서
`android:usesCleartextTraffic="true"` 속성을 추가해주면 된다.

```
<application
  android:usesCleartextTraffic="true">
  ...
</application>
```

<br/>

아 잠시만요. 해결됐다고 그냥 지나치지 마시고 이해하고 넘어갑시다. 🔥🔥🔥

## Cleartext

먼저 Cleartext 는 암호학 용어이다. 비교적 익숙한 `Plaintext`(평문)과 반대되는 개념 되시겠다.  
음. 평문 반대말은 암호문이니까 그러면 `Cleartext`는 암호문인가? 아니다.

`Plaintext`가 암호화의 입력값 혹은 복호화의 출력값으로 사용될, 암호화 되지 않은 데이터라면,  
`Cleartext`는 암호화의 대상 자체가 아닌, 암호화 되지 않은 데이터를 의미한다. 🙂 _(내 설명이지만 킹받네)_

<br/>

## Cleartext Network Traffic, Http

그런고로 Cleartext Network Traffic 이란, Cleartext를 이용한 네트워크 데이터의 흐름이다. 암호화 되지 않은, 그리고 암호화되지 않을 그냥 일반 데이터를 이용한 네트워크 통신! 대표적으로 Http(HyperText Transfer Protocol)가 이에 해당한다. Htpps에 비해 취약한 부분이다.

(이 설정으로 Http 연결이 됐다고 좋아할게 아니라, 보안상 취약을 걱정해야하는 것이었다. Https로 바꾸거나, 중요 정보를 암호화해야할 것 같다. 😱)

<br/>

## usesCleartextTraffic

앞의 내용을 이해하고 나서 다시보니, 눈앞의 문제를 해결해준 이 옵션이 천사가 아니라 악마의 손길이었구나... 👿

일단 리액트 네이티브 공식문서에 해당 내용이 언급되어있다!  
React Native Docs - Networking | [https://reactnative.dev/docs/next/network](https://reactnative.dev/docs/next/network)

> By default, iOS will block any request that's not encrypted using SSL. If you need to fetch from a cleartext URL (one that begins with http) ... it is more secure to add exceptions only for those domains;

> On Android, as of API Level 28, clear text traffic is also blocked by default. This behaviour can be overridden by setting android:usesCleartextTraffic in the app manifest file.

<br/>

Http를 포함한 Cleartext Traffic은 보안상 취약하기 때문에 iOS에서도 그리고 Android에서도 제한한다는 내용이다. iOS에서는 Http 통신 등을 사용해야할 경우 해당 URL만 예외처리를 해서 사용해야 안전하다고 말하고 있다. 안드로이드도 useCleartextTraffic=true 옵션을 지정해서 사용하는 것이고 말이다.

<br/>

## Reference

😊 https://reactnative.dev/docs/next/network

🙂 https://simplicable.com/new/plaintext-vs-cleartext#:~:text=Plaintext%20is%20unencrypted%20data%20that,t%20meant%20to%20be%20encrypted

🥰 https://arunpandianm.medium.com/6-daily-issues-in-android-cleartext-traffic-error-52ab31dd86c2#:~:text=Cleartext%20is%20any%20transmitted%20or,eavesdropping%20and%20tampering%20of%20content.
