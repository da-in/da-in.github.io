---
layout: post
author: dain
title: "[Portfolio] 3일차, 개발(1) 글씨 써지는 애니메이션 제목과 레이아웃 🎨"
date: 2022-10-04 21:51:00 +0900
categories: [Project, Portfolio]
pin: false
---

## 3일차, 개발 (1) 글씨 써지는 애니메이션 제목과 레이아웃 🎨

> 서비스의 로고 까지는 아니지만, 내 이름 손글씨 세 글자를 아이덴티티로 가져가고 싶었다. Hand Writing 폰트를 사용하기보다는 진짜 내 글씨를 담고 싶어서, 손글씨를 쓴 후 일러스트레이터로 패스를 따서 SVG 파일로 변환해 사용하였다 _...(중략)..._ 추후 구현할 때에 SVG파일로 글씨 획을 써내려가는 애니메이션 효과를 넣어 지루하지 않게 할 계획이다.

-2일차 디자인 내용 중-

디자인 할 때에는 '제목에 글씨 스-윽 써지면 멋있겠지? 히히😊' 하면서 적었는데, 막상 이걸 구현하려니 정신이 아득...  
이거 디자인한 사람 나와! 하면 내가 손들고 나오는 흥미진진한 상황!

자 어떻게 구현할까 검색을 하는데 생각보다 자료들이 많았다. 검색하다보니 애니메이션, 트랜지션 그리고 인터랙티브 웹과 관련된 기술의 영역도 무궁무진하다는 것을 새삼스럽지만 깨달았다. 프론트엔드 개발자와 퍼블리셔의 업무 경계가 모호하고 회사마다 조금씩 차이가 있다고 들었는데, 퍼블리싱을 전문적으로 하는 분들은 이 분야를 깊게 알고계시는 것 같다는 생각이 들었다. 이쪽 영역도 나중에 깊게 공부해봐야겠다! 아주 흥미롭다👍

<br/>

## SVG File

먼저 나는 illustrator를 이용하여 만든 싸인 SVG 파일이 준비되어있다.

<img src='/assets/img/post/1004_choidain.svg' width='120px'>

<br/>

SVG 파일을 열어보면 아래와 같이 구성되어있다.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg id="signs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680.1 373">\
  <defs>
    <style>
    .cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px;}
    </style>
  </defs>
  <g id="sign">
    <path class="cls-1" d="M66.6,82c17.67,9.13,25.71,20.07,27.09,30.98,2.61,20.58,4.91,46.02-64.09,52.02-21.98,1.91,178.26-57.04,13,61-21,15,43-71,100-24"/>
    <path class="cls-1" d="M176.6,272c-45-1-154.98,13.8-171,9-10-3,109,22,87-75"/>
    <path class="cls-1" d="M159.6,5c47,126,32,239,32,363"/>
    <path class="cls-1" d="M228.1,150.5c46,1,119.11-33.89,92-21-143,68-33,99,15,63"/>
    <path class="cls-1" d="M367.1,55.5c19.06,68.83,22,183,13,231-3.15,16.82-5-147,66-154"/>
    <path class="cls-1" d="M532.1,112.5c-106,67-4,109,12,2"/>
    <path class="cls-1" d="M584.1,27.5c27,74,18,139,7,182"/>
    <path class="cls-1" d="M523.1,209.5c12,98,102,55,152,24"/>
  </g>
</svg>
```

`<path/>` 태그에 벡터 패스의 정보가 담겨있다. `ㅊ`, `ㅗ`, `ㅣ`, `ㄷ`, `ㅏ`, `ㅇ`, `ㅣ`, `ㄴ` 총 8개의 패스로 구성되어있고, `<g/>` 태그를 통해 그룹으로 묶여있는 형태이다.

illustrator를 이용하여 SVG 파일을 만들 때 이미 검정색 선으로 지정했기 때문에 `<style/>` 태그에 선 색이 검정(stroke: #000), 선 끝 모양 둥글게(stroke-linecap: round) 등으로 지정되어있다. 이런 속성들 값을 변화시키면 내가 원하는 애니메이션을 얻을 수 있을 것이다.

<br/>

그래서 그려지는 SVG 컴포넌트의 틀은 아래와 같다. 이번 프로젝트에서 사용중인 styled-components를 사용해 '...' 부분에 SVG에 스타일과 애니메이션 효과를 넣어주려고 한다. 그리고 이 컴포넌트로 `<path/>`들을 감싸주었다.

```javascript
import styled from "styled-components";
const StyledSignSVG = styled.svg`
    ...
`;

function Sign() {
  return (
    <StyledSignSVG
      width="120"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 680.1 373"
    >
      <path d="M66.6,82c17.67,9.13,25.71,20.07,27.09,30.98,2.61,20.58,4.91,46.02-64.09,52.02-21.98,1.91,178.26-57.04,13,61-21,15,43-71,100-24" />
      <path d="M176.6,272c-45-1-154.98,13.8-171,9-10-3,109,22,87-75" />
      <path d="M159.6,5c47,126,32,239,32,363" />
      <path d="M228.1,150.5c46,1,119.11-33.89,92-21-143,68-33,99,15,63" />
      <path d="M367.1,55.5c19.06,68.83,22,183,13,231-3.15,16.82-5-147,66-154" />
      <path d="M532.1,112.5c-106,67-4,109,12,2" />
      <path d="M584.1,27.5c27,74,18,139,7,182" />
      <path d="M523.1,209.5c12,98,102,55,152,24" />
    </StyledSignSVG>
  );
}
```

<br/>

## stroke-dasharray & stroke-dashoffset

자 이제 틀은 준비가 되었으니 애니메이션 효과만 주면 된다. 🙂

MDN Web Docs - SVG Attribute | [https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)

위 문서를 보면 SVG 파일에 사용할 수 있는 다양한 속성들이 정리되어있다. 나는 저기에서 `stroke-dasharray`, `stroke-dashoffset`을 이용하여 구현했다!

`stroke-dasharray`와 `stroke-dashoffset`이 어떠한 속성인지, 그리고 값에 따라 어떻게 작동하는지 예시 이미지들이 잘 정리되어있으니 잘 모르겠을 때에는 위 링크를 타고 들어가서 보도록 하자.

요약하면 `stroke-dasharray`는 SVG 윤곽선의 점선 패턴과 간격 등을 나타내는 속성이다. 그리고 `strokd-dashoffset`은 위에서 정의한 점선의 offset(변위차)를 나타낸다. 쉽게 표현하면 점선의 시작 지점을 앞으로 당기거나 미룰 수 있다.

그렇다면! `stroke-dasharray`값을 path 길이로 설정해 점선 패턴의 길이와 간격을 path 길이와 같게 설정해주면 점선이 아닌 것 처럼 다 채워져보일 것이다. 그리고 `stroke-dashoffset`값을 path 길이에서 0으로 줄여주면, 선이 없다가 점차 채워지는 것 처럼 보일 것이다!

먼저 초기 상태는 아래와 같이, 길이 450 점선을 dashoffset을 450을 주어 보이지 않는 상태이다. dasharray 값을 변화시켜보니 다 채워져 보이는 값이 450이었다.

```javascript
const StyledSignSVG = styled.svg`
  ...
  stroke-dasharray: 450;
  stroke-dashoffset: 450;
`;
```

다음으로 애니메이션을 정의해주었다. CSS animation을 사용하는 방법은 아래 공식문서에 정리되어있다!

MDN Web Docs - SVG Attribute | [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

애니메이션을 무한으로 재생하고 싶었기때문에, 0% ~ 50% 까지 채워졌다가 50% ~ 100% 사라지는 코드로 구현했다.

```javascript
import styled, { keyframes } from "styled-components";
const animation = keyframes`
  0% {
    stroke-dashoffset: 450;
  }
  50%{
    stroke-dashoffset: 0;
  }
  100%{
    stroke-dashoffset: 450;
  }
`;

const StyledSignSVG = styled.svg`
    ...
    stroke-dasharray: 450;
    stroke-dashoffset: 450;
    animation: ${animation} 1s linear infinite;
`;
```

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680.1 373" width="120px"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px;stroke-dasharray: 450;stroke-dashoffset: 450;animation: animation 1s linear infinite;}@keyframes animation {0% { stroke-dashoffset: 450; }50% { stroke-dashoffset: 0; }100% { stroke-dashoffset: 450; }}</style></defs><g><path class="cls-1" d="M66.6,82c17.67,9.13,25.71,20.07,27.09,30.98,2.61,20.58,4.91,46.02-64.09,52.02-21.98,1.91,178.26-57.04,13,61-21,15,43-71,100-24"/><path class="cls-1" d="M176.6,272c-45-1-154.98,13.8-171,9-10-3,109,22,87-75"/><path class="cls-1" d="M159.6,5c47,126,32,239,32,363"/><path class="cls-1" d="M228.1,150.5c46,1,119.11-33.89,92-21-143,68-33,99,15,63"/><path class="cls-1" d="M367.1,55.5c19.06,68.83,22,183,13,231-3.15,16.82-5-147,66-154"/><path class="cls-1" d="M532.1,112.5c-106,67-4,109,12,2"/><path class="cls-1" d="M584.1,27.5c27,74,18,139,7,182"/><path class="cls-1" d="M523.1,209.5c12,98,102,55,152,24"/></g></svg>

오... 이것은 대환장입니까?

각 패스들이 동시에 채워진다. 저런. 패스마다 delay를 주어야할 것으로 보인다. `animation-delay`를 사용하면 된다.

```javascript
const StyledSignSVG = styled.svg`
    ...
    stroke-dasharray: 450;
    stroke-dashoffset: 450;
    path:nth-child(1) {
        animation: ${animation} 1s linear infinite;
        animation-delay: 0s;
    }
    path:nth-child(2) {
        animation: ${animation} 1s linear infinite;
        animation-delay: 1s;
    }
    ...
    path:nth-child(8) {
        animation: ${animation} 1s linear infinite;
        animation-delay: 7s;
    }
`;
```

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680.1 373" width="120px"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px;stroke-dasharray: 450;stroke-dashoffset: 450;path:nth-child(1) {animation: animation 8s linear infinite;animation-delay: 0s;}path:nth-child(2) {animation: animation 8s linear infinite;animation-delay: 1s;}path:nth-child(3) {animation: animation 8s linear infinite;animation-delay: 2s;}path:nth-child(4) {animation: animation 8s linear infinite;animation-delay: 3s;}path:nth-child(5) {animation: animation 8s linear infinite;animation-delay: 4s;}path:nth-child(6) {animation: animation 8s linear infinite;animation-delay: 5s;}path:nth-child(7) {animation: animation 8s linear infinite;animation-delay: 6s;}path:nth-child(8) {animation: animation 8s linear infinite;animation-delay: 7s;}}@keyframes animation {0% { stroke-dashoffset: 450; }50% { stroke-dashoffset: 0; }100% { stroke-dashoffset: 450; }}</style></defs><g><path class="cls-1" d="M66.6,82c17.67,9.13,25.71,20.07,27.09,30.98,2.61,20.58,4.91,46.02-64.09,52.02-21.98,1.91,178.26-57.04,13,61-21,15,43-71,100-24"/><path class="cls-1" d="M176.6,272c-45-1-154.98,13.8-171,9-10-3,109,22,87-75"/><path class="cls-1" d="M159.6,5c47,126,32,239,32,363"/><path class="cls-1" d="M228.1,150.5c46,1,119.11-33.89,92-21-143,68-33,99,15,63"/><path class="cls-1" d="M367.1,55.5c19.06,68.83,22,183,13,231-3.15,16.82-5-147,66-154"/><path class="cls-1" d="M532.1,112.5c-106,67-4,109,12,2"/><path class="cls-1" d="M584.1,27.5c27,74,18,139,7,182"/><path class="cls-1" d="M523.1,209.5c12,98,102,55,152,24"/></g></svg>
