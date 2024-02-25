const tintColorLight: string = '#2f95dc';
const tintColorDark: string = '#000';

export type ColorScheme = {
  text: string;
  primary: string;
  card: string;
  secundary: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  border: string;
  notification: string;
};

type ColorObject = {
  light: ColorScheme;
  dark: ColorScheme;
};

const Colors: ColorObject = {
  light: {
    text: '#fff',
    primary: '#fffff',
    card: '#0000',
    secundary: '#0f711f',
    background: '#d7f5d7',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    border: '#0000',
    notification: '#0000',
  },
  dark: {
    text: '#000',
    primary: '#ffff',
    card: '#0000',
    secundary: '#d7f5d7',
    background: '#0f711f',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    border: '#0000',
    notification: '#0000',
  },
};

export default Colors;
