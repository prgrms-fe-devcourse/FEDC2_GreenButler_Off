import UserProvider from './UserContext';

const ContextProviders = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default ContextProviders;
