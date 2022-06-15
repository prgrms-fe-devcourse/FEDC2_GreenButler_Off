import PostImageList from 'components/PostImageList';
import { Link } from 'react-router-dom';
import Image from 'components/basic/Image';
import PropTypes from 'prop-types';

const TagSearchResult = ({ posts }) => {
  return (
    <PostImageList>
      {posts &&
        posts.map((post) => (
          <Link to={`/post/detail/${post._id}`} key={post._id}>
            <Image lazy width="100%" block threshold={0.5} src={post.image} />
          </Link>
        ))}
    </PostImageList>
  );
};

TagSearchResult.propTypes = {
  posts: PropTypes.array,
};

export default TagSearchResult;
