---
layout: post
author: dain
title: "[🎨Portfolio] 2일차, 포트폴리오 디자인"
date: 2022-09-29 17:53:00 +0900
categories: project
pin: false
---

# 2일차, 포트폴리오 디자인 🙂

두구두구. 사실상 포트폴리오를 직접 만드는 과정에서 디자인이 제일 중요하다고 본다.
디자인이 깔끔하게 나오지 않는다면, 노션 등의 다른 플랫폼을 안쓰느니만 못할 것이기 때문이다.

비장한 각오로 Figma를 켜고 작업을 진행했다.

## Portfolio Design

포트폴리오의 전체 모습은 아래 Figma 링크로 확인할 수 있다.  
[🔗 https://www.figma.com/file/YvNRIQcmVTfUJaFiffhHcR/Dain-Portfolio?node-id=0%3A1](https://www.figma.com/file/YvNRIQcmVTfUJaFiffhHcR/Dain-Portfolio?node-id=0%3A1)

각 부분들을 살펴보도록 하자.

먼저, 나는 평소에 **흑백**과 **정갈한 느낌** 그리고 **손글씨**를 좋아했다. 그래서 전반적으로 그런 느낌들을 살리고 싶었다.

서비스의 로고 까지는 아니지만, 내 이름 손글씨 세 글자를 아이덴티티로 가져가고 싶었다. Hand Writing 폰트를 사용하기보다는 진짜 내 글씨를 담고 싶어서, 손글씨를 쓴 후 일러스트레이터로 패스를 따서 SVG 파일로 변환해 사용하였다. 좌측의 네비게이션과 본문 최상단 타이틀영역에 손글씨 이름을 넣어 고딕(Noto Sans KR)의 다른 텍스트들 사이에서 내 이름이 강조되도록 했다.

추후 구현할 때에 SVG파일로 글씨 획을 써내려가는 애니메이션 효과를 넣어 지루하지 않게 할 계획이다.

디자인 시안 상에는 없지만 후에 프로젝트 영역들을 채우면 포트폴리오 스크롤의 길이가 매우 길어질 것 같았다. 그래서 쉽게 영역들을 이동할 수 있도록 좌측에 **네비게이션**을 두었다. 스크롤 시에도 고정된 위치에서 보여지도록 구상했고, 현재 영역을 진하게 그리고 화살표로 표시했다.

![Portfolio Title Design](/assets/img/post/0929_Portfolio_Title.png)
_Portfolio Title Design_

<br/>

소제목들은 타이틀로 이름 손글씨를 가져간 것과 비슷한 느낌을 주기 위해, 웹폰트 중 Hand Writing 카테고리 인 Caveat를 사용했다.

Contact는 이메일, 깃허브, 블로그, 인스타그램 네가지를 나열했다.

Skill은 언어, 프론트엔드, 백엔드, 디자인 그리고 기타 툴을 태그형태로 분류하여 적었다. 태그를 사용한 이유는 추후 프로젝트 영역에서 각 프로젝트에 사용한 기술을 적을 때 동일한 디자인을 적용하여 바로 기술임을 직관적으로 알 수 있도록 하기 위함이다.

![Portfolio Skill Design](/assets/img/post/0929_Portfolio_Skill.png)
_Portfolio Title Design_

<br/>

다음은 프로젝트 영역이다. 구현하면서 내용이 채워지고 다채로워질 영역이다. 다른 영역들은 React로 평범하게 구현하되, '기여한 점'의 부분은 프로젝트에 따라 그 구조가 매우 다양할 것으로 생각되 Markdown Renderer를 이용하여 자유롭게 기입할 수 있도록 했다.

위의 Skill에서 사용한 태그 디자인을 사용한 기술에도 동일하게 적용했다.

![Portfolio Project Design](/assets/img/post/0929_Portfolio_Project.png)
_Portfolio Title Design_

<br/>

다음으로 타임라인이다. 아무래도 과거보다는 최근에 한 개발을 더 강조하고 싶기 때문에 시간 역순으로 구성하였다. 이 곳에는 주요 대외활동 및 교육 내용과 각종 대회 수상 내역을 기입하게 될 예정이다.

![Portfolio Timeline Design](/assets/img/post/0929_Portfolio_Timeline.png)
_Portfolio Title Design_

<br/>

마지막으로 웹이라면 빠질 수 없는 Footer도 넣었다.

![Portfolio Footer Design](/assets/img/post/0929_Portfolio_Footer.png)
_Portfolio Title Design_

<br/>

디자인을 완료했다! 개발하면서도 조금씩 수정해나갈 것 같다.🙂

Figma 디자인 상으로는 전체적으로 너무 흑백이라 단조로워보일 수 있지만 인터랙티브한 효과들과, 애니메이션 그리고 프로젝트에 다양한 서비스들의 컬러가 조합되면 포트폴리오가 다채로워질 것이라 예상해본다.
