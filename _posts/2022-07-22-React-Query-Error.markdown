---
layout: post
title: "[TypeScript] Could not find a declaration file for module 'react-query'"
date: 2022-07-21 17:30:00 +0900
categories: Typescript
---

## ๐จCould not find a declaration file for module 'react-query'

<br/>

## 1. Error Occured

```
import {QueryClient, QueryClientProvider} from 'react-query'
```
React Native ํ๋ก์ ํธ์์ API ์ํ๊ด๋ฆฌ๋ฅผ ์ํด react-query๋ฅผ ์ค์นํ๊ณ  ๋ชจ๋์ ์ํฌํธํ๋๋ฐ ๋ค์๊ณผ ๊ฐ์ ์๋ฌ๊ฐ ๋ฐ์ํ๋ค.


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

์ ์๋ฌ๋ ์ผ๋จ ๋ณดํต Typescript๋ฅผ ์ฌ์ฉํ  ๋ ๋ชจ๋์ ํ์์ด ์ ์๋์ง ์์์ ๋ฐ์ํ๋ ์๋ฌ๋ก, ํด๋น ๋ชจ๋์์ ์์ฒด์ ์ผ๋ก ํ์์ ์ ๊ณตํ์ง ์์ ๋์ ๋ฐ์ํ๋ฉฐ, community-contributed typings๋ฅผ ์ ๊ณตํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค์ @types/module-name ์ ์ค์นํจ์ผ๋ก์ ํด๊ฒฐํ  ์ ์๊ณ , ๊ทธ ์ธ์๋ types๋ฅผ ์ง์  ์ค์ ํจ์ผ๋ก์ ํด๊ฒฐ์ด ๊ฐ๋ฅํ๋ค.

react-query์ ๊ฒฝ์ฐ community-contributed typings๊ฐ ์กด์ฌํด์ `@types/react-query`๋ฅผ ์ค์น๋ฅผ ํด๋ณด์์ง๋ง ๊ณ ์ณ์ง์ง ์์๋ค.

<br/>

## 3. Use require()

๋ฌธ์  ์ํฉ์ ๊ฒ์ํ๋ฉฐ ๋์๋ ํด๊ฒฐ ๋ฐฉ๋ฒ ์ค ํ๋. require๋ฅผ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ์ ํ์ธํ๋ค.

```
const reactQuery = require('react-query');
const {QueryClient, QueryClientProvider} = reactQuery;
```

์์๊ฐ์ด ์์ฑ์ ํ๋ฉด ์๋ฌ๋ ์๋์ง๋ง, require๋ฅผ ์ฌ์ฉํ ๋ถ๋ถ์ import๋ฌธ์ ์ฌ์ฉํ  ์ ์๋ค๋ ๊ฒฝ๊ณ ๊ฐ ๋จ๊ณ ,
react-query ๋ชจ๋์ ์ฌ์ฉํ  ๋ ํ์์ฒดํน์ด ์ ๋๋ก ์๋ํ์ง ์์๋ค.

<br/>

## 4. ๋ชํ์ ๋ค์ธ(Detective Dain)

**[ ๋จ์ 1 ]**  
node_modules ํด๋์ @types/react-query ์ ๊ฐ๋ณด๋ readme ํ์ผ์ react-query๋ ์์ฒด์ ์ธ ํ์์ ์ ๊ณตํ๋ฏ๋ก @types/react-query๋ฅผ ์ค์นํด์ค ํ์๊ฐ ์๋ค๊ณ  ๋ช์๋์ด์์๋ค._์ฝ๊ฐ ๋ณด๋ฌผ์ฐพ๊ธฐ ์ชฝ์ง ์ฐพ์ ๋๋_

๊ทธ๋์ @types/react-query๋ ๋ค์ remove ํด์ฃผ์๋ค.

**[ ๋จ์ 2 ]**  
node_modules์ react-query ํด๋์ package.json ํด๋์ types์ ๊ฒฝ๋ก๊ฐ ์ง์ ๋์ด์๋๋ฐ `build/types/packages/query-core/src/index.d.ts`๋ก ์ค์ ๋์ด์์๋ค. ๊ทธ๋ฐ๋ฐ build ํด๋ ์์ types๋ผ๋ ํด๋๊ฐ ์กด์ฌํ์ง ์์๋ค... (ํผ๋๐ฑ)

<br/>

## 5. Install Previous Version

๊ฒฐ๋ก ์ ์ผ๋ก ์น๊ตฌ ๊ฐ๋ฐ์์ ์กฐ์ธ์ผ๋ก ๋ฆฌ์กํธ ์ฟผ๋ฆฌ ๋ฒ์ ์ ๋ฎ์ถฐ์ฃผ๋ ๋ฌธ์ ๊ฐ ํด๊ฒฐ๋์๋ค. 4.0.0์ด ์ต๊ทผ์ ๋ฐฐํฌ๋ ๋ฒ์ ์ด๋ผ ๋ฌธ์ ์๋ ๊ฒ ๊ฐ๋ค. ์น๊ตฌ๊ฐ ๋ง์ง๋ง์ผ๋ก ์ฌ์ฉํ๋ react-query 3.39.1 ๋ฒ์ ์ผ๋ก ์ค์นํ๋ค.

```
yarn install react-query@3.39.1
```

๊ทธ๋ฌ๋๋ ์ ์ ์๋ํ๋ค.

(์์ธ์ธ์ง ๋ชจ๋ฅด๊ฒ ์ง๋ง 3.39.1 ๋ฒ์ ์ ์ค์นํ์ ๋์๋ node_modules/react-query/package.json์ types๊ฒฝ๋ก๊ฐ types/index.d.ts๋ก ์ง์ ๋์ด์์๊ณ , typesํด๋๋ ์ ์์๋ค!)

<br/>

## Conclusion

๐์ผ๋จ ๋ชจ๋ ์๋ฌ๊ฐ ๋๋ค๋ฉด ์ต์  ๋ฒ์  ์ด์๋ ์๋์ง ๊ผญ ํ์ธํด๋ณด์.  
(๊ทธ๋ ์ง ์์ผ๋ฉด 2~3์๊ฐ์ด ๊ฑฐ๋ฌํ๊ฒ ์ฌ๋ผ์ง๋ค.)
