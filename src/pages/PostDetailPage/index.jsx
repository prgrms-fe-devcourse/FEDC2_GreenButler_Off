import PostDetail from './PostDetail';
import { useLocation } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';

// ToDo: 서버에서 데이터를 가져오는 방식으로 바꿔야 한다. 
const PostDetailPage = () => {
  const location = useLocation({});
  return (
    <PageWrapper header nav>
      <PostDetail initialPost={location.state.post} />
    </PageWrapper>
  );
};

export default PostDetailPage;
