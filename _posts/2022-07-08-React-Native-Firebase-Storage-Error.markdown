---
layout: post
title: '[React-Native] Firebase Storage ์ฌ์ฉ ์ Possible Unhandled Priomise Rejection'
date: 2022-07-08 10:58:00 +0900
categories: React-Native
---

## ๐จWARN : Possible Unhandled Promise Rejection

## Error: [storage/unauthorized] User is not authorized to perform the desired action.

<br/>
๐ฅ์์นจ๋ถํฐ ๊ฐ๋ณ๊ณ  ๊ท์ฌ์ด ์๋ฌ๋ฅผ ๋ง์ฃผ์ณค๋ค.
์ฝ๊ฒ ํด๊ฒฐํด์ ๊ธฐ๋ถ์ด ์ข๋ค.

<br/>

Firebase Storage๋ฅผ ์ฌ์ฉํด์ ์ฒ์ ์ด๋ฏธ์ง๋ฅผ ์๋ก๋ ํ๋ ค๋๋ฐ!  
๊ฒฝ๊ณ ์ ํจ๊ป ๋ฌดํ ๋ก๋ฉ์ด ๋ด๋ค.  
`WARN : Possible Unhandled Promise Rejection`

<br/>

๋ด๋ ๋ฌด์จ ๊ฒฝ๊ณ ์ธ์ง ๋ชจ๋ฅด๊ฒ ๋ ๋๋ ์๋ง๋ ์ ์.
์ด๋ฏธ์ง ์๋ก๋๋ฅผ ํ๋ ๋ถ๋ถ์์ ์๋ฌ๋ฅผ ์ฒ๋ฆฌํด์ฃผ์ง ์์์ ๋ญ๊ฐ ๋ฌธ์ ์ธ์ง ์๋ฌ๊ฐ ์๋์ค๋๊ฑฐ๋ค.

memo... async await๋ก ๋น๋๊ธฐ์ฒ๋ฆฌ๋ฅผ ํ ํจ์๋ค์ ๊ผญ ์๋ฌ์ฒ๋ฆฌ๋ ์ ํด์ฃผ์...โ๏ธ

```
// try catch๋ฅผ ์ด์ฉํด์ ์๋ฌ ๋ฐ์์ ์ฝ์์ ์ถ๋ ฅํด์ฃผ๊ธฐ.
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

๊ทธ๋ฌ๋ฉด ์ด์  ์ง์ง ์๋ฌ๊ฐ ๋ชจ์ต์ ๋๋ฌ๋ธ๋ค.

`Error: [storage/unauthorized] User is not authorized to perform the desired action.`

์ด ์๋ฌ๋ Firebase Storage์ ๊ถํ ์ค์  ๋ฌธ์ ์ด๋ค.

<br/>

Firebase ํ๋ก์ ํธ ์ฝ์ ์นํ์ด์ง์ ์ ์ํด์ ๋น๋ > Storage ํ์ด์ง์ ๊ฐ๋ฉด, Rules ํญ์ด ์๋ค.  
๊ฑฐ๊ธฐ์์ ๋ฐ์ดํฐ๋ฅผ ์ฝ๊ณ  ์ฐ๋ ๊ถํ์ ์ค์ ํ  ์ ์๋ค.

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

read, write ๊ถํ์ด `false`๋ก ๋์ด์์ด์ ์ค๋ฅ๊ฐ ๋ฌ๋ค.

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

์์ ๊ฐ์ด `allow read, write` ๋ผ๊ณ  ์์ฑํ๋ฉด ์ฝ๊ธฐ ์ฐ๊ธฐ ๊ถํ ๋ชจ๋ `true`๋ก ํ์ฉ๋๋ค.
์ค์ ์ ๋ง์น๊ณ  ์ ์ฉ๋๊ธฐ๋ฅผ ์ ์ ๊ธฐ๋ค๋ฆฌ๋ฉด ์ ์๋ํ๋ค!

<br/>

๋ชจ๋์๋ฌ ํด๋ฆฌ์ด๐

<br/>

...

<br/>

๊ทธ๋ฆฌ๊ณ ... 10๋ถ ๋ค... ์ฌ์ ํ `WARN : Possible Unhandled Promise Rejection` ์์ ๋์ด๊ฐ์ง๋ฅผ ์๋ ๊ฒ์ด๋ค.

<br/>

์ฝ์ ๊ฐ์ ์ฐ์ด๊ฐ๋ฉฐ ์ด๋์ ๋ฉ์ถ๋์ง ์ดํด๋ณด๋,  
`usersCollection.doc(id).set({id, displayName, photoURL});`  
๋ฅผ ํตํด users ์ปฌ๋ ์์ ๋ฌธ์๋ฅผ ๋ฑ๋กํ๋ ๊ณผ์ ์์ ๋ฉ์ถ๊ฒ์ ํ์ธํ๋ค.

๊ทธ๋์ ์ธ์ ๊ฐ์ ์ดํด๋ณด๋ `displayName`์ด `undefined` ์๋ค.

์์์ ๋๋ค์ ์๋ ฅ๋ฐ๋ UI์ ๊ธฐ๋ฅ ๋ค ๊ตฌํํด๋๊ณ ๋, ํ์คํธ ํ  ๋ ๋๋ค์ ์์ด ์ฌ์ง๋ง ์ ์ถํด์ ๊ทธ๋ฌ๋ ๊ฒ์ด์๋ค.

ํฟ๐
