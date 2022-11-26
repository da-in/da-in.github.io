---
layout: post
author: dain
title: "[Project] Github Pages Deploy 404 오류 안나게 하자 (feat. gh-pages)"
date: 2022-11-02 01:53:00 +0900
categories: [Project, Project]
tags: [github pages, deploy, error, notfound]
pin: false
---

배포는 정말 삽질하기 딱 좋은 것 같다.
보통 프로젝트 하면서 딱 한번 설정하고는 수정하는 경우가 많지 않으니, 다음 프로젝트에서 배포할 즈음이면 기억이 흐릿하달까. 🤔

클라이언트 개발을 하는 동안에는 팀원들도 링크로 쉽게 확인할 수 있도록 정적 페이지를 호스팅해둘 예정이다.
무료로 호스팅이 가능한 Github Pages로 CI/CD까지 적용해놓으면 편리하다.

<br/>

## Github Pages로 프로젝트 배포하기

Github Pages를 적용하는 법 자체는 다른 사이트들에도 잘 정리가 되어있어서 간단하게만 정리하고 넘어가겠다.
기록의 초점은 gh-pages 브랜치 업데이트를 하며 생기는 오류이므로...✏️

(1) gh-pages 모듈 설치

```bash
yarn add -D gh-pages
```

(2) package.json에 homepage url 입력 및 deploy 스크립트 추가

```json
{
  "homepage": "https://roundshoulder.github.io/cs-letter-frontend",
  ...
  "scripts": {
    ...
    "deploy": "gh-pages -d build"
  },
```

(3) build 및 deploy

```bash
yarn build
yarn deploy
```

(4) Repository Setting > Pages
gh-pages deploy 하면 해당 브랜치가 생성되고, 파일들이 올라가있을 것이다.
설정의 Pages에 들어가서 Source는 `Deploy from a branch`를, 그리고 Branch 를 `gh-pages`로 설정해준다.

<br/>

## 만약에 배포를 했는데 하얀 화면이 뜬다면, 혹은 404 Not Found.

개발자 도구 콘솔에 들어가보자.
만일 아래와 비슷하게 몇몇 파일에 대한 404 에러가 떠있다면 에러 속 경로가 맞는지 잘 보자.

<!-- prettier-ignore -->
> GET https://roundshoulder.github.io/static/js/main.foo.js net::ERR_ABORTED 404
{: .prompt-danger }

레포지토리 이름이 {username}.github.io 인 경우에는 경로가 {username}.github.io/{file path} 가 맞을 것이고
그 외의 레포지토리를 배포하는 경우에는 {username}.github.io/{repository name}/{file path} 처럼 사이에 레포지토리 이름이 있어야할 것이다.

나의 에러메세지를 보면 레퍼지토리 이름이 빠져있다.
경로가 잘못되었다는 것을 알 수 있고 package.json파일의 homepage가 잘못된 경우이다. 수정해주면 된다.

homepage url이 잘 입력되어있는데 에러 문구의 경로만 잘못되어있다면 gh-pages 브랜치에 반영이 안된것이다.
나의 경우에도 gh-pages 브랜치를 업데이트 하는 법을 잘못 이해하고 있어서 당황했다.

<br/>

## 추가) 메인 화면은 잘 뜨는데 하위 페이지 링크로 접속시 404 Not Found.

Github Pages로 배포한 사이트 첫 화면이 잘 뜨고, 내부에서 path의 이동도 잘 되는데!🙂
하위 페이지 "링크"를 주소창에 입력하여 접속하려고하면 404 Notfound 가 뜰 것이다.😱

Github Pages는 정적 페이지를 호스팅해주기는 하지만, Jekyll 블로그와 같은 사이트 구조에 최적화 되어있다. 현재 이 게시물의 주소를 보면 `https://da-in.github.io/posts/FE-Roadmap/` 이다. 바로 레포지토리 내 포스트 파일의 경로이다. 이처럼 주소를 통해 파일을 읽어오는 형태로 잘 작동한다.

반면 리액트 등을 통해 만든 SPA의 경우 해당 주소에 파일이... 없다! 하나로 빌드된 파일만 있을 뿐... 그래서 **404 Not Found**가 뜬다. 😱

일단 가장 간단한 해결책은 빌드한 `index.html` 파일을 `404.html` 라는 이름으로 복제하는 것이다. `404.html` 파일로 우리가 만든 프로그램을 복제하면 접근하려는 경로의 파일이 없어 처음에 404 Not Found Error 가 발생하더라도 404.html(index.html의 사본)으로 연결되어 서비스를 이용할 수 있게 된다.

배포할 때 404.html이 복사가 되도록 package.json의 스크립트를 수정해주면 된다.

```
"deploy": "cp build/index.html build/404.html && gh-pages -d build"
```

<br/>

## gh-pages 브랜치에 업데이트 하기 (배포 내용 수동 업데이트)

보통 build 해도 _(기본 세팅으로 레포지토리를 생성했다면)_ `gitignore`에 의해 해당 폴더는 트래킹되지 않는다.
build 폴더를 push 할 일도 없으니 build는 할 필요 없겠지 무의식 중에 넘기다가 먼길 돌아왔다.

deploy로 등록한 스크립트를 살펴보자

```json
"deploy": "gh-pages -d build"
```

**gh-pages -d build 스크립트에서 build는 명령어가 아니라 목적 파일이다.**
빌드한 파일들이 `build`폴더에 저장되기 때문에, 해당 폴더를 사용해서 배포하겠다는 의미이다.
그렇기 때문에 `yarn deploy` 명령만 실행하면 업데이트 되지 않은 빌드 파일을 사용해서 배포하게되고 변화가 없게 된다.

따라서 내용을 수정했을 경우 잊지말고 **yarn build로 먼저 빌드를 한 이후에 gh-pages 배포**를 해주어야겠다.
(별 다섯개 ⭐⭐⭐⭐⭐)

이렇게 deploy(gh-pages -d build) 명령을 실행하면 별도의 push를 하지 않아도 gh-pages 브랜치에 가면 build한 파일들이 업데이트 되어있을것이다.👍

<br/>

Github Actions를 이용해서 CI/CD 스크립트도 작성하게 될 텐데, 또 잘못 사용하지 않도록 하자.🙂
