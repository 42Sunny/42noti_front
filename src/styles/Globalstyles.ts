import { createGlobalStyle, css } from 'styled-components';

const resetCSS = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  main,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
`;

const appCSS = css`
  html {
    height: -webkit-fill-available;
  }
  body {
    height: -webkit-fill-available;
  }
  body,
  input,
  button {
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Apple SD Gothic Neo',
      'Noto Sans CJK KR', 'Malgun Gothic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
  }
  a {
    text-decoration: none;
    outline: none;
    color: ${({ theme }) => theme.colors.black};
  }
  #root {
    height: 100%;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.snow};
    box-sizing: border-box;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: -webkit-fill-available;
  }
  button {
    cursor: pointer;
  }
  button:disabled {
    cursor: not-allowed;
  }
`;
const GlobalStyles = createGlobalStyle`
${resetCSS}
${appCSS}
`;

export default GlobalStyles;
