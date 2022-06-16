import PostHeader from './PostHeader';
import PostBody from './PostBody';
import styled from '@emotion/styled';
import theme from 'styles/theme';

const PostItem = ({ post, isDetailPage }) => {
  return (
    <Article>
      <PostHeader author={post.author} isDetailPage={isDetailPage} />
      <PostBody post={post} isDetailPage={isDetailPage} />
    </Article>
  );
};

const Article = styled.article`
  border-bottom: 1px solid ${theme.color.borderLight};
`;

export default PostItem;
