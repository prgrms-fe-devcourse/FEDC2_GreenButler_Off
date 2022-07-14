import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Image } from 'components';
import { IMAGE_URLS } from 'utils/constants/images';

const PostImageContainer = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <PostImageList>
      {posts.map((post) => {
        const data =
          Object.hasOwnProperty.call(post, 'status') && post.status === 'fulfilled'
            ? post.value
            : post;
        return (
          <ImageItem
            key={data._id}
            onClick={() => {
              navigate(`/post/detail/${data._id}`);
            }}
          >
            <Image
              src={data.image ? data.image : IMAGE_URLS.POST_DEFAULT_IMG}
              height="100%"
              width="100%"
              mode="cover"
              lazy={true}
              threshold={0.4}
              placeholder={IMAGE_URLS.POST_DEFAULT_IMG}
              style={{ position: 'absolute', left: 0, top: 0 }}
              defaultImageUrl={IMAGE_URLS.POST_DEFAULT_GRID_IMG}
            />
          </ImageItem>
        );
      })}
    </PostImageList>
  );
};

export default React.memo(PostImageContainer);

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
