---
layout: post
title: "[Axios] Header의 Data에 접근"
date: 2022-07-27 22:05:00 +0900
categories: React-Native
tags: [react native, axios]
---

## ✏️Header 의 Data에 접근하기

<br/>

## 1. 배경

프론트엔드에서 회원가입 직후 자동으로 로그인을 하기 위해서는, 사용자의 입력 없이 사용자의 아이디와 비밀번호를 매개변수로 로그인 API를 호출해야한다.
이걸 어떻게 할까. 회원가입 할 때 입력한 값을 별도로 저장을 해두어야할까. 고민하던 찰나에 회원가입 요청에 대한 응답을 콘솔로 찍어보니 거기에 회원가입 정보가 있는것이 아닌가!

(내적 댄스)

<br/>
<br/>

## 2. 접근

우와 response에 회원 정보가 담겨있잖아? 하고 잔뜩 신나서 response.data를 찍어보는데 아닛. data에 담겨있는게 아니다...?

data가 아니라 config에 담겨있는 것 이었다.

config 내의 data군!

response.config.data

undefined

알고보니 JSON 객체가 문자열로 들어온거라 JSON 파싱이 필요하다.

참고한 스택오버플로우의 글
https://stackoverflow.com/questions/58257423/my-sent-data-using-axios-is-returned-in-config-not-data

마스터!
