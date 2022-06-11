import { ThemeProvider } from '@emotion/react';
import theme from 'styles/theme';
import DefaultTemplate from 'template/DefaultTemplate';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DefaultTemplate></DefaultTemplate>
    </ThemeProvider>
  );
};
export default App;
