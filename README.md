# My-project

## 실행 방법

### 1. Docker 사용 시

```bash
# Docker 컨테이너 실행
docker-compose up
```

### 2. Docker 미사용 시

#### 필수 요구사항

- Node.js (v20.12.2)
- pnpm (v9.7.1)

#### 설치 및 실행 단계

```bash
# 1. pnpm 설치
npm install -g pnpm

# 2. 프로젝트 의존성 설치
pnpm install

# 3. 개발 서버 실행
pnpm dev

# 4. 별도의 터미널에서 MSW Mock 서버 실행 (포트: 9090)
pnpm mock
```

## 개발 환경 접속

- 프론트엔드 서버: http://localhost:3000

## 기술 스택 및 라이브러리

### 주요 라이브러리

- **@tanstack/react-query**: API 응답 데이터의 캐싱 처리와 서버 데이터 실시간 동기화 상태를 효율적으로 관리하기 위해 사용

- **axios**: axios 인스턴스를 생성하여 공통 base URL을 설정하고 API 요청을 관리하기 위해 사용

- **dayjs**: 캘린더의 날짜 포맷팅, 시간대 변환, 날짜 비교 및 계산 기능을 사용하기 위해 사용

- **socket.io** / **socket.io-client**: 채팅 구현시 실시간 양방향 통신을 구현하기 위해 사용 실시간 알림 처리, 서버와의 실시간 데이터 동기화, 연결 상태 모니터링 기능을 활용

- **zod**: TypeScript 기반의 데이터 유효성 검사 라이브러리 API 요청/응답 데이터의 타입 검증, 폼 입력값 유효성 검사, 런타임에서의 타입 안정성을 확보하기 위해 사용

- **zustand**: zustand persist 기능을 활용하여, 캘린더에서 사용자가 선택한 날짜를 SessionStorage에 저장하고 페이지 새로고침이나 페이지 이동 후에도 선택 상태를 유지하기 위해 사용

### UI 관련 라이브러리

- **@radix-ui/react-slot**: 컴포넌트 합성 패턴을 구현하고 UI 컴포넌트의 재사용성을 향상시키기 위해 사용

- **class-variance-authority**: 조건부 스타일링 로직을 관리하고 컴포넌트의 다양한 변형(variants)을 처리하기 위해 사용

- **clsx** & **tailwind-merge**: 동적 클래스 결합과 Tailwind 클래스 충돌 해결을 위한 조건부 스타일링을 처리하기 위해 사용

- **lucide-react**: 일관된 디자인 시스템을 위한 아이콘을 제공하고 SVG 아이콘의 크기와 색상을 동적으로 제어하기 위해 사용

### 개발 도구 및 테스트

- **msw**: API 모킹을 통해 프론트엔드 개발 환경을 구축하고 백엔드 API 완성 전에도 프론트엔드 개발이 가능하도록 하기 위해 사용

- **express**: Mock 서버 구현을 위한 API 엔드포인트를 정의하고 개발 환경에서의 API 테스트 환경을 제공하기 위해 사용

- **cors**: 개발 환경에서의 Cross-Origin 요청 처리와 도메인 간 통신을 허용하기 위해 사용

- **uuid**: 목업 데이터의 고유 ID 생성과 임시 데이터 식별을 위한 키를 생성하기 위해 사용

- **@mswjs/http-middleware**: MSW의 모의 API 요청/응답을 처리하고 Express 서버와 MSW를 통합하기 위해 사용

## 참고사항

- 해당 프로젝트는 Next.js 15.1.1버전으로 구축하였습니다.