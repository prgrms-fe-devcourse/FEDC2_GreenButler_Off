import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import { me } from 'dummy';
import theme from 'styles/theme';
import Input from 'components/basic/Input';
import InputForm from 'components/basic/Input/InputForm';
import Icon from 'components/basic/Icon';
import { useUserContext } from 'contexts/UserContext';
import axios from 'axios';

const MyInfoPage = () => {
  //const { currentUser,editFullName } = useUserContext();
  const { editFullName } = useUserContext();
  const currentUser = me;
  const [isEditor, setIsEditor] = useState(false);

  const handleSubmit = (value) => {
    editFullName({ payload: { fullName: value, userName: '' } });
  };

  return (
    <UserContainter>
      <Header />
      <UserInfo>
        <Avatar
          size={136}
          style={{
            cursor: 'pointer',
          }}
          src={
            currentUser.image ||
            `https://user-images.githubusercontent.com/79133602/173279398-ac52268b-082f-4fd2-8748-b60dad85b069.png`
          }
        />
        {isEditor ? (
          <InputForm name="fullName" enterButton="수정" onSubmit={handleSubmit} />
        ) : (
          <NickName>
            <Text
              style={{
                display: 'block',
                marginTop: 5,
                fontWeight: 500,
                fontSize: 24,
                lineHeight: '34.75px',
                cursor: 'pointer',
              }}
            >
              {currentUser.fullName}
            </Text>
            <button
              onClick={() => {
                setIsEditor((isEditor) => !isEditor);
              }}
            >
              <Icon name="LIKE_ICON" size={18} style={{ marginTop: '8px', marginLeft: '5px' }} />
            </button>
          </NickName>
        )}

        <UserDetailWrapper>
          <UserDetail>
            <Text style={{ fontSize: '20px', marginLeft: '30px' }}>Email</Text>
            <Text
              style={{
                fontSize: '20px',
                marginLeft: '10px',
                color: theme.color.fontNormal,
              }}
            >
              {currentUser.email}
            </Text>
          </UserDetail>
          <UserDetail>
            <Icon
              name="LIKE_ICON"
              size={18}
              style={{
                marginTop: '2px',
                marginLeft: '28px',
                marginRight: '10px',
              }}
            />
            <Text fontSize={18}>비밀번호 변경하기</Text>
          </UserDetail>
          <UserDetail>
            <Icon
              name="LIKE_ICON"
              size={18}
              style={{
                marginTop: '2px',
                marginLeft: '28px',
                marginRight: '10px',
              }}
            />
            <Text fontSize={18}>로그아웃</Text>
          </UserDetail>{' '}
        </UserDetailWrapper>
      </UserInfo>
      <Bottom />
    </UserContainter>
  );
};

export default MyInfoPage;

const UserContainter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`;

const Header = styled.div`
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.color.borderNormal};
  background-color: white;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  height: 90px;
  width: 100%;
  border-top: 1px solid ${theme.color.borderNormal};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  text-align: center;
  margin: 120px auto 0 auto;
  position: relative;
`;

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 0;
  cursor: pointer;
`;

const UserDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0 0 0;

  > div:first-of-type {
    border-top: 1px solid ${theme.color.borderLight};
  }

  > div:nth-child(n + 2) {
    cursor: pointer;
  }
  padding-bottom: 90px;
`;

const UserDetail = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${theme.color.borderLight};
  display: flex;
  align-items: center;
`;
