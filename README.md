<div align="center">

# da-in.github.io (Next.js)

Next.js 기반의 개인 블로그/사이트 저장소입니다. GitHub Pages(gh-pages 브랜치)로 정적 배포합니다.

</div>

## Stack
- Next.js 15 (App Router, SSG, output: export)
- TypeScript, ESLint
- 마크다운 포스트 파일: `content/posts/*`
- 댓글: Giscus

## 로컬 개발
```bash
pnpm install
pnpm dev
# http://localhost:3000
```

## 프로덕션 빌드
```bash
pnpm build   # out/ 폴더 생성
```

## 배포(깃허브 액션)
- 브랜치: main → 워크플로우 실행 → `out/`를 `gh-pages` 브랜치에 퍼블리시
- 워크플로우 파일: `.github/workflows/pages-deploy.yml`

## 프로젝트 구조(요약)
```
app/                # Next.js App Router 라우트
components/         # UI 컴포넌트
content/posts/      # 마크다운 포스트 원본
lib/                # 로더/유틸
public/             # 정적 자산(이미지/파비콘 등)
next.config.ts      # output: export, images.unoptimized 등
package.json        # 스크립트(dev/build/start)
```

## 마이그레이션 메모(Jekyll → Next)
- Jekyll 의존 파일 제거 완료(Jekyll 테마/설정/스크립트 삭제)
- 기존 이미지는 `public/assets/img`로 이전
- 퍼머링크: `/posts/:slug/` 형태 유지(특수문자 슬러그는 안전하게 정규화)

## 커밋 컨벤션
- Conventional Commits 권장 (예: `feat: ...`, `fix: ...`, `chore: ...`)

## 라이선스
- MIT