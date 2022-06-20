import PostImageContainer from 'components/PostImageContainer';
import PropTypes from 'prop-types';
import NoResultMessage from 'components/Message/NoResultMessage';

const TagSearchResult = ({ posts }) => {
  return <>{posts?.length > 0 ? <PostImageContainer posts={posts} /> : <NoResultMessage />}</>;
};

TagSearchResult.propTypes = {
  posts: PropTypes.array,
};

export default TagSearchResult;
