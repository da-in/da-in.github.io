---
layout: post
title: "[React-Native] React-Query 도입"
date: 2022-07-23 19:21:00 +0900
categories: React-Native
tags: [react native, react query]
---

## React-Query 도입 전 간단 정리

프로젝트에서 API 연결 작업에 앞서 API 상태관리 라이브러리 도입 필요성을 인지하게되었다. 다음 라이브러리들 중 어느것을 도입하는 것이 좋을지 고민했다.

- redux
- react-query
- redux → rtk-query

<br/>

## React-Query 검색

React-Query에 관하여 검색을 해 본 결과, **서버 사이드의 데이터 위주**의 서비스라면 React-Query를 도입하는 것이 좋다는 평이 많았다. 실제로 redux-saga를 사용중이던 팀들에서 react-query로 리팩토링 하는 케이스를 많이 찾아볼 수 있었다.

<br/>

---

<br/>

## 자문

항상 배울게 정말 많은 동기 개발자와 선배님께 자문을 구했다.

**개발자 A**👍

> 상태관리를 할거면 redux를 사용하고, 데이터 패칭을 관리할거면 리액트 쿼리. 프로젝트에서는 목적에 따라 모두 사용하면 될 듯하다.

> redux도 rtk-query가 생겼다. 이미 redux 가 적용된 프로젝트에서 추가적인 설치 없이 이용할 수 있다는 점에서 rtk-query도 생각해볼 법 하다.

<br/>

**개발자 B**👍

> 본래 라이브러리 취지로만 보면 react-query 는 서버-클라 사이에서 데이터를 불러오는 과정에서 필요한 loading 상태 관리, 캐시관리가 주 목적이라고 보시면 될 것 같다.

> 전역으로 사용해야하는 유저데이터 같은 걸 캐시시간을 조정해서 전역 state store 처럼 사용할수는 있을텐데 (_redux만으로 요청 상태를 관리하는 경우를 말하시는 것 같다._) 그렇게 사용하면 약간 남용/오용 한다는 느낌은 있습니다.

> http fetch 를 호출/캐싱 -> react-query  
> 전역 상태관리 -> redux, react context  
> 가 이상적으로 보입니다.

<br/>

나도 저렇게 조언해줄 수 있는 개발자가 되야겠다.

---

<br/>

## 결론

API 상태관리 react-query  
전역 상태관리 React Context or Redux
