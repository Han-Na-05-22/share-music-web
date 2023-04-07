# 🎶 Share_Music_Web
<br />
### * 내 음악을 다른 사람들과 공유할 수 있는 음악 공유 사이트입니다. 
<br />

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
<br />
<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white">
</div>

<br /><br /><br />

## Pages

### 🎧 Home

< 로그인 전 화면 >

https://user-images.githubusercontent.com/97869178/230038804-a335bc8d-e577-4962-91f9-555295d12134.mov

#### • 랜덤 추천 음악, 최근 등록된 음악 10개, 인기 Top10 음악(좋아요 순), 아티스트별 좋아요 및 다운로드 순위를 확인 할 수 있으며 Home 페이지에서 회원가입 및 로그인이 가능하며 로그인을 하지 않았을 시에는 조회만 가능합니다. <br /><br />



| <div align="center">회원가입</div> | <div align="center">로그인</div> |
| --- | --- |
| <div></div> |  <div></div> |
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
 ┃ ┗ 📜firebase.tsx
 ┣ 📂utility
 ┃ ┗ 📜data.tsx
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```



   
