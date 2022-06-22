import styled from '@emotion/styled';
import PostItem from 'pages/MainPage/PostItem';
import { Avatar, Icon, Modal, PageWrapper } from 'components';
import theme from 'styles/theme';
import { useRef, useCallback, useState, useEffect } from 'react';
import { addComment } from 'utils/apis/postApi';
import { IMAGE_URLS } from 'utils/constants/images';
import useLocalToken from 'hooks/useLocalToken';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostData, deleteComment } from 'utils/apis/postApi';
import { useUserContext } from 'contexts/UserContext';
import { setNotification } from 'utils/apis/userApi';
import displayedAt from 'utils/functions/displayedAt';

const PostDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [inputHeight, setInputHeight] = useState('30px');
  const inputRef = useRef(null);
  const [localToken] = useLocalToken();
  const { currentUser } = useUserContext();
  const [isModal, setIsModal] = useState(false);
  const commentIdToDelete = useRef('');

  useEffect(() => {
    const postId = location.pathname.split('/')[3];
    (async () => {
      const initialPost = await getPostData(postId).then((res) => res.data);
      setPost(initialPost);
    })();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!inputRef.current.value) {
        return;
      }
      const newComment = await addComment(localToken, post._id, inputRef.current.value).then(
        (res) => res.data,
      );
      setPost({
        ...post,
        comments: [...post.comments, newComment],
      });
      setInputHeight('30px');
      inputRef.current.value = '';
      if (currentUser.id !== post.author._id) {
        await setNotification(localToken, 'COMMENT', newComment._id, post.author._id, post._id);
      }
    },
    [post, localToken, currentUser.id],
  );

  const handleResizeInputHeight = useCallback(() => {
    const { value, scrollHeight } = inputRef.current;
    if (value.length === 0) {
      setInputHeight('30px');
      return;
    }
    setInputHeight(scrollHeight + 'px');
  }, [inputRef]);

  const handleAvatarClick = useCallback(
    (userId) => {
      navigate(`/user/${userId}`);
    },
    [navigate],
  );

  const handleMoreClick = useCallback((commentId) => {
    setIsModal(true);
    commentIdToDelete.current = commentId;
  }, []);

  const handleDeleteComment = useCallback(async () => {
    setIsModal(false);
    if (localToken && commentIdToDelete.current) {
      await deleteComment(localToken, commentIdToDelete.current);
      const nextComments = post.comments.filter(
        (comment) => comment._id !== commentIdToDelete.current,
      );
      setPost({
        ...post,
        comments: nextComments,
      });
    }
  }, [post, localToken]);

  const onClose = useCallback(() => {
    setIsModal(false);
  }, []);

  return (
    <>
      {post && (
        <PageWrapper header nav prev title={post.author.fullName + '님의 게시물'}>
          <Container>
            <PostItem post={post} isDetailPage={true} />
            <CommentInputForm onSubmit={handleSubmit}>
              <CommentInput
                ref={inputRef}
                height={inputHeight}
                onChange={handleResizeInputHeight}
                placeholder="댓글을 입력해주세요."
              />
              <SubmitButton />
            </CommentInputForm>
            <CommentList>
              {post.comments
                .map(({ _id: commentId, author: { _id, image, fullName }, comment, createdAt }) => (
                  <CommentItem key={commentId}>
                    <UserAvatar src={image} onClick={() => handleAvatarClick(_id)} />
                    <Content>
                      <MetaInformation>
                        <UserNameText>{fullName}</UserNameText>
                        <DateText>{displayedAt(createdAt)}</DateText>
                      </MetaInformation>
                      <CommentText>{comment}</CommentText>
                    </Content>
                    {_id === currentUser.id && (
                      <MoreButton onClick={() => handleMoreClick(commentId)} />
                    )}
                  </CommentItem>
                ))
                .reverse()}
            </CommentList>
          </Container>
          <Modal visible={isModal} onClose={onClose}>
            <Modal.Custom>
              <DeleteCommentButton onClick={handleDeleteComment}>삭제</DeleteCommentButton>
            </Modal.Custom>
          </Modal>
        </PageWrapper>
      )}
    </>
  );
};

const Container = styled.div``;

const CommentInputForm = styled.form`
  display: flex;
  align-items: center;
  margin: 13px 0;
  padding: 12px;
  padding-left: 22px;
  border-radius: 15px;
  border: 1px solid ${theme.color.borderNormal};
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: ${({ height }) => height};
  color: ${theme.color.fontBlack};
  font-size: 18px;
  resize: none;
  overflow: hidden;

  &::placeholder {
    color: ${theme.color.fontNormal};
  }
`;

const SubmitButton = ({ ...props }) => {
  const style = {
    color: theme.color.mainWhite,
    backgroundColor: theme.color.mainGreen,
    fontSize: '18px',
    fontWeight: 500,
    padding: '10px 16px',
    borderRadius: '12px',
    marginLeft: '10px',
    alignSelf: 'flex-end',
    whiteSpace: 'nowrap',
  };
  return (
    <button style={style} {...props}>
      등록
    </button>
  );
};

const CommentList = styled.ul`
  margin: 10px 0;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 20px 25px 20px 0;
  position: relative;
`;

const Content = styled.div`
  margin: 0 10px;
  transform: translateY(8px);
`;

const UserAvatar = ({ src, onClick }) => {
  const style = {
    cursor: 'pointer',
  };
  return (
    <div onClick={onClick} style={style}>
      <Avatar src={src} size={60} />
    </div>
  );
};

const MetaInformation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const UserNameText = styled.span`
  font-size: 18px;
  font-weight: bold;
  line-height: 19px;
`;

const DateText = styled.span`
  color: ${theme.color.fontNormal};
  font-size: 14px;
  line-height: 15px;
  margin-left: 6px;
  word-wrap: break-word;
`;

const CommentText = styled.p`
  font-size: 16px;
  line-height: 24px;
  word-break: break-all;
  white-space: pre-wrap;
`;

const MoreButton = ({ onClick, ...props }) => {
  const style = {
    borderRadius: '0',
    backgroundColor: 'transparent',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '23px',
    right: '0',
  };

  return (
    <button {...props} style={style} onClick={onClick}>
      <Icon className="more-button" name="MORE" size={20} />
    </button>
  );
};

const DeleteCommentButton = styled.button`
  background-color: ${theme.color.mainWhite};
  color: ${theme.color.mainRed};
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 24px;
  line-height: 29px;
  padding: 35px 0;
  border-radius: 15px 15px 0 0;

  @media screen and (max-width: 500px) {
    width: 100vw;
    padding: 22px 0;
    font-size: 22px;
  }
`;

export default PostDetailPage;
