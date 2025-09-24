---
layout: post
title: "[React-Native] Vscode, AVD 에러 총집합"
date: 2022-06-20 18:11:00 +0900
categories: [Error, React-Native]
tags: [react native, avd, vscode]
---

## error Failed to launch emulator. Reason: No emulators found as an output of 'emulator -list-avds'.

그래 시작은 이 에러였지.  
이때는 이렇게 긴 여정이 될 줄 몰랐다.

emulator를 찾지 못해 launch에 실패했다는 에러이다.

일단 저 에러를 해결하기 위해, React Native 튜토리얼들에 나오는 AVD 생성 방법을 처음부터 다시 따라가며 SDK 버전, API 레벨과 AVD 버전 등등을 설정하는 것 삭제도 해보고 다시 깔아도 보았는데도 해결이 안됐다.

구글링해서 나오는 이런 저런 방법들을 시도하였고, 더해서 아래 과정을 진행하자 정상작동(X) 다음 에러로 넘어감(O)

Settings > Android SDK > SDK Platforms 에서
`Show Package Details` 옵션을 체크해 자세하게 펼쳐보면
다운받지 않은 파일들이 나오는데.

기존에 자동으로 설치되지 않은 두가지를 설치해주었다.

- Google APIs Intel x86 Atom_64 System image
- Google Play Intel x86 Atom_64 System image

그리고 Android 디렉토리로 이동해서 다른 글들에서도 권장하기에 Gradle 초기화를 해주었다.

```
./gradlew clean
```

<br/>
<br/>

## adb(android debug bridge) devices

안드로이드 스튜디오에서 생성한 AVD를 Vscode 작업중에 잘 인식하는 것인지 확인이 필요했다.

```
adb devices
```

위 명령어를 입력하면 모든 AVD와 그 상태가 출력된다.

```
'adb'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치파일이 아닙니다.
```

저 경우에는 CLI에서 adb를 사용하기 위해 adb 환경변수 설정이 필요하다.

<figure>
  <img width=250 src='/assets/img/path.PNG' alt='readline'>
  <figcaption style="text-align: center;">환경 변수 설정</figcaption>
</figure>

Path 환경변수를 더블클릭하여 아래 경로를 추가해준다. _(당연히 Username은 자신의 것으로, 파일탐색기로 저 위치에 abd.exe 파일이 있는지 확인해도 좋다.)_
C:\Users\Username\AppData\Local\Android\Sdk\platform-tools

그리고 다시 `abd devices`를 실행하면 정상 출력된다.

<br/>
<br/>

## Device emulator-5554 is not authorized.

아래 두 가지를 통해 해결했다.

**(1) Google API 명시된 AVD 생성**  
Create Device를 통해 AVD를 생성할 때에, device definition(Pixel 5, Pixel 3a 등)을 선택한 후 System image를 선택하는 단계에서 `Target`열을 보면 괄호 안에 `(Google Play)`라고 적힌 것과 `(Google API)`라고 적혀있는게 있다.

내가 기존에 Pixel 3로 생성했었는데 그 중에는 해당하는게 없더라. Pixel 5에서 선택하여 생성했다.

**(2) Google Play Licensing Library 설치**  
Android Studio > Settings > Android SDK > SDK Tools > Google Play Licensing Library 설치

<br/>
<br/>

## Skipping device 'emulator-5554' (emulator-5554): Device is OFFLINE.

### (1) AVD(Android Virtual Device)를 정상 종료하는 법

React-Native를 시작하면서 막 안드로이스 스튜디오를 사용하게된 나.
AVD를 아예 종료시키는 것 부터 고난이었다.

구글의 여러 글에서 가상 디바이스를 끌 때 토글에서 stop 버튼을 눌러서 종료시키라는 말이 있었는데, 내 UI에서는 해당 버튼이 뜨지 않는다. 몰랐는데 가상 디바이스 탭의 'x' 버튼을 눌러 탭을 닫으면 알아서 종료되는 것이었다...✨  
**탭을 닫고 조금 기다리면 Device 목록에서 종료 상태로 변경된다.**

<figure>
  <img src='/assets/img/x.JPG' alt='readline'>
  <figcaption style="text-align: center;">탭 'x'로 닫기</figcaption>
</figure>

에러를 잡으며 급한 마음에 탭을 닫고서는, 바로 키려고 마구 눌렀는데 그럴때마다 이미 실행중인 디바이스라는 알림만 떴던 것이다... (당연하다 아직 종료가 안됐는걸...)
뭔가 잘못된 줄로만 알고 또 급하게 해당 디바이스를 지워버리고 새로 만든 나.😥

### (2) AVD 삭제 오류

뭐지.  
새로 만든 가상 디바이스를 분명 실행 시키고 `yarn android`를 했는데 오프라인이라는 문구가 출력된다.

```
Skipping device 'emulator-5554' (emulator-5554): Device is OFFLINE.
```

뭔가 쎄한 기분에 `abd devices`를 해보았더니, 이전에 삭제한 가상디바이스 5554 가 오프라인으로 남아있고 5556이 돌아가고 있던 것이다.  
검색해보니 정상 종료시키지 않은 상태에서 강제로 삭제하면, 정상적으로 삭제가 되지 않는 것 같다.

`C:\Users\Username\.android\avd`에 있는 AVD 파일을 모두 삭제해주었다.
그 후 Android 스튜디오 AVD 목록과, VSCode 터미널에서 `adb devices`를 했을 때 모든 디바이스가 삭제된 것을 확인했다.

휴.
그리고 AVD 다시 생성해서 계속 진행했다.

<br/>
<br/>

## INSTALL_FAILED_INSUFFICIENT_STORAGE

debug 과정에서 에러가 뜨면 엄청나게 긴-에러메세지가 뜨는 와중, 핵심만 살펴보면 `INSTALL_FAILED_INSUFFICIENT_STORAGE`라는 에러 문구를 확인할 수 있다.

```
React native install_failed_insufficient_storage
```

이름 그대로 insufficient storage. 저장 공간 부족이다!
검색해보니 많은 사람들이 프로젝트 진행중에도 겪는 문제인 것 같다. 나는 아래와 같이 진행하여 효과를 보았다.

Virtual Device Configuration(디바이스 설정, 내 AVD의 연필 모양) >  
Show Advanced Settings >  
**Internal Storage를 800에서 1200으로 수정**

<br/>
<br/>

그렇게 돌고 돌아 드디어 정상 작동되었을 때 아래와 같은 화면을 볼 수 있다!🥰  
진짜 그렇게 에러를 잡았을 때 얼마나 행복한지 모른다.  
진짜 나랑 같이 사무실에 있는 분들께 자랑도 했다.

<figure>
  <img width=250 src='/assets/img/avd.JPG' alt='readline'>
  <figcaption style="text-align: center;">정상 작동 화면</figcaption>
</figure>
