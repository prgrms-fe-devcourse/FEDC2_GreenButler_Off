/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Image, Text, Icon } from 'components';
import theme from 'styles/theme';
import { setLike, setDisLike } from 'utils/apis/postApi';
import { setNotification } from 'utils/apis/userApi';
import useLocalToken from 'hooks/useLocalToken';
import { useUserContext } from 'contexts/UserContext';
import { IMAGE_URLS } from 'utils/constants/images';
import displayedAt from 'utils/functions/displayedAt';

const PostBody = ({ post, isDetailPage = false }) => {
  const { _id: postId, image, likes, comments, createdAt, author } = post || {};
  const { content, contents, tags } = JSON.parse(post?.title);
  const [onHeart, setOnHeart] = useState(false);
  const [heartCount, setHeartCount] = useState(likes.length);
  const [likeId, setLikeId] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [localToken] = useLocalToken();
  const { currentUser } = useUserContext();

  const navigate = useNavigate();

  const handleTodetailpage = useCallback(() => {
    if (isDetailPage) {
      return;
    }
    navigate(`/post/detail/${postId}`, {
      state: {
        post,
      },
    });
  }, [postId, post, isDetailPage, navigate]);

  const handleTagClick = useCallback(
    (tag) => {
      navigate(`/tag/${tag.slice(1)}`, {
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
      if (localToken && postId) {
        const like = await setLike(localToken, postId).then((res) => res.data);
        setLikeId(like._id);
        if (currentUser.id !== author._id) {
          await setNotification(localToken, 'LIKE', like._id, author._id, postId);
        }
      }
    } else {
      setHeartCount(heartCount - 1);
      if (localToken && likeId) {
        await setDisLike(localToken, likeId).then((res) => res.data);
        setLikeId('');
      }
    }
  }, [onHeart, heartCount, postId, likeId, author._id, currentUser, localToken]);

  useEffect(() => {
    let likeId;
    const isMyLikePost =
      likes.filter(({ user, _id }) => {
        if (user === currentUser.id) {
          likeId = _id;
          return true;
        }
      }).length > 0;
    if (isMyLikePost) {
      setOnHeart(true);
      setLikeId(likeId);
    }
  }, [currentUser, likes]);

  const handleMoreClick = () => {
    setIsShown(true);
  };

  return (
    <Container>
      <ImageWrapper onClick={handleTodetailpage} isDetailPage={isDetailPage}>
        <Image src={image ? image : IMAGE_URLS.POST_DEFAULT_IMG} width="100%" height="100%" />
      </ImageWrapper>
      <Contents>
        <IconButtons>
          <IconButton
            className="heart-button"
            name={onHeart ? 'HEART_RED' : 'HEART'} // Todo: 상수화
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
        <DateText>{displayedAt(createdAt)}</DateText>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  color: ${theme.color.fontBlack};
`;

const ImageWrapper = styled.div`
  width: 500px;
  height: 500px;
  margin-left: -20px;
  margin-right: -20px;
  cursor: ${({ isDetailPage }) => (isDetailPage ? undefined : 'pointer')};

  @media screen and (max-width: 500px) {
    width: 100vw;
    height: 100vw;
  }
`;

const Contents = styled.div`
  padding: 18px 0;
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
    color: theme.color.fontBlack,
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
    marginLeft: '8px',
    PointerEvent: 'none',
    lineHeight: '19px',
    transform: 'translateY(-1px)',
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
  margin-top: 15px;
  margin-bottom: 18px;
`;

const Paragraph = styled.span`
  display: inline-block;
  width: 84%;
  line-height: 26px;
  font-size: 20px;
  word-break: keep-all;
  word-wrap: break-word;
  flex: 1;

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
    `};
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
    height: '29px',
    color: theme.color.mainGreen,
    fontSize: '16px',
    borderRadius: '15px',
    border: `1px solid ${theme.color.mainGreen}`,
    padding: '0px 13px',
    marginRight: '4px',
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
    marginTop: '13px',
    marginBottom: '18px',
  };
  return (
    <Text fontSize={16} color={theme.color.fontNormal} style={style} {...props}>
      {children}
    </Text>
  );
};

export default PostBody;
