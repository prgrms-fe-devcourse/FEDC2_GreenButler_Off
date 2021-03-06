import PropTypes from 'prop-types';
import { PostImageContainer, NoResultMessage } from 'components';

const TagSearchResult = ({ posts, isSearch }) => {
  return (
    <>
      {posts?.length > 0 ? <PostImageContainer posts={posts} /> : isSearch && <NoResultMessage />}
    </>
  );
};

TagSearchResult.propTypes = {
  posts: PropTypes.array,
};

export default TagSearchResult;
