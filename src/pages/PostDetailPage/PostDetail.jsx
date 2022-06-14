import styled from '@emotion/styled';
import PostBody from 'pages/MainPage/PostBody';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { useRef, useCallback, useState } from 'react';

const PostDetail = () => {
  return (
    <Container>
      <PostBody />
      <CommentInputForm>
        <CommentInput />
        <SubmitButton />
      </CommentInputForm>
      <CommentList>
        <CommentItem>
          <UserAvatar />
          <Content>
            <MetaInformation>
              <UserNameText>홈가드너의일상</UserNameText>
              <DateText>1분 전</DateText>
            </MetaInformation>
            <CommentText>
              제 선인장두 얼른 꽃이 폈으면...!제 선인장두 얼른 꽃이 폈으면...!
            </CommentText>
          </Content>
          <MoreButton />
        </CommentItem>
        <CommentItem>
          <UserAvatar />
          <Content>
            <MetaInformation>
              <UserNameText>홈가드너의일상</UserNameText>
              <DateText>1분 전</DateText>
            </MetaInformation>
            <CommentText>
              제 선인장두 얼른 꽃이 폈으면...!제 선인장두 얼른 꽃이 폈으면...!
            </CommentText>
          </Content>
          <MoreButton />
        </CommentItem>
        <CommentItem>
          <UserAvatar />
          <Content>
            <MetaInformation>
              <UserNameText>홈가드너의일상</UserNameText>
              <DateText>1분 전</DateText>
            </MetaInformation>
            <CommentText>
              제 선인장두 얼른 꽃이 폈으면...!제 선인장두 얼른 꽃이 폈으면...!
            </CommentText>
          </Content>
          <MoreButton />
        </CommentItem>
      </CommentList>
    </Container>
  );
};

const Container = styled.div``;

const CommentInputForm = styled.form`
  display: flex;
  align-items: center;
  margin: 13px 20px;
  padding: 7px 15px;
  border-radius: 15px;
  border: 1px solid ${theme.color.borderNormal};
`;

const CommentInput = () => {
  const [height, setHeight] = useState('30px');
  const textRef = useRef();

  const handleResizeHeight = useCallback(() => {
    const { value, scrollHeight } = textRef.current;
    if (value.length === 0) {
      setHeight('30px');
      return;
    }
    setHeight(scrollHeight + 'px');
  }, []);

  const style = {
    width: '100%',
    height,
    color: theme.color.fontNormal,
    fontSize: '18px',
    resize: 'none',
  };

  return (
    <textarea
      ref={textRef}
      style={style}
      placeholder="댓글을 입력해주세요."
      onChange={handleResizeHeight}
    />
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
  padding: 10px 20px;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 12px 25px 12px 0;
  margin: 10px 0;
  position: relative;
`;

const UserAvatar = (props) => {
  const style = {
    flexShrink: '0',
  };

  return (
    <Avatar
      {...props}
      {...style}
      src="https://picsum.photos/300/300/?image=39"
      alt="유저 프로필 사진"
      size={60}
    />
  );
};

const Content = styled.div`
  margin: 0 10px;
`;

const MetaInformation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const UserNameText = ({ children, ...props }) => {
  const style = {
    fontWeight: '700',
    lineHeight: '19px',
  };
  return (
    <Text {...props} style={style}>
      {children}
    </Text>
  );
};

const DateText = ({ children, ...props }) => {
  const style = {
    color: theme.color.fontNormal,
    fontSize: '12px',
    lineHeight: '15px',
    marginLeft: '6px',
  };
  return (
    <Text {...props} style={style}>
      {children}
    </Text>
  );
};

const CommentText = ({ children, ...props }) => {
  const style = {
    fontSize: '16px',
    lineHeight: '19px',
  };
  return (
    <Text paragraph {...props} style={style}>
      {children}
    </Text>
  );
};

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
      <Icon className="more-button" name="SEARCH_GRAY" size={20} />
    </button>
  );
};

{
  /* <UserAvatar />
<MetaInformation>
  <UserNameText />   
  <DateText  />   
</MetaInformation>
<CommentText /> */
}

export default PostDetail;

// const Textarea = () => {
//   const autoResizeTextarea = () => {
//     const textarea = document.querySelector('.autoTextarea');

//     if (textarea) {
//       textarea.style.height = 'auto';
//       const height = textarea.scrollHeight; // 높이
//       textarea.style.height = `${height + 8}px`;
//     }
//   };

//   return (
//     <>
//       <textarea
//         type="text"
//         placeholder={`입력값을 입력해주세요!\n길이는 마음대로입니다.`}
//         maxLength="1200"
//         className="autoTextarea"
//         onKeyUp={autoResizeTextarea} // keyup이되엇을때마다 autoResizeTextarea실행
//       />
//     </>
//   );
// };

// const CommentInput = styled.textarea`
//   width: 100%;
//   border: 1px solid #d1d1d1;
//   border-radius: 15px;
//   color: ${theme.color.fontNormal};
//   font-size: 18px;
//   padding: 22px 30px;
//   resize: none;
// `;
