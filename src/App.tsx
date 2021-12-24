import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { darkTheme, lightTheme } from './theme';
import Router from './Router';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
${reset}
body {
  font-family:'Raleway', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}

a {
  color: inherit;
  text-decoration:none;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
