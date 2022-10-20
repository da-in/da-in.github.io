---
layout: post
title: "[Programming] Props Drilling"
date: 2022-08-19 11:00:00 +0900
categories: Programming
tags: [programming, abstraction]
---

## React Props Drilling 프로퍼티 드릴링

Props Drilling는 React 에서 Props를 오직 하위 컴포넌트로 내려주기 위해 사용하는 문제를 말한다.

전달해주는 Props의 개수가 많아질 수록 Props들을 추적하기 어려워지고, 유지보수가 어려워진다.

해결책 중 하나는 전역 상태관리를 하는 것이다.
Context API 등으로 전역상태관리를 해주어서, 원하는 컴포넌트 노드까지의 정보전달을 그 상위 노드들을 거치는 것이 아닌, 바로 전역 상태에서 불러오는 방법.

다른 해결법은 children props를 사용하는 것이다.
React Native Docs - Composition vs Inheritance | [https://ko.reactjs.org/docs/composition-vs-inheritance.html](https://ko.reactjs.org/docs/composition-vs-inheritance.html)

> React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

children Props 를 사용하면 데이터를 거치지않고도 원한느 컴포넌트에 데이터를 전달할 수 있게 된다.

<br/>

## Reference

😊 https://ko.reactjs.org/docs/composition-vs-inheritance.html
