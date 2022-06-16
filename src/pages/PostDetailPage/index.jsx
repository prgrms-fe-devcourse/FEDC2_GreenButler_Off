import styled from '@emotion/styled';
import PostDetail from './PostDetail';
import { useLocation } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';

const PostDetailPage = () => {
  const location = useLocation({});
  return (
    <PageWrapper header nav>
      <PostDetail initialPost={location.state.post} />
    </PageWrapper>
  );
};

export default PostDetailPage;
