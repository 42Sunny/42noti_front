# 42 Event

## 개요

- 42서울에서 진행되는 행사 정보를 보다 편하게 확인하고 행사 시작 전 알림을 받아보기 위한 42Event 서비스의 API입니다.
- 서비스는 [42Event](http://event.42cadet.kr)에서 제공됩니다.
- 서버 프로젝트 [여기](https://bitbucket.org/42meetup/meetup_back/src/main)에서 확인하실 수 있습니다.


## 프로젝트 구조

```
src
 ├── api
 ├── assets
 ├── components
 ├── constants
 ├── contexts
 ├── hooks
 ├── pages
 ├── types
 └── utils
 ```

- api: 서버와의 통신을 위한 API
- assets: 이미지, 아이콘 등 정적파일
- components: 컴포넌트
- constants: 자주 사용하는 상수
- contexts: 전역적으로 사용하는 상태값을 관리하는 Context API
- hooks: 커스텀 훅
- pages: 라우트 경로별로 렌더링되는 페이지
- types: 커스텀 타입
- utils: 유틸리티 함수


## 실행 및 설치

1. 해당 저장소를 클론해주세요.

```
git clone https://github.com/42Sunny/meetup_front.git
```

2. 의존성 패키지들을 설치합니다.

```
yarn
```

3. [백엔드 서버 실행 가이드](https://bitbucket.org/42meetup/meetup_back/src/main/README.md)를 참고하여 로컬환경에 서버를 실행합니다.

4. `.env`파일을 작성합니다.

```
REACT_APP_API_URL=server url (ex. https://localhost:3000)
```

5. 코드를 실행합니다.

```
yarn start
```

## 사용 스택

- [React v17.0.2](https://reactjs.org)
- [React-Router-Dom v6.0.2](https://reactrouter.com/)
- [Typescript v4.5.2](https://www.typescriptlang.org/)

