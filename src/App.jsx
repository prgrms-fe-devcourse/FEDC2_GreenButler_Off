import { ThemeProvider } from '@emotion/react';
import theme from 'styles/theme';
import DefaultTemplate from 'template/DefaultTemplate';
import Router from 'routes/Router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DefaultTemplate>
        <Router />
      </DefaultTemplate>
    </ThemeProvider>
  );
}

export default App;
