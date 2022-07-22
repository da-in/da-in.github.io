---
layout: post
title: "[React-Native] React-Query 도입"
date: 2022-07-21 17:30:00 +0900
categories: React-Native
---

## React-Query 도입 전 간단 정리

### 문제 상황

API 연결 작업에 앞서 API 상태관리 라이브러리 도입 필요성 인지.

- redux
- react-query
- redux → rtk-query

<br/>


### React-Query 서칭 결과

서버 사이드의 데이터 위주의 서비스라면 react-query.
redux-saga 에서 react-query로 리팩토링 하는 케이스를 많이 찾아볼 수 있었다.

<br/>


---

<br/>


### 자문

**자문**👍

> 상태관리 할거면 redux고, 데이터 패칭 관리할거면 리액트 쿼리, 둘 다 섞어쓰면 될듯
api로 데이터 받아오는거 관리할거면 react-query가 좋고.

redux도 rtk-query가 생겼다. 이미 redux 가 적용된 프로젝트에서 추가적인 설치 없이 이용할 수 있다는 점에서 rtk-query도 생각해볼 법 하다.
> 

**자문**👍

> 본래 라이브러리 취지로만 보면 react-query 는 서버-클라 사이에서 데이터를 불러오는 과정에서 필요한 loading 상태 관리, 캐시관리가 주 목적이라고 보심될듯 해요

전역으로 사용해야하는 유저데이터 같은걸 캐시시간을 조정해서 전역 state store 처럼 사용할수는 있을텐데 그렇게 사용하면 약간 남용/오용 한다는 느낌은 있습니다

http fetch 를 호출/캐싱 -> react-query
전역 상태관리 -> redux, react context
가 이상적으로 보입니다.

<br/>


---

<br/>

### 결론

API 상태관리 react-query   
전역 상태관리 React Context or Redux