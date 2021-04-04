---
layout: post
title: "How to Design Github Profile"
date: 2021-04-04 14:38:02 +0900
categories: Github
---

깃 허브 프로필을 꾸미는 방법을 정리한다.

1. Using `Badge` :  
   다양한 뱃지를 이용하여 이쁘게 꾸미자!

2. Using `github-readme-stats` :  
   내 깃허브의 상태를 요약해주는 github-readme-status를 사용하자!

   Github | [github-readme-status][github-readme-status]  
   ⚡ Dynamically generated stats for your github readmes  
   자세한 사항은 위 Github 링크에서 확인할 수 있으며, 사용법은 매우 간단하다.

   프로필 Readme.md 파일에 아래 코드를 입령하면 된다.  
   {username}에 본인의 github id를 입력하면 된다.

   {% highlight ruby %}
   [![GitHub stats](https://github-readme-stats.vercel.app/api?username={username})](https://github.com/anuraghazra/github-readme-stats)
   {% endhighlight %}

3. Using `mazassumnida` :  
   solved.ac를 연동하여 내 BOJ(Baekjoon Online Judge) 프로필을 보여주자!

   Github | [mazassumnida][mazassumnida]  
   Github 프로필에서 boj 프로필을 이쁘게 보여주는 프로젝트.

[github-readme-status]: https://github.com/anuraghazra/github-readme-stats
[mazassumnida]: https://github.com/mazassumnida/mazassumnida
