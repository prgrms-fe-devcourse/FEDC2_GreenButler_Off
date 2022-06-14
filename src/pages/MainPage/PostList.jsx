import PostItem from './PostItem';

const PostList = () => {
  const style = {};

  return (
    <ul style={style}>
      <PostItem />
      <PostItem />
      <PostItem />
    </ul>
  );
};

export default PostList;
