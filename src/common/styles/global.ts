import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0px;
    margin:0px;
    box-sizing:border-box;
    color:#fff;
    font-family:"arial";
    font-weight:400;
    border-collapse: collapse;
    line-height: 1;
  }

  html{

  }

  body{
    width: 100vw;
    padding:40px 50px;

    @media screen and (max-width: 1660px) {
      padding:40px 20px;
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
