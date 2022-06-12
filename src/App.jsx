import { ThemeProvider } from '@emotion/react';
import ContextProviders from 'contexts';
import theme from 'styles/theme';
import DefaultTemplate from 'template/DefaultTemplate';
import Router from 'routes/Router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ContextProviders>
        <DefaultTemplate>
          <Router />
        </DefaultTemplate>
      </ContextProviders>
    </ThemeProvider>
  );
};

export default App;
