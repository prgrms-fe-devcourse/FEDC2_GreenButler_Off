import styled from '@emotion/styled';
import Header from './Header';
import PostList from './PostList';
import { useUserContext } from 'contexts/UserContext';
const MainPage = () => {
  const { currentUser } = useUserContext();
  console.log(currentUser);
  return (
    <Container>
      <Header />
      <PostList />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

export default MainPage;
