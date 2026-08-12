# 오늘의 메뉴

점심 메뉴를 3초 만에 골라주는 Next.js 앱. 좋아요 집계는 Supabase에 저장하고, Vercel로 배포한다.

## 요구 사항

- Node.js `>=22.13.0`
- Supabase 프로젝트 (URL / anon key)

## 시작하기

```bash
npm install
cp .env.example .env.local   # Supabase 값 채우기
npm run dev
```

## 구조

- `app/` — 페이지와 레이아웃 (App Router)
- `lib/supabase.ts` — Supabase 브라우저 클라이언트
- `supabase/schema.sql` — `menu_likes` 테이블, RLS 정책, `set_menu_like` 함수
- `public/` — 정적 파일
- `tests/rendered-html.test.mjs` — 화면 문구와 Supabase 스키마 계약 검증

## 명령어

- `npm run dev` — 로컬 개발 서버
- `npm run build` — 프로덕션 빌드
- `npm start` — 빌드 결과 실행
- `npm test` — 빌드 후 테스트 실행
- `npm run lint` — ESLint

## 배포

Vercel에 연결되어 있고, `main`에 푸시하면 자동 배포된다. `vercel.json`이 프레임워크를 `nextjs`로 고정하므로 대시보드의 Framework Preset / Output Directory는 기본값(Override 해제)으로 두어야 한다.
