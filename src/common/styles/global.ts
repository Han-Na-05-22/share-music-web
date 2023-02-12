import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0px;
    margin:0px;
    box-sizing:border-box;
color:#fff;
    font-family:"arial";
    font-weight:400;
    line-height: 1;
  }

  body{
    width: 100vw;
    height: 100vh;
    padding:40px;
  }

  #root,.App{
    width:100%;
    height: 100%;
  }


`;
