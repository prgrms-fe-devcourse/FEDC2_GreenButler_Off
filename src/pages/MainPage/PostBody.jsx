import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';

// const currentUserId = '62a75e5cb1b90b0c812c9b70';

const PostBody = ({ post, isDetailPage = false }) => {
  const { image, likes, comments, updatedAt } = post || {};
  const { content, contents, tags } = JSON.parse(post?.title);

  const navigate = useNavigate();

  const HandleTodetailpage = useCallback(() => {
    if (isDetailPage) {
      return;
    }
    navigate('/post/detail', {
      state: {
        post,
      },
    });
  }, [post, isDetailPage, navigate]);

  const handleTagClick = useCallback(
    (tag) => {
      navigate('/search/tag', {
        state: {
          tag,
        },
      });
    },
    [navigate],
  );

  // const isFavoritePost = useMemo(() => {
  //   return likes.some(({ _id }) => _id === currentUserId);
  // }, [likes]);

  return (
    <Container>
      <ImageWrapper onClick={HandleTodetailpage}>
        <Image
          src={image ? image : 'https://picsum.photos/300/300/?image=71'}
          width="100%"
          height="100%"
        />
      </ImageWrapper>
      <Contents>
        <IconButtons>
          <IconButton className="heart-button" name="HEART">
            <IconButtonText>{likes.length}</IconButtonText>
          </IconButton>
          <IconButton
            className="comment-button"
            name="COMMENT"
            onClick={HandleTodetailpage}
          >
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
