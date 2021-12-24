import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    componentColor: string;
    textColor: string;
    accentColor: string;
  }
}
