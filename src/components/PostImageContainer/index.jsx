import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const PostImageContainer = React.memo(function ImageContainer({ posts }) {
  const defaultPostImg =
    'https://user-images.githubusercontent.com/79133602/173282447-b5cdf98e-4372-4284-9795-b824acf2283d.png';
  const navigate = useNavigate();

  return (
    <PostImageList>
      {posts.map((post) => (
        <ImageItem
          key={post._id}
          onClick={() => {
            navigate(`/post/detail/${post._id}`);
          }}
        >
          <ImageInner
            style={{
              backgroundImage: `url(${post.image ? post.image : defaultPostImg}`,
            }}
          />
        </ImageItem>
      ))}
    </PostImageList>
  );
});

export default PostImageContainer;

PostImageContainer.prototype = {
  posts: PropTypes.array,
};

const PostImageList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const ImageItem = styled.div`
  width: 100%;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const ImageInner = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;
