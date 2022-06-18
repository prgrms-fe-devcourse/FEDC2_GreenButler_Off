import styled from '@emotion/styled';
import PostItem from 'pages/MainPage/PostItem';
import Avatar from 'components/basic/Avatar';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { useRef, useCallback, useState } from 'react';
import { addComment } from 'utils/apis/postApi';
import { IMAGE_URLS } from 'utils/constants/images';
import useLocalToken from 'hooks/useLocalToken';

const PostDetail = ({ initialPost }) => {
  const [post, setInitialPost] = useState(initialPost);
  const [inputHeight, setInputHeight] = useState('30px');
  const inputRef = useRef(null);
  const [localToken] = useLocalToken();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (post._id === undefined || inputRef.current.value === undefined) {
        return;
      }
      const { data } = await addComment(localToken, post._id, inputRef.current.value);
      setInitialPost({
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

  return (
    <Container>
      <PostItem post={post} isDetailPage={true} />
      <CommentInputForm onSubmit={handleSubmit}>
        <CommentInput inputRef={inputRef} height={inputHeight} onChange={handleResizeInputHeight} />
        <SubmitButton />
      </CommentInputForm>
      <CommentList>
        {post.comments.map(({ _id, author: { fullName }, comment, updatedAt }) => (
          <CommentItem key={_id}>
            <UserAvatar />
            <Content>
              <MetaInformation>
                <UserNameText>{fullName}</UserNameText>
                <DateText>{updatedAt.slice(0, 10)}</DateText>
              </MetaInformation>
              <CommentText>{comment}</CommentText>
            </Content>
            <MoreButton />
          </CommentItem>
        ))}
      </CommentList>
    </Container>
  );
};

const Container = styled.div``;

const CommentInputForm = styled.form`
  display: flex;
  align-items: center;
  margin: 13px 0;
  padding: 7px 15px;
  border-radius: 15px;
  border: 1px solid ${theme.color.borderNormal};
`;

const CommentInput = ({ inputRef, height, onChange }) => {
  const style = {
    width: '100%',
    height,
    color: theme.color.fontNormal,
    fontSize: '18px',
    resize: 'none',
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

const MoreButton = (props) => {
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
    <button {...props} style={style}>
      <Icon className="more-button" name="MORE" size={20} />
    </button>
  );
};

export default PostDetail;
