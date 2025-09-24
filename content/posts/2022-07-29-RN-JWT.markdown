---
layout: post
title: "[React-Native] JWT 를 이용한 회원 인증"
date: 2022-07-27 22:05:00 +0900
categories: React-Native
tags: [react native, jwt]
---

## 😱JWT AccessToken & RefreshToken 을 이용한 인증

살려주세요.

JWT를 이용한 인증 구현 가능에서 여러 선택지들을 마주하고, 방식을 결정해가는 과정을 정리하려 한다.
인터넷에 검색했을 때 포스트 마다 다른 방식을 사용해서 마음이 복잡했기에...🙄

### User Data와 Token의 업데이트 주기에 관한 고민

= 하나로 묶자!

### 각 요소들의 저장 위치

- Access Token
- Refresh Token
- User
  = Access Token과 Refresh Token은 Local Storage에, User data는 redux state로!
  Access Token도 휘발시켜야하나 했는데, 현재는 Refresh 요청을 보낼 때에도 Access Token이 필요한 상황이라 일단은 Local Storage에 저장!
  검색 했을 때 내부 객체로 두거나, 쿠키 등에 담기도 하는데, 보안상 취약한지 확인 후 업데이트가 필요할 것으로 보임.

### refresh 시점. 일단 보내고 에러가 났을 때? 아니면 미리미리?

가능한 방법 1 요청을 보냈을 때 만료되었으면 refresh 후 재요청
가능한 방법 2 요청을 보내기 전 토큰의 만료 여부 체크

### 앱 초기 진입시 가능한 세가지 방법

가능한 방법 1 아무 검사를 안하고, 이후 요청에서 에러가 났을때 업데이트 되도록 하기 -> 초기에 일단 MainTab으로 진입한 이후 다시 로그인 화면으로 이동하는 부자연스러움
가능한 방법 2 아무 검사를 안하고, 일단은 Refresh -> 여기서 에러가 나면 refresh 만료 혹은 토큰 문제로 로그아웃, 에러가 없이 refresh 되면 AccessToken 업데이트 됨
가능한 방법 3 검사를 해서 Refresh Token 만료됐으면 로그인 화면으로 보내기. 유요하면 Access 토큰을 일단 적용. Access Token 만료는 뒤 요청 에러에서.
가능한 방법 3 검사를 해서 Refresh Token 만료됐으면 로그인 화면으로 보내기. 유요하면 Access 토큰도 만료 체크. 만료되었으면 refresh.

<br/>

## 최종 로직

## Login & SignUp

### 1. Access Token과 Refresh Token 을 Local Storage에 저장, User 정보 dispatch(), ApplyToken Default Header.

만료 시간을 미리 추출해서 저장하는지, 검사 할 때 마다 복호화하는지는 Youtube 참고해서 확인하기.
이것까지는 해결했고

## App 진입 시

### 1. Refresh Token decode, 만료되었으면 local storage clear, return;

redux middle ware를 사용하면? 아 지금 API 상태관리를 React-Query를 쓰고 있구나
axios interceptor를 사용해서 매 요청 전 체크를 하면?!

### 2. Refresh Token decode, 유효하면 AccessToken을 decode, Uese 정보 dispatch(), ApplyToken Default Header.

refresh 하기

## App 사용 중

### 1. 모든 요청에서 401 에러 발생시 : Access Token이 만료된 것.

refresh API 호출 : 성공시 Local Storage에 저장, User 정보 dispatch(), ApplyToken Default Header.

### 2. refresh API에서 401 Error 발생시 : Refresh Token이 만료된 것.

로그아웃 시킨다.

참고 유튜브
https://www.youtube.com/watch?v=nI8PYZNFtac
