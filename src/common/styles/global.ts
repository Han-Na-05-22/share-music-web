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


`;
