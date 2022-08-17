---
layout: post
title: "[React-Native] Android Iternal Testing"
date: 2022-08-17 14:53:00 +0900
categories: React-Native
---

## Android Iternal Testing

안드로이드는 앱 릴리즈 전 다야한 테스트를 진행할 수 있는데
오늘은 그 중 내부테스트(Iternal Testing)을 알아본다.

안드로이드 내부 테스트는 메일 주소를 통해 관리하는 그룹원 100명 이내로 테스트가 가능하다.

### Build

Terminal에서 직접 빌드할 수도 있다.
나는 GUI 환경에서 편하게 빌드하고자 Android Studio에서 빌드했다.

Build > Generate Signed Build

Signed Build를 선택해주고 절차를 진행하면
최종적으로 release 폴더에 .aab 파일이 생성된다.

### Iternal Testing

Google Play Console에서
Testing > Create new release를 클릭한다.
Build한 aab 파일을 등록한다.

### Update(new release)

테스트 버전을 업데이트 하려면 등록할 때와 동일하게
Testing > Create new release로 새롭게 빌드한 .aab 파일을 업로드 하면 된다.

여기서 .aab 파일을 빌드할 때 버전 정보를 수정해주어야한다.
android > app > build.gradle 파일에서

```
versionCode 2
versionName "1.0.0.1"
```

가 있다.
versionCode 는 release 되지 않은 정수로 관리되어야하고, 그래서 release 할 때 마다 1씩 증가시켜주면 된다.
versionCode 는 사용자에게 노출되지 않는다.

사용자에게 노출되는 정보는 versionName이다.
버전을 나타내는 문자열이다.
따라서 몇자리를 사용하든 versionCode에 비해 자유롭다.
