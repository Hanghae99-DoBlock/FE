import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { orange100 } from "./common";

const GlobalStyles = createGlobalStyle`

    ${reset}

  * {
    box-sizing: border-box;
    margin: 0;
    ::-webkit-scrollbar {
  display: none;
}
  }

  body, div, span, h1, h2, h3, h4, h5, h6,
  p, i, ol, ul, li, form, label, header, nav, 
  input, textarea, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: normal;
    font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif;

  }

  body {
    background-color: ${orange100}
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background-color: transparent;
  }

  ul, ol, li {
    list-style: none;
    padding-left: 0;
    margin-left: 0;
  }

  button:focus,
  button:active,
  textarea:focus,
  textarea:active,
  input:focus,
  input:active {
    box-shadow: none;
    outline: none;      
  }

  textarea {
  resize: none;
  }  
`;

export default GlobalStyles;
