---
layout: post
title: "Python 함수 정리"
date: 2021-04-09 21:00:00 +0900
categories: [Language, Python]
tags: [python, function]
---

✔ 백준 알고리즘 문제를 풀면서 사용한 파이썬 함수들을 향후 빠르게 검색하기 위하여 정리한다.  
✔ 새로운 함수를 볼 때마다 본 포스트를 업데이트 한다.

🚩최종 업데이트 (2021-04-09)  
<br/>

---

<br/>

- **ord(**parameter**)**  
  입력한 문자에 해당하는 아스키 코드(ASCII Code)를 반환한다.

- **chr(**parameter**)**  
  입력한 아스키 코드(ASCII Code)에 해당하는 문자를 반환한다.

- target.**index(**parameter**)**  
  target(문자열, 리스트, 튜플)에서 입력한 parameter가 처음 위치한 자리의 값을 알 수 있다.  
  target 내에 parameter가 존재하지 않으면 `ValueError`가 발생한다.

- math.**floor(**parameter**)**  
  math 모듈의 함수이다.  
  parameter를 내림한 정수값을 반환한다.

- math.**ceil(**parameter**)**  
  math 모듈의 함수이다.  
  parameter를 올림한 정수값을 반환한다.

- math.**trunc(**parameter**)**  
  math 모듈의 함수이다.  
  truncate 자르다는 의미를 가지고 있으며,  
  parameter를 0에 가깝게 내림한 정수값을 반환한다.  
  {% highlight ruby %}
  import math.trunc(-3.14) = -3
  {% endhighlight %}

- **round(**parameter**)**  
  parameter를 반올림한 정수값을 반환한다.

- target.**replace(**search_text, replace_text, count**)**  
  target에서 search_text 문자열을 찾아서 replace_text로 바꾸어준다.  
  count는 치환할 회수로 생략 가능하다.
