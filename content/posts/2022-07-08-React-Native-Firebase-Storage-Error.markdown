---
layout: post
title: "[React-Native] Firebase Storage 사용 시 Possible Unhandled Priomise Rejection"
date: 2022-07-08 10:58:00 +0900
categories: [Error, React-Native]
tags: [react native, firebase storage, error]
---

## 🚨WARN : Possible Unhandled Promise Rejection

## Error: [storage/unauthorized] User is not authorized to perform the desired action.

<br/>
🔥아침부터 가볍고 귀여운 에러를 마주쳤다.
쉽게 해결해서 기분이 좋다.

<br/>

Firebase Storage를 사용해서 처음 이미지를 업로드 하려는데!  
경고와 함께 무한 로딩이 떴다.  
`WARN : Possible Unhandled Promise Rejection`

<br/>

봐도 무슨 경고인지 모르겠던 나는 아마도 정상.
이미지 업로드를 하는 부분에서 에러를 처리해주지 않아서 뭐가 문제인지 에러가 안나오는거다.

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

<br/>

...

<br/>

그리고... 10분 뒤... 여전히 `WARN : Possible Unhandled Promise Rejection` 에서 넘어가지를 않는 것이다.

<br/>

콘솔 값을 찍어가며 어디서 멈추는지 살펴보니,  
`usersCollection.doc(id).set({id, displayName, photoURL});`  
를 통해 users 컬렉션에 문서를 등록하는 과정에서 멈춘것을 확인했다.

그래서 인자 값을 살펴보니 `displayName`이 `undefined` 였다.

앞에서 닉네임 입력받는 UI와 기능 다 구현해놓고는, 테스트 할 때 닉네임 없이 사진만 제출해서 그랬던 것이었다.

헿😆
