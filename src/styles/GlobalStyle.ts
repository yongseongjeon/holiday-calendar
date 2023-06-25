import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    overflow: hidden;
    font-family: 'Noto Sans KR', sans-serif;
  }

  button {
    margin: 0;
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: black;
  }

  /* 캘린더의 Y축 요일 부분 */
  .App div svg > g:nth-child(2) {
    font-size: 16px;
    font-weight: bold;
  }
`;
