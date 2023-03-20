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
    height: 100vh;
    padding:40px 50px;

    @media screen and (max-width: 1660px) {
      padding:40px 20px;
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
  }



  .no-clicked-svg{
    cursor: not-allowed !important;
  }

`;
