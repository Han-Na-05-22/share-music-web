import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0px;
    margin:0px;
    box-sizing:border-box;
    color:#fff;
    /* font-family:"arial"; */
    font-family: "Orbitron";
    font-weight:400;
    border-collapse: collapse;
    line-height: 1;
    letter-spacing:1px;
    list-style:none;
  }

  html{
    /* background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%); */

    background: #323232ff;
  }
  /* background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%); */
  /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
  body{
    width: 100vw;
    height: 100%;
    overflow-y: auto;
    /* height: 100vh; */
    /* padding:40px 0px; */

    @media screen and (max-width: 1660px) {
      /* padding:40px 20px; */
      font-size:12px;

  }
  }

  #root,.App{
    width:100%;
    height: 100%;
  }

  .no-data {
    color:#6C6A6A;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }

  .about-genre {        
    color:#6C6A6A;
    font-weight:bold;

    @media screen and (max-width: 1660px) {
      font-size: 13px;
    }
  }



  .no-clicked-svg{
    cursor: not-allowed !important;
  }


  img{
    object-fit:cover;
  }

  .music-img{
    width:125px;
    height: 125px;
    border-radius: 100%;
    
    @media screen and (max-width: 1660px) {
      width:100px;
      height: 100px;
    }
  }
  
  .tabel-container {
    position: relative;

      div {
      &:nth-child(2) {
        left: 50%;
        transform: translateX(-50%);
        bottom: 42.5px;
      }
    }

    @media screen and (max-width: 1660px) {
    div {
      &:nth-child(2) {
        bottom: 25px;
      }

    }
  }
  }

  

`;
