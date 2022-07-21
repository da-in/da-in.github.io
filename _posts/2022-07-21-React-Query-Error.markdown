---
layout: post
title: "[TypeScript] Could not find a declaration file for module 'react-query'"
date: 2022-07-21 17:30:00 +0900
categories: Typescript
---

## 🚨Could not find a declaration file for module 'react-query'

<br/>

## 1. Error Occured

```
import {QueryClient, QueryClientProvider} from 'react-query'
```
React Native 프로젝트에서 API 상태관리를 위해 react-query를 설치하고 모듈을 임포트하는데 다음과 같은 에러가 발생했다.


<figure>
  <img width=500 src='/assets/img/react-query-2.png' alt='action'>
  <figcaption style="text-align: center;">wow</figcaption>
</figure>

```
Could not find a declaration file for module 'react-query'.
'C:/Users/.../node_modules/react-query/build/cjs/packages/react-query/src/index.js'
implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-query` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-query';`
```

<br/>

## 2. Install @types/react-query 

위 에러는 일단 보통 Typescript를 사용할 때 모듈의 타입이 정의되지 않아서 발생하는 에러로, 해당 모듈에서 자체적으로 타입을 제공하지 않을 때에 발생하며, community-contributed typings를 제공하는 라이브러리들은 @types/module-name 을 설치함으로서 해결할 수 있고, 그 외에는 types를 직접 설정함으로서 해결이 가능하다.

react-query의 경우 community-contributed typings가 존재해서 `@types/react-query`를 설치를 해보았지만 고쳐지지 않았다.

<br/>

## 3. Use require()

문제 상황을 검색하며 나왔던 해결 방법 중 하나. require를 사용하는 방법을 확인했다.

```
const reactQuery = require('react-query');
const {QueryClient, QueryClientProvider} = reactQuery;
```

위와같이 작성을 하면 에러는 안나지만, require를 사용한 부분에 import문을 사용할 수 있다는 경고가 뜨고,
react-query 모듈을 사용할 때 타입체킹이 제대로 작동하지 않았다.

<br/>

## 4. 명탐정다인(Detective Dain)

**[ 단서 1 ]**  
node_modules 폴더의 @types/react-query 에 가보니 readme 파일에 react-query는 자체적인 타입을 제공하므로 @types/react-query를 설치해줄 필요가 없다고 명시되어있었다._약간 보물찾기 쪽지 찾은 느낌_

그래서 @types/react-query는 다시 remove 해주었다.

**[ 단서 2 ]**  
node_modules의 react-query 폴더의 package.json 폴더에 types의 경로가 지정되어있는데 `build/types/packages/query-core/src/index.d.ts`로 설정되어있었다. 그런데 build 폴더 안에 types라는 폴더가 존재하지 않았다... (혼란😱)

<br/>

## 5. Install Previous Version

결론적으로 친구 개발자의 조언으로 리액트 쿼리 버전을 낮춰주니 문제가 해결되었다. 4.0.0이 최근에 배포된 버전이라 문제였던 것 같다. 친구가 마지막으로 사용했던 react-query 3.39.1 버전으로 설치했다.

```
yarn install react-query@3.39.1
```

그랬더니 정상 작동한다.

(원인인지 모르겠지만 3.39.1 버전을 설치했을 때에는 node_modules/react-query/package.json에 types경로가 types/index.d.ts로 지정되어있었고, types폴더도 잘 있었다!)

<br/>

## Conclusion

😂일단 모듈 에러가 난다면 최신 버전 이슈는 아닌지 꼭 확인해보자.  
(그렇지 않으면 2~3시간이 거뜬하게 사라진다.)