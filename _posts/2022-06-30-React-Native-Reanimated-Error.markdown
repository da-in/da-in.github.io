---
layout: post
title: "[React-Native] React Native Reanimated Error"
date: 2022-06-30 17:19:00 +0900
categories: [Error, React-Native]
tags: [react native, reanimated, error]
---

## Could not get unknown property 'rnMinorVersion' for project ':react-native-reanimated' of type org.gradle.api.Project

react-native는 정말 한시도 조용할 날이 없는 것 같다.😆  
**react-native-reanimated** 를 설치하고 실행했더니 에러가 떴다.

내가 설치한 react-native-reanimated의 버전은 **2.8.0** 이었고
react-native 버전은 **0.69.0** 이었다.

<br/>

### 원인

rnMinorVersion 값을 가져올 수 없어서 이다.

<br/>

### 해결 방법

node_modules > react-native-reanimated > android > build.gradle  
파일을 연다.

파일에서 `rnMinorVersion` 을 검색하면 `rnMinorVersionCopy` 라는 값들이 주르륵 나오고, 간혹 에러를 출력하는 코드 등에 `rnMinorVersion` 라는 값들이 사용된 것을 볼 수 있다.

모든 `rnMinorVersion`을 찾아서 `rnMinorVersionCopy` 로 수정해주었다.  
_(에러 출력문만 수정하는 것이라 라이브러리의 동작에는 영향을 주지 않는다.)_

<br/>

수정후, 혹시 몰라 android 폴더에서 gradlew clean 로 한번 캐시된 내용들을 깔끔히 리셋한 후
다시 실행하니 잘 작동하였다.

LGTM
