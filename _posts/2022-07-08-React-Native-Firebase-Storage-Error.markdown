---
layout: post
title: '[React-Native] Firebase Storage 사용 시 Possible Unhandled Priomise Rejection'
date: 2022-07-08 10:58:00 +0900
categories: React-Native
---

## 🚨WARN : Possible Unhandled Promise Rejection

## Error: [storage/unauthorized] User is not authorized to perform the desired action.

<br/>
🔥아침부터 가볍고 귀여운 에러를 마주쳤다.
쉽게 해결해서 기분이 좋다.

<br/>

Firebase Storage를 사용해서 처음 이미지를 업로드 하려는데!  
다음과 같은 에러를 마주쳤다.  
`WARN : Possible Unhandled Promise Rejection`

<br/>

봐도 무슨 에러인지 모르겠던 나는 정상이다.  
이미지 업로드를 하는 부분에서 에러를 처리해주지 않아서 무슨 에러인지 안나오는거다.

memo... async await로 비동기처리를 한 함수들은 꼭 에러처리도 잘 해주자...✏️

```
// try catch를 이용해서 에러 발생시 콘솔에 출력해주기.
try {
  if (Platform.OS === 'android') {
    await reference.putString(asset.base64, 'base64', {
      contentType: asset.type,
    });
  } else {
    await reference.putFile(asset.uri);
  }
} catch (err) {
  console.error(err);
}
```

<br/>

그러면 이제 진짜 에러가 모습을 드러낸다.

`Error: [storage/unauthorized] User is not authorized to perform the desired action.`

이 에러는 Firebase Storage의 권한 설정 문제이다.

<br/>

Firebase 프로젝트 콘솔 웹페이지에 접속해서 빌드 > Storage 페이지에 가면, Rules 탭이 있다.  
거기에서 데이터를 읽고 쓰는 권한을 설정할 수 있다.

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

read, write 권한이 `false`로 되어있어서 오류가 났다.

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

위와 같이 `allow read, write` 라고 작성하면 읽기 쓰기 권한 모두 `true`로 허용된다.
설정을 마치고 적용되기를 잠시 기다리면 잘 작동한다!

<br/>

모닝에러 클리어👍
