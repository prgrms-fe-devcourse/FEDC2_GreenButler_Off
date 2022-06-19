import PostImageList from 'components/PostImageList';
import { Link } from 'react-router-dom';
import Image from 'components/basic/Image';
import PropTypes from 'prop-types';
import NoResultMessage from 'components/Message/NoResultMessage';

const TagSearchResult = ({ posts }) => {
  console.log(posts, 'posts');
  return (
    <>
      {posts?.length > 0 ? (
        <PostImageList>
          {posts?.map((post) => (
            <Link to={`/post/detail/${post._id}`} key={post._id}>
              <Image lazy width="100%" block threshold={0.5} src={post.image} />
            </Link>
          ))}
        </PostImageList>
      ) : (
        <NoResultMessage />
      )}
    </>
  );
};

TagSearchResult.propTypes = {
  posts: PropTypes.array,
};

export default TagSearchResult;
