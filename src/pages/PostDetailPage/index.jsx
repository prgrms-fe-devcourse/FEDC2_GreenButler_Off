import styled from '@emotion/styled';
import PostItem from 'pages/MainPage/PostItem';
import Avatar from 'components/basic/Avatar';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { useRef, useCallback, useState, useEffect } from 'react';
import { addComment } from 'utils/apis/postApi';
import { IMAGE_URLS } from 'utils/constants/images';
import useLocalToken from 'hooks/useLocalToken';
import { useLocation } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';
import { getPostData, deleteComment } from 'utils/apis/postApi';
import { useUserContext } from 'contexts/UserContext';
import Modal from 'components/Modal';

const PostDetailPage = () => {
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
      // Todo: 간소화
      if (post._id === undefined || inputRef.current.value === undefined) {
        return;
      }
      const { data } = await addComment(localToken, post._id, inputRef.current.value);
      setPost({
        ...post,
        comments: [...post.comments, data],
      });
      setInputHeight('30px');
      inputRef.current.value = '';
    },
    [post, localToken],
  );

  const handleResizeInputHeight = useCallback(() => {
    const { value, scrollHeight } = inputRef.current;
    if (value.length === 0) {
      setInputHeight('30px');
      return;
    }
    setInputHeight(scrollHeight + 'px');
  }, [inputRef]);

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
                inputRef={inputRef}
                height={inputHeight}
                onChange={handleResizeInputHeight}
              />
              <SubmitButton />
            </CommentInputForm>
            <CommentList>
              {post.comments?.map(
                ({ _id: commentId, author: { _id, image, fullName }, comment, updatedAt }) => (
                  <CommentItem key={commentId}>
                    <UserAvatar src={image} />
                    <Content>
                      <MetaInformation>
                        <UserNameText>{fullName}</UserNameText>
                        <DateText>{updatedAt.slice(0, 10)}</DateText>
                      </MetaInformation>
                      <CommentText>{comment}</CommentText>
                    </Content>
                    {_id === currentUser.id && (
                      <MoreButton onClick={() => handleMoreClick(commentId)} />
                    )}
                  </CommentItem>
                ),
              )}
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
  border-radius: 15px;
  border: 1px solid ${theme.color.borderNormal};
`;

const CommentInput = ({ inputRef, height, onChange }) => {
  const style = {
    width: '100%',
    height,
    color: theme.color.fontBlack,
    fontSize: '18px',
    resize: 'none',
    overflow: 'hidden',
  };
  return (
    <textarea ref={inputRef} style={style} placeholder="댓글을 입력해주세요." onChange={onChange} />
  );
};

const SubmitButton = ({ ...props }) => {
  const style = {
    width: '64px',
    color: theme.color.mainWhite,
    backgroundColor: theme.color.mainGreen,
    fontSize: '18px',
    fontWeight: 700,
    padding: '10px',
    borderRadius: '8px',
    marginLeft: '10px',
    alignSelf: 'flex-end',
  };
  return (
    <button style={style} {...props}>
      등록
    </button>
  );
};

const CommentList = styled.ul`
  padding: 10px 0;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 12px 25px 12px 0;
  margin: 10px 0;
  position: relative;
`;

const UserAvatar = ({ src = IMAGE_URLS.PROFILE_IMG, ...props }) => {
  return <Avatar src={src} {...props} alt="유저 프로필 사진" size={60} />;
};

const Content = styled.div`
  margin: 0 10px;
`;

const MetaInformation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const UserNameText = styled.span`
  font-size: 18px;
  font-weight: 500;
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
  line-height: 19px;
  word-break: break-all;
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
    top: '12px',
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
`;

export default PostDetailPage;
