/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { setLike, setDisLike } from 'utils/apis/postApi';
import { setNotification } from 'utils/apis/userApi';
import { useUserContext } from 'contexts/UserContext';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWUyOWJkNmQxOGI0MWM1YjIzOGJhMiIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNjU0NjcxNjI5fQ.etL5BJpmU-w7nUg1JDa_1oEHqBKkTgTxPQ0tfOfj-As';

const currentUserId = '629e29bd6d18b41c5b238ba2';

const PostBody = ({ post, isDetailPage = false }) => {
  const { _id: postId, image, likes, comments, updatedAt, author } = post || {};
  const { content, contents, tags } = JSON.parse(post?.title);
  const [onHeart, setOnHeart] = useState(false);
  const [heartCount, setHeartCount] = useState(likes.length);
  const [likeId, setLikeId] = useState('');
  const { onLike, onDisLike } = useUserContext();
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

  const handleTodetailpage = useCallback(() => {
    if (isDetailPage) {
      return;
    }
    navigate(`/post/detail/?id=${postId}`, {
      state: {
        post,
      },
    });
  }, [postId, post, isDetailPage, navigate]);

  const handleTagClick = useCallback(
    (tag) => {
      navigate(`/search/tag/${tag}`, {
        state: {
          tag,
        },
      });
    },
    [navigate],
  );

  const handleHeartClick = useCallback(async () => {
    setOnHeart(!onHeart);
    if (!onHeart) {
      setHeartCount(heartCount + 1);
      if (postId) {
        const like = await setLike(token, postId).then((res) => res.data);
        onLike(like);
        setLikeId(like._id);
        // await setNotification(token, 'LIKE', like._id, author._id, postId);
      }
    } else {
      setHeartCount(heartCount - 1);
      if (likeId) {
        const like = await setDisLike(token, likeId).then((res) => res.data);
        onDisLike(like);
        setLikeId('');
      }
    }
  }, [onHeart, heartCount, postId, likeId, onLike, onDisLike]);

  useEffect(() => {
    const array = likes?.map(({ user, _id }) => {
      if (user === currentUserId) {
        return _id;
      }
    });
    if (array.length) {
      setOnHeart(true);
      setLikeId(array[0]);
    }
  }, []);

  const handleMoreClick = () => {
    setIsShown(true);
  };

  return (
    <Container>
      <ImageWrapper onClick={handleTodetailpage}>
        <Image
          src={image ? image : 'https://picsum.photos/300/300/?image=71'}
          width="100%"
          height="100%"
        />
      </ImageWrapper>
      <Contents>
        <IconButtons>
          <IconButton
            className="heart-button"
            name={onHeart ? 'HEART_RED' : 'HEART'}
            onClick={handleHeartClick}
          >
            <IconButtonText>{heartCount}</IconButtonText>
          </IconButton>
          <IconButton className="comment-button" name="COMMENT" onClick={handleTodetailpage}>
            <IconButtonText>{comments.length}</IconButtonText>
          </IconButton>
        </IconButtons>
        <TextContainer>
          <Paragraph isDetailPage={isDetailPage} isShown={isShown}>
            {content ? content : contents}
          </Paragraph>
          {!isDetailPage && content?.length > 50 && !isShown && (
            <MoreText onClick={handleMoreClick}>더보기</MoreText>
          )}
        </TextContainer>
        <Tags>
          {tags.map((tag, i) => (
            <Tag key={i} onClick={() => handleTagClick(tag)}>
              {tag[0] === '#' ? tag : `#${tag}`}
            </Tag>
          ))}
        </Tags>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  color: ${theme.color.fontBlack};
`;

const ImageWrapper = styled.div`
  width: 500px;
  height: 500px;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
  }
`;

const Contents = styled.div`
  padding: 20px 0;
`;

const IconButtons = styled.div`
  display: flex;
`;

const IconButton = ({ name, className, children, onClick }) => {
  const style = {
    padding: 0,
    borderRadius: '0',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  };
  return (
    <button className={className} style={style} onClick={onClick}>
      <Icon name={name} size={22} />
      {children}
    </button>
  );
};

const IconButtonText = ({ children, ...props }) => {
  const style = {
    color: theme.color.fontBlack,
    marginLeft: '5px',
    PointerEvent: 'none',
  };
  return (
    <Text fontSize={16} style={style} {...props}>
      {children}
    </Text>
  );
};

const TextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 18px 0;
`;

const Paragraph = styled.span`
  display: inline-block;
  width: 84%;
  line-height: 26px;
  font-size: 20px;
  word-break: keep-all;

  ${({ isDetailPage, isShown }) =>
    !isDetailPage &&
    !isShown &&
    css`
      max-height: 56px;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    `}
`;

const MoreText = styled.button`
  font-size: 16px;
  padding: 0;
  margin-left: 2px;
  color: ${theme.color.fontNormal};
`;

const Tags = styled.div``;

const Tag = ({ children, ...props }) => {
  const style = {
    color: theme.color.mainGreen,
    fontSize: '16px',
    borderRadius: '15px',
    border: `1px solid ${theme.color.mainGreen}`,
    padding: '5px 13px',
    marginRight: '5px',
    marginBottom: '5px',
  };
  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
};

const DateText = ({ children, ...props }) => {
  const style = {
    display: 'block',
    color: theme.color.fontNormal,
    margin: '18px 0',
  };
  return (
    <Text fontSize={16} style={style} {...props}>
      {children}
    </Text>
  );
};

export default PostBody;

// const Paragraph = ({ children }) => {
//   const style = {
//     width: '280px',
//     maxHeight: '56px',
//     lineheight: '26px',
//     fontSize: '20px',
//     margin: '18px 0',
//   };

//   const lineClamp = css`
//     display: -webkit-box;
//     word-wrap: break-word;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;
//   `;

//   return (
//     <p style={style} css={lineClamp}>
//       {children}
//     </p>
//   );
// };
