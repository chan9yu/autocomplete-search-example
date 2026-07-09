# 자동완성 검색창 (Autocomplete Search)

자동완성 검색창을 프론트엔드 시스템 설계 관점에서 구현한 학습용 예제입니다.
<br />
매 입력마다 요청이 폭증하고, 응답 순서가 뒤섞이며, 같은 검색어를 반복 요청하는 자동완성 특유의 문제를 **디바운스, 캐시, race condition 가드**로 풀어내고 키보드와 스크린 리더 사용자를 위한 **WAI-ARIA Combobox 접근성**까지 다룹니다.

## 핵심 설계

| 문제                            | 해결                              | 구현 위치                                            |
| ------------------------------- | --------------------------------- | ---------------------------------------------------- |
| 키 입력마다 요청이 폭증한다     | 디바운스 300ms                    | `useDebouncedValue`                                  |
| 너무 짧은 입력까지 요청한다     | 최소 글자 수 (2자)                | `useAutocomplete` (`enabled`)                        |
| 같은 검색어를 반복 요청한다     | 캐시 (staleTime 5분)              | React Query (`queryKey`)                             |
| 느린 응답이 뒤늦게 덮어쓴다     | 이전 요청 취소 + 최신 쿼리만 반영 | React Query (`queryKey`, `signal`)                   |
| 키보드·스크린 리더로 쓸 수 없다 | WAI-ARIA Combobox                 | `SearchInput`, `ResultDropdown`, `useListNavigation` |

캐시와 race condition 가드는 직접 구현하는 대신 [React Query](https://tanstack.com/query)에 위임했습니다.
<br />
`queryKey`가 곧 캐시 식별자이자 요청 경합의 기준이 됩니다.
<br />
`queryFn`에 전달되는 `signal`은 오래된 요청을 취소합니다.
<br />
반면 디바운스와 입력 상태는 UI에 밀착된 로직이라 직접 관리합니다.

## 기술 스택

- React 19 + TypeScript
- Vite 8 (개발 서버 + 목 API 미들웨어)
- TanStack Query (React Query) v5
- pnpm

## 시작하기

Node 24.x, pnpm 11.x 환경을 기준으로 합니다.

```bash
pnpm install
pnpm dev
```

목 API는 별도 백엔드가 아니라 **Vite 개발 서버에 붙는 미들웨어**입니다 (`server/mockApi.ts`).
<br />
`pnpm dev` 하나로 프런트엔드와 `/api/autocomplete` 엔드포인트가 함께 뜹니다.
<br />
실제 네트워크처럼 보이도록 200~600ms의 인위적 지연을 넣어 race condition을 재현합니다.

### 스크립트

| 명령              | 설명                       |
| ----------------- | -------------------------- |
| `pnpm dev`        | 개발 서버 실행             |
| `pnpm build`      | 타입 검사 후 프로덕션 빌드 |
| `pnpm lint`       | ESLint 검사                |
| `pnpm format`     | Prettier 포매팅            |
| `pnpm type:check` | 타입 검사 (`tsc --noEmit`) |

## 프로젝트 구조

```
src/
  components/               표현을 전담하는 UI 컴포넌트
    Autocomplete.tsx          훅과 UI를 잇는 컨테이너, 검색 실행 담당
    SearchInput.tsx           검색 입력 (role=combobox)
    ResultDropdown.tsx        결과 목록 (role=listbox), 로딩·에러·빈 결과·목록 분기
    ResultItem.tsx            결과 항목 (role=option)
  hooks/
    useAutocomplete.ts        자동완성 상태와 로직의 중심
    useDebouncedValue.ts      값 변경을 지연시키는 범용 디바운스 훅
    useListNavigation.ts      키보드 커서 이동(위/아래/초기화) 로직
  services/
    fetchAutocomplete.ts      /api/autocomplete 호출
  models/
    autocomplete.ts           Result, AutocompleteResponse 타입
  utils/
    getOptionId.ts            input과 option을 잇는 ARIA id 생성
server/
  mockApi.ts                  Vite 미들웨어 기반 목 API
  words.json                  검색 대상 키워드 데이터
```

## 데이터 흐름

```
입력 (SearchInput)
  → query 상태 (useAutocomplete)
  → 300ms 디바운스 (useDebouncedValue)
  → useQuery: 2자 이상일 때만 fetch, queryKey로 캐시·경합 관리
  → fetchAutocomplete(signal) → 목 API
  → results
  → ResultDropdown 렌더 (로딩 / 에러 / 빈 결과 / 목록)
```

`useAutocomplete`는 입력 상태, 디바운스, 쿼리, 키보드 내비게이션을 조합해 컴포넌트에는 렌더에 필요한 값(`results`, `isLoading`, `isOpen`, `highlightedIndex` 등)만 넘깁니다.
<br />
UI 컴포넌트는 상태를 만들지 않고 받은 값을 그리는 데 집중해 로직과 표현의 경계를 분명히 둡니다.

## 접근성

WAI-ARIA Combobox 패턴을 따릅니다.

- 입력에 `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
- 목록에 `role="listbox"`, 항목에 `role="option"`과 `aria-selected`
- 위/아래 화살표로 항목 이동, Enter로 검색 제출, Escape로 목록 닫기
- 포커스는 입력에 머문 채 `aria-activedescendant`로 활성 항목만 가리켜 스크린 리더가 현재 선택 항목을 읽어줍니다
