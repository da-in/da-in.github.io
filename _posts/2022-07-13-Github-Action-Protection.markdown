---
layout: post
title: '[Github] Git Action & Git Branch Protection Rule 을 통한 협업 코드 관리!'
date: 2022-07-13 10:15:00 +0900
categories: Github
---

## 😆 Git Action & Git Branch Protection Rule 을 통한 협업 코드 관리!

### 1. 요약
> `Git Action`과 `Git Branch Protection Rule`을 통해 더욱 체계적이고 안전한 코드 관리 하기.

<br/>

### 2. 도입 배경

지난 웹 개발 때 함께 협업한 엄청나신 선배님이 계시는데, 아래와 같은 설정을 해두신 것이다...✨

1. 코드를 업로드 하려고 할 때(PR, Pull Requset) 자동으로 오류, 버그 체크(Lint)를 실행.
2. 위 체크 통과하고, 1명 이상이 코드 리뷰를 해서 승인(Approve)해야 코드를 최종적으로 병합(Merge) 가능.

<br/>

이걸 봤을 때 정말 좋다고 생각해서 꼭 적용해봐야겠다고 생각했고, 실제로 조사했을 때 널리 사용되는 방식이어서 자료가 많아 바로 적용해볼 수 있었다.🙂

위 설정에서 1번은 `Git Action`을 이용한 것이고, 2번은 `Git Branch Protection Rule`을 이용한 것이다.

<br/>

### 3. Git Action

Git Action은 Git에서 특정 Action이 발생했을 때 실행할 동작을 지정하는데,
위의 경우 PR이 생기면 → 오류 체크 맥락이었고 이외에도
코드에 변화가 생기면 → 자동 배포 (CI/CD)
등 다양하게 활용할 수 있다.

Git Action은 시간 제한이 있다. 무료 플랜에서는 월 2000분까지 무료이기 때문에, 코드를 올릴 때 오류 체크 용도로는 여유롭게 돌릴 수 있는 것 같다.
자세한 사항은
[Github Actions 공식 문서](https://docs.github.com/en/enterprise-cloud@latest/billing/managing-billing-for-github-actions/about-billing-for-github-actions)
를 참고하자.

<figure>
  <img width=500 src='../assets/img/Action.png' alt='action'>
  <figcaption style="text-align: center;">출처 | Github Docs > Github Actions</figcaption>
</figure>

그리고 다양한 팀 및 개인들이 설정한 Git Action들을 쉽게 가져다 적용할 수 있는 기능들이 웹에서 구현되어있어, 직접 Action 관련 설정을 해주지 않아도 쉽게 선택해서 적용할 수도 있다.

<br/>

### 4. Git Branch Protection Rule

Git Branch Protection Rule 은 말 그대로 브랜치 보호 규칙인데, 원하는 브랜치마다, 원하는 규칙을 적용할 수 있다.

우리의 경우 브랜치에 코드를 병합하려면, Git Action의 Lint 체크를 통과해야하고, 한 명 이상이 승인했을 때에만 병합할 수 있도록 보호 규칙을 설정한 것이다.

<br/>

### 5. 결론

Git Action과 Git Branch Protection Rule을 통해 더욱 체계적이고 안전한 코드 관리가 가능한 것 같다.