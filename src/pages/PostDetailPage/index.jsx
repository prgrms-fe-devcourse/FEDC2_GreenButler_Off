import styled from '@emotion/styled';
import Header from './Header';
import PostDetail from './PostDetail';
import { useLocation } from 'react-router-dom';

const PostDetailPage = () => {
  const location = useLocation({});
  return (
    <Container>
      <Header />
      <PostDetail initialPost={location.state.post} />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

export default PostDetailPage;
