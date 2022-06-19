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
  &::before {
    content: '';
    display: block;
    width: 100vw;
    border-top: 1px solid ${theme.color.borderLight};
    margin-left: -20px;
    margin-right: -20px;
    transform: translateY(-1px);
  }
`;

export default PostItem;
