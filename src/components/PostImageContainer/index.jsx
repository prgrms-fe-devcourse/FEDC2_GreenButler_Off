import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import { IMAGE_URLS } from 'utils/constants/images';

const PostImageContainer = React.memo(function ImageContainer({ posts }) {
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
          <Image
            src={post.image ? post.image : IMAGE_URLS.POST_DEFAULT_GRID_IMG}
            height="100%"
            width="100%"
            mode="cover"
            lazy={true}
            threshold={0.2}
            style={{ position: 'absolute', left: 0, top: 0 }}
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
  padding: 0 8px;
`;

const ImageItem = styled.div`
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  padding-bottom: 100%;
  position: relative;
`;
