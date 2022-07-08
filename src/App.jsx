import ContextProviders from 'contexts';
import DefaultTemplate from 'template/DefaultTemplate';
import Router from 'routes/Router';

const App = () => {
  return (
    <ContextProviders>
      <DefaultTemplate>
        <Router />
      </DefaultTemplate>
    </ContextProviders>
  );
};

export default App;
