import styled from '@emotion/styled';
import Header from './Header';
import PostList from './PostList';

const MainPage = () => {
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
