---
layout: post
author: dain
title: "[Blog] Git Blog에 댓글 기능 추가하기 (Jekyll, Chirpy, 400, 404 Error 정리)"
date: 2022-10-19 17:14:00 +0900
categories: [Blog]
pin: false
---

## 댓글 기능을 추가해보자!

그동안은 그저 기록 용이라고 생각하고 포스트를 적었지만, Google Analytics에 등록하니 생각보다 많은 분들이 조회해주시는 것을 확인했다.
앞으로 더 열심히 공부하며 적어야겠습니다. 킹치만 나는 코린인걸...😣

공부하면서 적는 글이다보니 잘못된 내용을 적으면 어떡하지 라는 생각이 들고 소름이 끼쳤다. 그리고 그 글을 많은 사람이 본다면? 와우.😱
최대한 공식문서도 한번 더 살펴보며 적겠지만, 만일을 위해 틀린 내용은 틀렸다는 시그널을 받을 수 있다면 좋겠다고 생각했다.

그래서 댓글 기능을 적용하기로 마음 먹은 것이다!

<br/>

## 어떤 댓글 시스템을 이용할까?🤔

저는 지킬의 Chirpy 테마를 사용중에 있는데 정말 감사하게도 Comments 기능을 활성화하는 옵션들이 사용하기 쉽게 정리되어있답니다.
만약 Jekyll 테마를 사용하지 않더라도 당연히 적용이 가능합니다!

먼저 블로그를 하시는 분들이 댓글 기능을 편하게 이용하기 위해 댓글 시스템을 도입합니다.
`disqus`, `utterances`, `giscus`을 많이 사용하는 것 같고, Jekyll Chirpy 테마에서도 이 세가지 댓글시스템을 쉽게 적용할 수 있도록 설계되어있습니다!👍

disqus
: [disqus 소개 페이지](https://help.disqus.com/en/articles/1717053-what-is-disqus)에 가면 어떠한 서비스인지, 그리고 UI를 확인할 수 있다. 독립적인 댓글 시스템으로, disqus의 장점은 원한다면 광고를 달아 수익을 창출할 수 있고, 사용자가 Google, Facebook, Twitter 등의 SNS계정으로 로그인하여 댓글을 달 수 있다는 것이다.

utterances
: 뒤의 `giscus`와 전체적으로 유사하다. utterances는 **Github Issue**에 기반한 댓글 위젯으로 UI도 Github와 거의 비슷한 형태를 하고 있다. [utterances 가이드](https://utteranc.es/?utm_source=saashub&utm_medium=marketplace&utm_campaign=saashub)

giscus
: utterances는 **Github Discussions**에 기반한 댓글 시스템으로 utterances에서 영감을 받았다고 문서에 기술되어있다. [giscus 가이드](https://giscus.app/ko).

먼저 개발 블로그임으로 소셜 로그인 기능은 꼭 필요한 기능이 아니기에 `disqus`를 제외하였다. `utterances`와 `giscus`가 유사한 형태를 가지고 있지만 더 활발하게 유지 보수가 되고 있다는 점과, `utterances`가 대화 흐름을 Issue로 담아내기 어려웠고 그를 Discussion을 활용해 개선한 것이 `giscus`라는 점에서 `giscus`를 최종적으로 선택했다! (그 외에도 reaction 등의 부가 기능들도 있고 말이다.👍) 장단점을 비교할 때 후기 글들을 열심히 찾아보았다! 사용해보신 분들 중 `utterances`에서 `giscus`로 옮겨가신 분의 생생한 후기를 공유한다. [Max Brenner Blog](https://shipit.dev/posts/from-utterances-to-giscus.html)

<br/>

## 적용해보자!

적용하는 법은 사실 매우 간단하다. Jekyll 테마를 사용하지 않는 본인의 사이트에 댓글 시스템을 도입하고 싶다면, [giscus 가이드](https://giscus.app/ko)에 들어가서 옵션들을 선택하여 생성한 `<script/>`태그를 웹사이트에 삽입해주면 된다.

Jekyll(Chirpy Theme)의 Comment 기능을 활성화 하는 방법을 알아보자.
Chirpy의 Guide를 보면 다음과 같이 설명되어있다.

> ### Comments
>
> The global switch of comments is defined by variable `comments.active` in the file `_config.yml`{: .filepath}. After selecting a comment system for this variable, comments will be turned on for all posts.
> comments: false

<br/>

Jekyll(Chirpy Theme)는 블로그와 관련한 전반적인 설정은 \_config.yml 에서 제공한다.
Comments 관련 세팅 또한 \_config.yml 에서 설정이 가능하다.

```yml
comments:
  active: giscus
  # The global switch for posts comments, e.g., 'disqus'.  Keep it empty means disable
  # The active options are as follows:
  disqus:
    shortname: ...
  utterances:
    repo: ...
  giscus:
    repo: da-in/da-in.github.io
    repo_id: MDEwOlJlcG9zaXRvcnkzNTM5MDcyOTU=
    category: General
    category_id: DIC_kwDOFRgyX84CSEWg
```

{: file='\_config.yml'}

comments 아래의 active에 **사용할 시스템**을 입력하면 된다. (🚨true 값을 넣으면 작동하지 않는다!)
그리고 repo, repo_id, category, category_id 값을 입력해주면 된다. 지킬 테마가 아닌 사이트에 적용할 때 처럼
[giscus 가이드](https://giscus.app/ko)에 들어가서 정보들을 입력했을 때 생성되는 스크립트의 값들을 참조하면 된다!

## 🚨 400 error: "Unable to create discussion with request body."

주의할 점은 사이트에서 category를 선택안해도 하단에 스크립트는 생성이되지만, category를 지정안하면(입력하지않으면) 추후 discussion 생성 요청에서 body에 이상한 값이 들어가서 400 Error 가 발생한다. 모든 요소들을 정확하게 입력했는지, 누락하지 않았는지 확인하자.

<br/>

## Jekyll(Chirpy)에서 추가 옵션을 사용하는 법

giscus에는 더 많은 옵션들이 있는데 \_config.yml에 입력하면 작동하지 않는다.
구조를 살펴보면 config.yml에서 사용자가 입력한 값들을 읽어온 후, Chirpy 테마에서 지정한 옵션들과 합쳐서 giscus 요청을 보내는 방식이기 때문이다.
Chirpy 테마의 경우 \_includes/comments/giscus.html에 이 내용이 지정되어있다.

```javascript
let giscusAttributes = {
  src: "https://giscus.app/client.js",
  "data-repo": "{{ site.comments.giscus.repo}}",
  "data-repo-id": "{{ site.comments.giscus.repo_id }}",
  "data-category": "{{ site.comments.giscus.category }}",
  "data-category-id": "{{ site.comments.giscus.category_id }}",
  "data-mapping": "{{ site.comments.giscus.mapping | default: 'pathname' }}",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-theme": initTheme,
  "data-input-position":
    "{{ site.comments.giscus.input_position | default: 'bottom' }}",
  "data-lang": "{{ site.comments.giscus.lang | default: lang }}",
  crossorigin: "anonymous",
  async: "",
};

let giscusScript = document.createElement("script");
Object.entries(giscusAttributes).forEach(([key, value]) =>
  giscusScript.setAttribute(key, value)
);
document.getElementById("tail-wrapper").appendChild(giscusScript);
```

site.comments를 통해 접근한 값들은 모두 \_config.yml 에서 설정한 값들이고, 그 외에도 `data-reactions-enabled`(리액션 가능 여부 설정) 등의 옵션들이 지정되어있는 것을 볼 수 있다. 그러므로 추가적으로 사용하고 싶은 옵션이 있다면 이곳에 작성해야한다!🙂

<br/>

이렇게 하면 블로그 전체 포스트에 대해 댓글 기능이 활성화된다.

## 🚨 404 error: "Discussion not found"

여기서 콘솔창을 확인하면, 처음에 포스트에 접근했을 때 댓글이 하나도 없는 경우 🚨 404 error: "Discussion not found" 에러가 발생할 수 있다.
giscus는 포스트에 첫 댓글이 달릴 때 Github Discussion을 생성한다. 따라서 댓글이 없는 경우 아직 Discussion이 생성되지 않아 발생하는 에러이다. **고로 무언가 잘못된 것은 아니다!** 포스트에 첫 댓글을 달면 에러가 발생하지 않는다. 추후 거슬리면 콘솔에 찍히지 않도록 예외처리도 고민해볼만 하다.

<br/>

## 포스트에 따라 댓글 비활성화

그리고 각 포스트 마다 설정을 달리 할 수 있는데, 포스트 가장 상단에 `comments: false` 옵션을 주면 된다.

```
---
layout: post
author: dain
title: "[Blog] Git Blog에 댓글 기능 추가하기 (with Jekyll Chirpy)"
...
comments: false
---
```

그러면 지금 포스트 하단에 보이는 댓글창이 생긴다!
앞으로 포스트에서 혹시 잘못된 내용이 있다면 댓글 시그널을 부탁드리겠습니다🙏

감사합니다.

### Reference

🤩 disqus | [https://help.disqus.com/en/articles/1717053-what-is-disqus](https://help.disqus.com/en/articles/1717053-what-is-disqus)
🔥 utterances | [https://utteranc.es/?utm_source=saashub&utm_medium=marketplace&utm_campaign=saashub](https://utteranc.es/?utm_source=saashub&utm_medium=marketplace&utm_campaign=saashub)
👍 giscus | [https://giscus.app/ko](https://giscus.app/ko)
🙂 Max Brenner Blog | [https://shipit.dev/posts/from-utterances-to-giscus.html](https://shipit.dev/posts/from-utterances-to-giscus.html)
