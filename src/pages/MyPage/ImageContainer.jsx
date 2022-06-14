import React from 'react';
import Image from 'components/basic/Image';
import { Link } from 'react-router-dom';
import PostImageList from 'components/PostImageList';

const ImageContainer = React.memo(function ImageContainer({ posts }) {
  const dummyPlace = 'https://via.placeholder.com/200'; //추후 스켈레톤으로 교체
  return (
    <PostImageList>
      {posts.map((post) => (
        <Link to={`/post/detail/${post._id}`} key={Math.random()}>
          <Image
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            width="100%"
            block={true}
            threshold={0.1}
            className="post-item"
            src={
              post.image ||
              `https://user-images.githubusercontent.com/79133602/173282447-b5cdf98e-4372-4284-9795-b824acf2283d.png`
            }
            alt={posts._id}
            placeholder={dummyPlace}
          />
        </Link>
      ))}
    </PostImageList>
  );
});

export default ImageContainer;
