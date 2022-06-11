import { ThemeProvider } from '@emotion/react';
import theme from 'styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  );
};

export default App;
