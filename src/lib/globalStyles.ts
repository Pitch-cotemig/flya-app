import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /*
    http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    color: ${({ theme }) => theme.colors.gray[300]};
    font-family: ${({ theme }) => theme.fonts.main};
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }

  /* Responsividade: Prevenir overflow e melhorar a experiência mobile */
  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }

  /* Tornar imagens responsivas por padrão */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Melhorar legibilidade em dispositivos móveis */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Garantir que inputs e buttons sejam responsivos */
  input,
  button,
  textarea,
  select {
    font: inherit;
    max-width: 100%;
  }

  /* Remover tap highlight no mobile */
  * {
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyles;
