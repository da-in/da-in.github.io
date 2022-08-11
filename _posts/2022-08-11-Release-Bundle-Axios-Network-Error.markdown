---
layout: post
title: "[React-Native] Release Bundle Axios Network Error"
date: 2022-08-11 18:25:00 +0900
categories: react-native
---

## Release Bundle Axios Network Error

React Native App을 야심차게 빌드하고
구글 플레이콘솔 내부 테스트 앱으로 릴리즈 하여 안드로이드 폰에서 실행하는데...!

세상에 모든 요청이 작동하지 않는 것이다...
Axios Network Error 라고만 뜨고...

검색을 열심히 하니, 백엔드 서버가 Http 를 사용할 경우 Android에서 문제가 발생한다고 한다. (추가 정리 필요)

`root` > `android` > `app` > `src` > `main` 의 `AndroidManifest.xml` 에서
`android:usesCleartextTraffic="true"` 속성을 추가해주면 된다.

```
<application
  android:usesCleartextTraffic="true">
  ...
</application>
```

원리를 추가 정리하자.
🔥🔥🔥
