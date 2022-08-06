---
layout: post
title: '[React-Native] Firebase 앱 추가 디버그 서명 인증서 SHA-1 (+ 잘못된 옵션 : .language=en)'
date: 2022-07-06 14:36:00 +0900
categories: React-Native
---

## React Native 앱 Firebase 등록 시 입력값 "디버그 서명 인증서 SHA-1".

🔥React Native 앱을 Firebase에 등록하는 과정에서 패키지 이름, 앱 닉네임 그리고 "디버그 서명 인증서 SHA-1"을 입력하라고 한다.

디버그 서명 인증서는 `keytool` 명령어를 통해 확인할 수 있다.

```
keytool -genkey -list -v -alias androiddebugkey -keystore ./android/app/debug.keystore
```

그러면 비밀번호를 물어보는데 공백상태로 엔터를 누르면 된다.

<br/>

여기서 한가지 문제가 있는데, OPENJDK 8 이상의 keytool에서는 `MD5` 지문 없이 `SHA1`과 `SHA256`만 출력해주는데, 한국어 설명에는 반영되지 않아서 `MD5` 출력란이 남아있다. 그래서 한칸씩 밀려서 `MD5`란에 `SHA1`이, `SHA1`란에 `SHA256`이 잘못 출력되는 것으로 보인다.

이를 잘 출력하기 위해서는 명령어에 `-J-Duser.language=en` 옵션을 주어 영문으로 출력하면 된다.

```
keytool -J-Duser.language=en -genkey -list -v -alias androiddebugkey -keystore ./android/app/debug.keystore
```

<br/>

## 🚨잘못된 옵션 : .language=en

그런데 이 명령어를 입력하면 "잘못된 옵션 : .language=en" 이라고 뜬다.  
👍다음과 같이 따옴표를 붙여 실행하면 잘 인식했다.

```
keytool -J"-Duser.language=en" -genkey -list -v -alias androiddebugkey -keystore ./android/app/debug.keystore
```
