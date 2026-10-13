# Wikiang themes

위키앙이 관리하는 공식 테마 저장소입니다. 운영 표기는 **WIKIANG LLC**를 사용합니다.

현재 패키지 버전은 **2.0.0**, 문서 렌더러 계약은 **API 1**입니다.

| 스킨 | 화면 |
| --- | --- |
| `standard` · 기본형 | 탐색 메뉴와 문서 지면을 갖춘 기본 위키 |
| `classic` · 클래식형 | 촘촘한 본문과 사각 문서 탭 |
| `reading` · 읽기형 | 넓은 여백과 본문 중심 배치 |
| `encyclopedia` · 백과사전형 | 왼쪽 목차, 가운데 문서, 오른쪽 보기 설정 |

각 스킨은 밝은 화면과 어두운 화면을 지원합니다. 백과사전형에는 글자 크기 선택이 있습니다.

## 코어와 테마의 경계

- 이 저장소: 스킨 목록·표시 이름·CSS·시각적 배치·호환 버전.
- 호스트 앱: 문서 HTML 구조와 접근성, 라우팅·검색·편집·이력·권한·DB, 사용자 설정 쿠키.
- 스킨을 바꿀 때 편집기와 문서 컴포넌트를 재생성하지 않습니다.
- 네 스킨은 호스트의 공통 문서 셸을 사용합니다. 다른 CMS에 그대로 설치되는 범용 테마는 아닙니다.

`skins/registry.ts`와 `skins/styles.css`가 공개 진입점이며, `skin-package.json`이 호환 계약입니다. 런타임 의존성·설치 스크립트·원격 CSS 요청은 없습니다.

## 앱 연결과 업데이트

앱은 `vendor/wikiang-theme` Git 서브모듈로 **검증한 커밋을 고정**합니다. 저장소의 main이 바뀌어도 운영 테마는 자동으로 바뀌지 않습니다. 배포 이미지는 GitHub Actions에서 만듭니다.

1. 이 저장소에 테마 변경 PR을 올려 패키지 CI를 통과시킵니다.
2. 지정된 안전 병합 절차로 병합합니다.
3. 앱의 서브모듈을 선택한 커밋으로 갱신하는 PR을 올립니다.
4. 앱 CI가 패키지 계약·전체 문서·실제 편집·4개 스킨 × 375/768/1440px를 확인합니다.
5. 앱 PR 병합 후 CI에서 이미지를 배포하고 운영 URL을 읽기 전용으로 재검사합니다.

되돌릴 때는 앱의 서브모듈 포인터를 직전 검증 커밋으로 되돌려 같은 CI 절차를 거칩니다. 앱 체크아웃에는 `git submodule update --init vendor/wikiang-theme`가 필요합니다.

**운영 서버에서는 빌드·테스트·린트·개발 서버·브라우저를 실행하지 않습니다. 모든 검증은 GitHub Actions에서 수행합니다.**

## 렌더러 API 1

최상위 `.wiki-layout`에 `data-wiki-skin`과 `data-wiki-text` 속성이 있어야 합니다. `.dark` 또는 `.amoled`는 문서 루트에 적용합니다. 공통 셸이 `--background`, `--foreground`, `--border`, `--muted`, `--muted-foreground`를 제공합니다. 스킨은 `--wiki-skin-accent`와 `--wiki-skin-dark-accent`를 지정합니다.

주요 셀렉터: `.site-header`, `.wiki-body`, `.wiki-nav`, `.mobile-explore`, `.wiki-main-col`, `.wiki-shell`, `.wiki-main`, `.wiki-title`, `.wiki-actions`, `.wiki-action`, `.wiki-toc-rail`, `.wiki-toc`, `.wiki-appearance`, `.appearance-controls`, `.wiki-prose`, `.welcome`, `.topic`. 이 계약이 변경되면 `rendererApi`를 올리고 호스트 호환 변경과 함께 검증해야 합니다.

## 기존 테마

`themes/wikiang/`와 `deploy/install.sh`는 종전 슬롯 방식 테마를 위한 자료입니다. 현재 운영의 네 스킨은 `skins/` 패키지를 사용합니다. 이전 설치 스크립트로 현재 운영 패키지를 갱신하지 않습니다.

MIT. 기존 프로젝트의 라이선스 조건을 유지합니다.
