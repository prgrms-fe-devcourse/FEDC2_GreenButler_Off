import styled from '@emotion/styled';
import Header from './Header';
import PostDetail from './PostDetail';

const PostDetailPage = () => {
  return (
    <Container>
      <Header />
      <PostDetail />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

export default PostDetailPage;
