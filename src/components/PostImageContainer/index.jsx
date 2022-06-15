import React from 'react';
import Image from 'components/basic/Image';
import { Link } from 'react-router-dom';
import PostImageList from 'components/PostImageList';

const PostImageContainer = React.memo(function ImageContainer({ posts }) {
  const dummyPlace = 'https://via.placeholder.com/200';
  //TODO: 추후 스켈레톤으로 교체 또는 default 이미지 사용, 아래 post.image도 없는 경우 default 이미지 링크로 교체. PostImageList사용시 이 컴포넌트 어떤식으로 분리할 지 감이 안잡혀서 일단 냅둠. 나중에 다른 방식으로 분리해 사용
  //FIX: 현재 Image의 height가 작동하지 않아.... 여기서 100%줘야 되는데 안됨...
  return (
    <PostImageList>
      {posts.map((post) => (
        <Link to={`/post/detail/${post._id}`} key={post._id}>
          <Image
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            width="100%"
            height="100%"
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

export default PostImageContainer;
