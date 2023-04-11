# 🎶 Share_Music_Web

### \* 내 음악을 다른 사람들과 공유할 수 있는 음악 공유 사이트입니다.

#### (음원등록 할 때 필요한 mp3 파일은 share-music-web/public/image/Soulicious - Dyalla.mp3 에 넣어두었습니다.)

### 2023.02 ~ 2023.04

<table>
  <tr>
    <td>기획</td>
    <td>이한나</td>
    <td>3일</td>
  </tr>
    <tr>
    <td>디자인</td>
    <td>이한나</td>
    <td>7일</td>
  </tr>
    <tr>
    <td>개발</td>
    <td>이한나</td>
    <td>한달</td>
  </tr>
</table>

<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white">
</div>

## 📑 Pages

### 🎧 Home

<br />

< 로그인 전 화면 >

<img src="https://user-images.githubusercontent.com/97869178/230828514-17822c90-99b3-40c0-b535-77965e4657ba.gif" width="1000">

#### • 랜덤 추천 음악, 최근 등록된 음악 10개, 인기 Top10 음악(좋아요 순), 아티스트별 좋아요 및 다운로드 순위를 확인 할 수 있으며 Home 페이지에서 회원가입 및 로그인이 가능하며 로그인을 하지 않았을 시에는 조회만 가능합니다.

<br />

- 구성

  | <div align="center">구분</div> | <div align="center">파일</div>                   | <div align="center">비고</div>                                   |
  | ------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------- |
  | 전체 음악리스트                | getMusicAllDataList(musicList에 담아 관리)       | api 위치 : src - common - api - music                            |
  | 전체 유저정보                  | getUserAllDataList(userAll에 담아 관리)          | api 위치 : src - common - api - music                            |
  | 추천 음악리스트                | recommendMusicList                               | 랜덤으로 10개의 음원을 추천                                      |
  | 최신 음악리스트                | musicNewDataList                                 | 가장 최근에 등록한 음악리스트 10개를 보여줌                      |
  | 인기 음악리스트                | musicLikeCountTopten                             | 좋아요를 가장 많이 받은리스트 순서대로 10개 보여줌               |
  | TOP7 아티스트리스트            | artistLikeCountTopten, artistDownloadCountTopten | 좋아요 많이 받은 아티스트, 다운로드 수가 많은 아티스트 TOP7      |
  | 공통 컴포넌트                  | Loading                                          | 로딩 시 출력                                                     |
  | 공통 컴포넌트                  | Container                                        | 페이지 전체를 감싸는 컨테이너                                    |
  | 공통 컴포넌트                  | Header                                           | 공통 사용 Header                                                 |
  | 공통 컴포넌트                  | Table                                            | 아티스트 top7, download, like count                              |
  | 공통 컴포넌트                  | Button                                           | 로그인, 회원가입, 검색 등 버튼                                   |
  | 공통 컴포넌트                  | TextInput                                        | 검색한 음원 제목, 회원가입 및 로그인 input 사용                  |
  | 공통 컴포넌트                  | BasicSelect                                      | 장르별 음원 필터 기능에 사용                                     |
  | 공통 컴포넌트                  | Nav                                              | 인기순, 최신순, 내가 등록한 음악, 마이플레이리스트 음악 상세보기 |
  | 로그인                         | Login                                            | 로그인 팝업                                                      |
  | 회원가입                       | Join                                             | 회원가입 팝업                                                    |

---

<br />
<br />
<br />

[ 회원 가입 및 로그인 ]

<br />

| <div align="center">회원가입</div>                                                                                            | <div align="center">로그인</div>                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/97869178/230832913-b5c5137b-034a-4856-bd5a-e1d7e31bf18c.gif" width="500"> | <img src="https://user-images.githubusercontent.com/97869178/230832923-65a0b786-1a2a-4831-b058-29e1c6f3dddf.gif" width="500"> |

#### • 회원가입은 프로필 이미지 제외하고 모두 필수로 입력해야 하며, 다른 유저들에게는 id와 닉네임이 노출됩니다.

<br />
<br />
<br />
<br />

< 로그인 후 화면 >

<img src="https://user-images.githubusercontent.com/97869178/230846235-d3e01c3a-3d48-4055-9a42-db86db159eed.gif" width="1000">

#### • 다른 유저들이 등록한 음악들을 모두 들을 수 있고 내 개인 취저 음악을 플레이리스트에 담고 좋아요도 누를 수 있습니다.

<br />

- 구성

  | <div align="center">구분</div> | <div align="center">파일</div>                               | <div align="center">비고</div>                                   |
  | ------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------- |
  | 전체 음악리스트                | getMusicAllDataList(musicList에 담아 관리)                   | api 위치 : src - common - api - music                            |
  | 전체 유저정보                  | getUserAllDataList(userAll에 담아 관리)                      | api 위치 : src - common - api - user                             |
  | 음원 좋아요 및 다운로드        | updateMusicCountData                                         | api 위치 : src - common - api - music                            |
  | 추천 음악리스트                | recommendMusicList                                           | 랜덤으로 10개의 음원을 추천                                      |
  | 최신 음악리스트                | musicNewDataList                                             | 가장 최근에 등록한 음악리스트 10개를 보여줌                      |
  | 인기 음악리스트                | musicLikeCountTopten                                         | 좋아요를 가장 많이 받은리스트 순서대로 10개 보여줌               |
  | TOP7 아티스트리스트            | artistLikeCountTopten, artistDownloadCountTopten             | 좋아요 많이 받은 아티스트, 다운로드 수가 많은 아티스트 TOP7      |
  | 등록할 음원 저장               | sendMusicData(storage), addStorageMusicData(cloud firestore) | api 위치 : src - common - api - music                            |
  | 내 정보 불러오기               | getUser Query(user에 담아 관리)                              | 위치 : App.js / (sessionStorage.getItem("user")                  |
  | Header 하위 컴포넌트           | SimpleProfileContainer                                       | 현재 로그인한 유저 정보(마이 페이지 및 로그아웃)                 |
  | 공통 컴포넌트                  | Loading                                                      | 로딩 시 출력                                                     |
  | 공통 컴포넌트                  | Container                                                    | 페이지 전체를 감싸는 컨테이너                                    |
  | 공통 컴포넌트                  | Header                                                       | 공통 사용 Header                                                 |
  | 공통 컴포넌트                  | PlayList                                                     | 내 플레이리스트(하단에 고정)                                     |
  | 공통 컴포넌트                  | Table                                                        | 아티스트 top7, download, like count                              |
  | 공통 컴포넌트                  | AddMusic                                                     | 음원 등록 팝업                                                   |
  | 공통 컴포넌트                  | MusicDetail                                                  | 개별 레코드 컨테이너 박스                                        |
  | 공통 컴포넌트                  | Record                                                       | 내가 클릭한 음원 정보 및 듣기                                    |
  | 공통 컴포넌트                  | Button                                                       | 음원등록, 검색 등 버튼                                           |
  | 공통 컴포넌트                  | TextInput                                                    | 검색한 음원 제목, 회원가입 및 로그인 input 사용                  |
  | 공통 컴포넌트                  | BasicSelect                                                  | 장르별 음원 필터 기능에 사용                                     |
  | 공통 컴포넌트                  | Nav                                                          | 인기순, 최신순, 내가 등록한 음악, 마이플레이리스트 음악 상세보기 |

---

<br />
<br />
<br />

[ 음원 등록 및 수정 ]

<br />

| <div align="center">음원등록</div>                                                                                                         | <div align="center">음원수정</div>                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://user-images.githubusercontent.com/97869178/230846232-bee5c65a-34a0-4021-9e79-a928b868a9dd.gif" width="500" height="400"> | <img src="https://user-images.githubusercontent.com/97869178/230846250-05633a46-8d92-42cc-b1df-92fe048b235a.gif" width="500" height="400"> |

<br />
<br />
<br />
<br />

### 🎧 Mypage

<br />

< 마이페이지 >

<img src="https://user-images.githubusercontent.com/97869178/230846241-e53e5488-fc6e-4a99-ab41-b17b516ed480.gif" width="1000">

#### • 마이페이지에서는 내 정보 수정 및 내가 등록한 음악 수정 및 삭제가 가능합니다.

<br />

- 구성

  | <div align="center">구분</div> | <div align="center">파일</div>                               | <div align="center">비고</div>                                   |
  | ------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------- |
  | 등록할 음원 저장               | sendMusicData(storage), addStorageMusicData(cloud firestore) | api 위치 : src - common - api - music                            |
  | 등록한 음원 수정               | updateMusicDataList                                          | api 위치 : src - common - api - music                            |
  | 내 정보 수정                   | editUserData                                                 | api 위치 : src - common - api - user                             |
  | 하위 컴포넌트                  | UserInfo                                                     | 내 정보 불러오기 및 수정                                         |
  | 공통 컴포넌트                  | Loading                                                      | 로딩 시 출력                                                     |
  | 공통 컴포넌트                  | Container                                                    | 페이지 전체를 감싸는 컨테이너                                    |
  | 공통 컴포넌트                  | Header                                                       | 공통 사용 Header                                                 |
  | 공통 컴포넌트                  | PlayList                                                     | 내 플레이리스트(하단에 고정)                                     |
  | 공통 컴포넌트                  | Table                                                        | 내가 등록한 음원리스트(11개 이상 시 다음 페이지에서 확인)        |
  | 공통 컴포넌트                  | AddMusic                                                     | 음원 등록                                                        |
  | 공통 컴포넌트                  | MusicDetail                                                  | 개별 레코드 컨테이너 박스                                        |
  | 공통 컴포넌트                  | Record                                                       | 내가 클릭한 음원 정보 및 듣기                                    |
  | 공통 컴포넌트                  | Button                                                       | 내정보 수정 및 음원 수정 등 버튼                                 |
  | 공통 컴포넌트                  | TextInput                                                    | 검색한 음원 제목, 회원가입 및 로그인 input 사용                  |
  | 공통 컴포넌트                  | BasicSelect                                                  | 장르별 음원 필터 기능에 사용                                     |
  | 공통 컴포넌트                  | Nav                                                          | 인기순, 최신순, 내가 등록한 음악, 마이플레이리스트 음악 상세보기 |
  | 공통 컴포넌트                  | Pagination                                                   | 페이지 이동 페이지네이션                                         |

---

<br />
<br />
<br />
<br />

### 🎧 MusicTable

<br />

[ 테이블별 필터 및 플레이리스트 추가 ]

<br />

| <div align="center">테이블 필터</div>                                                                                         | <div align="center">플레이리스트 추가</div>                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/97869178/230865563-03611596-58ae-4442-953e-90516e766a6c.gif" width="500"> | <img src="https://user-images.githubusercontent.com/97869178/230865580-743b3695-7497-484e-b100-037d66cde8d6.gif" width="500"> |

#### • 내가 찾고 싶은 음악 제목별, 장르별, 그리고 인기순, 최신순, 내가 등록한 음악, 내 플레이리스트에 담긴 음악들을 확인 가능하며, 내 플레이리스트에 음악들을 담을 수 있습니다.

<br />

- 구성

  | <div align="center">구분</div>    | <div align="center">파일</div>                               | <div align="center">비고</div>                                                |
  | --------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | 내 플레이리스트에 음원 담기(다운) | updateMusicCountData(myMusicPlayList에 담아 관리)            | api 위치 : src - common - api - music                                         |
  | 등록할 음원 저장                  | sendMusicData(storage), addStorageMusicData(cloud firestore) | api 위치 : src - common - api - music                                         |
  | 필터링 음원리스트                 | filterMusicList                                              | 인기순, 최신순, 내가 등록한 음원리스트 등 조건에 따른 음원리스트              |
  | 음원 좋아요 및 다운로드           | updateMusicCountData                                         | api 위치 : src - common - api - music                                         |
  | Header 하위 컴포넌트              | SimpleProfileContainer                                       | 현재 로그인한 유저 정보(마이 페이지 및 로그아웃)                              |
  | 공통 컴포넌트                     | Loading                                                      | 로딩 시 출력                                                                  |
  | 공통 컴포넌트                     | Container                                                    | 페이지 전체를 감싸는 컨테이너                                                 |
  | 공통 컴포넌트                     | Header                                                       | 공통 사용 Header                                                              |
  | 공통 컴포넌트                     | PlayList                                                     | 내 플레이리스트(하단에 고정)                                                  |
  | 공통 컴포넌트                     | Table                                                        | 내가 등록한 음원리스트(11개 이상 시 다음 페이지에서 확인)                     |
  | 공통 컴포넌트                     | AddMusic                                                     | 음원 등록                                                                     |
  | 공통 컴포넌트                     | MusicDetail                                                  | 개별 레코드 컨테이너 박스                                                     |
  | 공통 컴포넌트                     | Record                                                       | 내가 클릭한 음원 정보 및 듣기                                                 |
  | 공통 컴포넌트                     | Button                                                       | 검색 및 내 플레이리스트에 음원 추가 기능 등                                   |
  | 공통 컴포넌트                     | TextInput                                                    | 검색한 음원 제목, 회원가입 및 로그인 input 사용                               |
  | 공통 컴포넌트                     | BasicSelect                                                  | 장르별 음원 필터 기능에 사용                                                  |
  | 공통 컴포넌트                     | Nav                                                          | 홈 돌아가기, 인기순, 최신순, 내가 등록한 음악, 마이플레이리스트 음악 상세보기 |
  | 공통 컴포넌트                     | CheckBox                                                     | 내 플레이리스트에 추가할 음원 체크                                            |
  | 공통 컴포넌트                     | Pagination                                                   | 페이지 이동 페이지네이션                                                      |

---

<br />
<br />
<br />

## 📁 폴더구조

```swift
📦src
 ┣ 📂common
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂music
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂Container
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Nav
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜global.ts
 ┃ ┃ ┗ 📜theme.ts
 ┣ 📂components
 ┃ ┣ 📂AddMusic
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂BasicSelect
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Button
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂CheckBox
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Join
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Loading
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂MusicDetail
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Overlay
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Pagination
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂PlayList
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂ProfileImg
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Record
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂SquareButton
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Table
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂TextInput
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂Textarea
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂UserInfo
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜interface.ts
 ┃ ┃ ┗ 📜style.ts
 ┣ 📂hooks
 ┃ ┣ 📜useInputs.ts
 ┃ ┗ 📜useSearch.ts
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜state.ts
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂MusicTable
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂MyPage
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜state.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂NotFound
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂service
 ┃ ┗ 📜firebase.ts
 ┣ 📂utility
 ┃ ┣ 📜data.tsx
 ┃ ┗ 📜toastMsg.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```
