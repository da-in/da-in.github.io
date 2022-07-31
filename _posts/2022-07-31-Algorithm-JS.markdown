---
layout: post
title: "[Algorithm] JavaScript로 알고리즘 코딩테스트 준비"
date: 2022-07-31 18:44:00 +0900
categories: Algorithm
---

## Programmers JavaScript 풀이 시작에 앞서.

프론트엔드 개발에서 JavaScript가 널리 쓰이다보니, 프론트엔드 개발자 대상의 코딩테스트에서 언어를 JavaScript로 제한하는 경우도 여럿 있다.
그래서 JavaScript를 이용한 알고리즘 풀이도 조금씩 진행해보려 한다.

백준의 경우 JavaScript를 이용한 문제 해결이 초보자에게는 조금 어려운 것 같다.
처음 값을 입력받는 스켈레톤 코드를 주지 않는데, Node.js 환경에서의 입출력이 낯설기 때문이다.

반면에 Programmers의 경우 JavaScript 언어 선택이 존재하고, 알고리즘 로직 자체에 집중하기 위해 입력되는 인자와 출력문이 주어져서 JavaScript를 이용한 알고리즘 풀이를 시작하려는 초보자에게 굉장히 좋은 것 같다. _(어느정도 JavaScript를 이용한 풀이가 익숙해지면 백준의 Node.js 환경에서 문제 풀이에 들어가는게 좋을 것 같다.)_

그래서 JS 알고리즘 풀이의 첫 시작으로 Programmers에서 주어지는 스켈레톤 코드를 살펴보자.

```
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    const n = data.split(' ');
    const a = Number(n[0]), b = Number(n[1]);
    console.log(a);
    console.log(b);
});
```
_Programmers에서 주어지는 스켈레톤 코드_

<br/>
<br/>

```
process.stdin.setEncoding('utf8');
```

먼저 Node.js는 본래 웹을 개발하며 브라우저에서 실행되는 JavaScript를 웹 브라우저 밖에서도 동작할 수 있도록 해주는 JavaScript의 런타임 이다.
그리고 여기서 등장하는 process 도 Node.js에서 제공하는 객체로, 표준 입출력 관련 함수들을 제공한다.

```
process.stdin.on('data', (data) => {
  ...
});
```

```
    const n = data.split(' ');
    const a = Number(n[0]), b = Number(n[1]);
    console.log(a);
    console.log(b);
```