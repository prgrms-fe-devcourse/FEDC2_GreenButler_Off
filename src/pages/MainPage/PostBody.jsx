import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { setLike, setDisLike } from 'utils/apis/postApi';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWUyOWJkNmQxOGI0MWM1YjIzOGJhMiIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNjU0NjcxNjI5fQ.etL5BJpmU-w7nUg1JDa_1oEHqBKkTgTxPQ0tfOfj-As';

const currentUserId = '629e29bd6d18b41c5b238ba2';

const PostBody = ({ post, isDetailPage = false }) => {
  const { _id, image, likes, comments, updatedAt } = post || {};
  const { content, contents, tags } = JSON.parse(post?.title);
  const [onHeart, setOnHeart] = useState(false);
  const [heartCount, setHeartCount] = useState(likes.length);

  const navigate = useNavigate();

  const handleTodetailpage = useCallback(() => {
    if (isDetailPage) {
      return;
    }
    navigate(`/post/detail/?id=${_id}`, {
      state: {
        post,
      },
    });
  }, [_id, post, isDetailPage, navigate]);

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

  const handleHeartClick = useCallback(() => {
    setOnHeart(!onHeart);
    if (!onHeart) {
      setHeartCount(heartCount + 1);
      // setLike(token, _id);
    } else {
      setHeartCount(heartCount - 1);
      // setDisLike(token, _id);
    }
  }, [_id, onHeart, heartCount]);

  useEffect(() => {
    if (likes && likes.some(({ user }) => user === currentUserId)) {
      setOnHeart(true);
    }
  }, []);

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
        <Paragraph>{content ? content : contents}</Paragraph>
        <Tags>
          {tags.map((tag, i) => (
            <Tag key={i} onClick={() => handleTagClick(tag)}>
              {tag[0] === '#' ? tag : `#${tag}`}
            </Tag>
          ))}
        </Tags>
        <DateText>{updatedAt.substr(0, 10)}</DateText>
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

const Paragraph = styled.p`
  width: 280px;
  max-height: 56px;
  line-height: 26px;
  font-size: 20px;
  margin: 18px 0;

  display: -webkit-box;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

// const Paragraph = ({ children, ...props }) => {
//   const style = {
//     fontSize: 20,
//     lineHeight: '28px',
//     padding: '17px 0',
//   };

//   return (
//     <Text paragraph style={style} {...props}>
//       {children}
//     </Text>
//   );
// };

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
