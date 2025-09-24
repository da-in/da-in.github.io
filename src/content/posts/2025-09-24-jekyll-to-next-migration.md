---
title: "Jekyll에서 Next.js로 마이그레이션 - 기록과 트러블슈팅"
date: 2025-09-24 21:00:00 +0900
categories: [Dev, Blog]
tags: [migration, nextjs, github-pages, ci, troubleshooting]
summary: Jekyll 기반 블로그를 Next.js(App Router, SSG, export)로 이전하면서 겪은 의사결정과 이슈 해결 과정을 정리했습니다.
---

오늘은 블로그를 Jekyll에서 Next.js로 전환했다. 의사결정 배경부터 실제 마이그레이션 절차, 중간에 부딪힌 문제와 해결책, 그리고 앞으로의 TODO를 남긴다.

## 왜 Next.js인가

- 실무 친화: 생태계/채용/레퍼런스 측면에서 유리
- 기능 확장성: App Router, SSG/ISR, MDX, SEO, 이미지 최적화 등
- 배포 유연성: Vercel/Pages 등 다양한 경로로 손쉬운 배포

## 마이그레이션 큰 흐름

1. Next.js 프로젝트 스캐폴딩 및 포스트 복사
   - 초기엔 `next-site` 폴더로 생성 → 점진 이전
   - `_posts` → `content/posts`로 복사, Front Matter 유지
2. 라우팅/렌더링
   - `/posts/[slug]` 상세, 홈 목록 구현
   - Giscus 댓글 연동
3. 빌드/정적 Export
   - `output: 'export'` + `images.unoptimized: true`
   - GitHub Pages 배포를 염두에 둠
4. 배포 파이프라인 전환
   - Jekyll 워크플로우 제거, Next 정적 산출물을 `gh-pages` 브랜치로 퍼블리시
5. 점진 정리
   - 이미지 경로 정리, 전역 CSS/레이아웃 정리, 공통 배너 추가

## 트러블슈팅 기록

### 1) 로컬 dev 404 (src/app 무시 문제)

- 증상: `/` 404
- 원인: 루트에 잔존 `app/` 디렉터리/루트 추론 문제로 `src/app`이 무시됨
- 해결: 잔여 `app/` 제거, dev 재시작

### 2) `Module not found: Can't resolve '@giscus/react'`

- 증상: CI에서 빌드 실패
- 원인: 패키지 누락
- 해결: `@giscus/react` 의존성 추가, 커밋/푸시

### 3) Pages 환경 보호 규칙으로 배포 차단

- 증상: `Branch "main" is not allowed to deploy…`
- 원인: Pages 환경이 특정 브랜치만 허용
- 해결: 워크플로우를 `gh-pages` 브랜치 퍼블리시 방식(peaceiris/actions-gh-pages)으로 전환. `force_orphan: true`와 `contents: write` 권한 부여

### 4) 대용량 push 중 400 끊김

- 증상: `HTTP 400` 전송 중 끊김
- 원인: 대형 이미지/네트워크 상황
- 해결: 일시적으로 `http.postBuffer` 확장 후 push → 완료 후 원복. 가능하면 SSH로 전환도 고려

### 5) export 에러: `generateStaticParams()` 누락

- 증상: `output: export`에서 동적 라우트가 사전생성되지 않아 실패
- 해결: `/posts/[slug]`에 `generateStaticParams()` 구현, 모든 슬러그 사전 생성

### 6) 경로 정리 후 빌드 실패 (콘텐츠 경로 변경)

- 증상: src 구조로 이동 후 빌드 시 포스트를 찾지 못함
- 원인: 로더 경로가 `content/posts`로 고정되어 있었음
- 해결: `src/lib/posts.ts`의 경로를 `src/content/posts`로 수정

### 7) 이미지가 컨테이너를 넘어감

- 증상: 본문 이미지가 화면을 넘김
- 해결: 전역 CSS에 `article img { max-width: 100%; height: auto; }` 적용

### 8) 안내 배너 전역화

- 요구: 홈뿐 아니라 포스트 페이지에도 마이그레이션 배너 노출
- 조치: `app/layout.tsx` 상단에 공통 배너 추가

## 현재 구조

```
src/
  app/                # App Router
  components/         # UI 컴포넌트 (Giscus 등)
  content/posts/      # 마크다운 포스트 원본
  lib/                # 마크다운 로더
public/               # 정적 자산 (루트 규약 유지)
next.config.ts        # output: 'export'
tsconfig.json         # paths: @/* -> src/*
```

## 배포 파이프라인

- 빌드: `pnpm build` → `out/` 생성
- 배포: GitHub Actions가 `out/`를 아티팩트로 받아 `gh-pages` 브랜치에 퍼블리시
- Pages 설정: `gh-pages` 브랜치 기준

## 남은 TODO

- [ ] 슬러그 호환성 개선: 한글/특수문자 기존 링크 최대 보존
- [ ] 태그/카테고리 라우트: `/tags`, `/categories` 인덱스+상세
- [ ] 피드(`/feed.xml`) 추가: Atom/RSS 정적 생성
- [ ] 코드 하이라이트/목차(remark/rehype or shiki) 적용
- [ ] 검색: Fuse.js(간단) → 필요 시 Pagefind/Algolia
- [ ] SEO: `sitemap.xml`, `robots.txt`, 기본 메타 템플릿
- [ ] 404/리다이렉트: 변경된 경로 301 매핑(필요 시)
- [ ] 스타일 정리: 다크모드/본문 타이포/코드 블록 스타일
- [ ] 문서: CONTRIBUTING, ISSUE/PR 템플릿

---

앞으로는 디자인을 정비하고(레이아웃, 타이포, 색상 체계) 검색/SEO/태그 페이지까지 정리해 완성도를 끌어올릴 계획이다. 이번 전환으로 개발 생산성과 확장성이 크게 좋아졌다.


