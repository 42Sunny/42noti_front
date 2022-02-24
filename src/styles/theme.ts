//임의로 넣어놓은 theme 값 변경 해야할 필요 있음.
export type FontSize = 'xxs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl';
export type FontWeight = 'light' | 'normal' | 'bold';
export type FontLineHeight = 'base' | 'large';

export const margins = {
  sm: '0.5rem',
  base: '1rem',
  lg: '2rem',
  xl: '3rem',
};

export const paddings = {
  sm: '0.5rem',
  base: '1rem',
  lg: '2rem',
  xl: '3rem',
};

export const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
  },
  size: {
    xxs: '0.8rem',
    xs: '0.85rem',
    sm: '1rem',
    base: '1.05rem',
    lg: '1.2rem',
    xl: '1.8rem',
    xxl: '2.8rem',
  },
  weight: {
    light: 400,
    normal: 600,
    bold: 700,
  },
  lineHeight: {
    base: 1,
    large: 1.5,
  },
};

export const colors = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(46, 47, 51)',
  lightgreen: 'rgb(92, 235, 182)',
  green: 'rgb(74, 226, 170)',
  lightred: 'rgb(255, 145, 165)',
  red: 'rgb(255, 121, 145)',
  orange: 'rgb(255, 165, 92)',
  skyblue: ' rgb(88, 210, 231)',
  mint: 'rgb(66, 218, 209)',
  blue: 'rgb(63, 161, 253)',
  lightblue: 'rgb(90, 175, 265)',
  purple: ' rgb(117, 131, 253)',
  lightgray: 'rgb(187, 189, 202)',
  gray: 'rgb(124, 126, 139)',
  darkgray: 'rgb(95, 96, 109)',
  snow: 'rgb(244, 246, 248)',
  darksnow: 'rgb(232, 234, 238)',
};

export const size = {
  mobile: '280px',
  tablet: '768px',
  desktop: '1440px',
  icon: '25px',
  header: '56px',
};

const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

const defalutTheme = {
  margins,
  paddings,
  fonts,
  device,
  colors,
};

export type Theme = {
  colors: typeof colors;
  fonts: typeof fonts;
  margins: typeof margins;
  paddings: typeof paddings;
};

export const theme: Theme = {
  ...defalutTheme,
};

export default theme;
