---
layout: post
title: "[Etc] 너무 너무 유용한 Online Parser"
date: 2022-08-02 19:43:00 +0900
categories: Etc
---

## 생각나서 기록해두는 너무 너무 유용한 Online Parser

### 파싱(Parsing)
파싱은 구문 분석이라고도 하는데, 쉽게 표현하면 구조에 맞게 정리해주는 것으로 이해할 수 있다.
그리고 파싱을 해주는 프로그램을 파서(Parser) 라고 할 수 있다.

예전에 크롤링 할 때 넘어오는 정보를 입력하면, 파악하기 쉽게 파싱해주는 온라인 사이트들을 많이 이용했었다.
요즘 React-Native 프로젝트를 하면서 Back-End에서 넘어오는 JSON 값들을 파악하는데에도 유용하게 사용하고 있어서 생각난 김에 기록을 남긴다.

1. HTML parser
크롤링 초반, 얻고자 하는 정보에 가까워지기 전에는 웹 페이지를 거의 통으로 받아오면 그 양이 너무 많아서 터미널에서 다 읽을 수 조차 없다.
그럴 때에는 Online HTML Parser를 이용하면 구조를 한눈에 파악할 수 있다.  
https://jsonformatter.org/html-viewer  
https://codebeautify.org/htmlviewer  

<br/>

2. JSON Parser
서버와의 API 통신에서 JSON 형태로 데이터가 넘어오면, 어떠한 값들이 어떠한 구조로 넘어오는지 파악하기 쉽게 파싱해준다.  
https://jsonformatter.org/json-parser  
http://json.parser.online.fr/  

<br/>

3. CURL Converter
Chrome 개발자 도구를 이용하면 원하는 요청의 CURL 커맨드를 복사할 수 있는데, Python, Node.js 등의 다양한 언어로 크롤러를 작성 할 때(크롤러가 아니더라도 request를 작성할 때) 이 CURL 컨버터를 사용하면 원하는 언어의 Request로 자동 변환해주어 매우 편하게 요청 코드를 작성할 수 있다.🙂