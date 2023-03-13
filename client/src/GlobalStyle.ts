import { createGlobalStyle } from 'styled-components';

export const primaryColor = '#0071DC';
export const secondaryColor = '#004F9A';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Fira Sans', sans-serif;
  }

  body {
      width: 100%;
  }
`;
