import { useState } from 'react';
import styled from '@emotion/styled';
import { Text, Icon, Modal } from 'components';
import { LOGOUT, KEY } from 'utils/constants/icons/names';
import { useUserContext } from 'contexts/UserContext';
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const navigate = useNavigate();
  const { currentUser, onLogout } = useUserContext();
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const onCloseLogout = () => {
    setIsLogoutModal(false);
  };

  return (
    <UserDetailWrapper>
      <UserDetail>
        <Text style={{ marginLeft: '30px' }} fontSize={20}>
          Email
        </Text>
        <Text
          style={{
            marginLeft: '10px',
          }}
          color={theme.color.fontNormal}
          fontSize={20}
        >
          {currentUser.email}
        </Text>
      </UserDetail>
      <UserDetail
        onClick={() => {
          navigate('/user/myInfo/edit');
        }}
      >
        <Icon.Link
          name={KEY}
          size={24}
          style={{
            marginTop: '2px',
            marginLeft: '28px',
          }}
          to="/user/myInfo/edit"
        >
          <Text fontSize={20} style={{ marginLeft: '10px' }}>
            비밀번호 변경하기
          </Text>
        </Icon.Link>
      </UserDetail>
      <UserDetail onClick={() => setIsLogoutModal(true)}>
        <Icon.Button
          name={LOGOUT}
          size={24}
          style={{
            marginTop: '2px',
            marginLeft: '28px',
          }}
          onClick={() => {
            setIsLogoutModal(true);
          }}
        >
          <Text fontSize={20} style={{ marginLeft: '10px' }}>
            로그아웃
          </Text>
        </Icon.Button>
      </UserDetail>{' '}
      {isLogoutModal && (
        <Modal visible={isLogoutModal} onClose={onCloseLogout}>
          <Modal.Content
            title="로그아웃 하시겠어요?"
            description="로그아웃 시 로그인 화면으로 이동됩니다."
            onClose={onCloseLogout}
          />
          <Modal.Button
            onClick={() => {
              onLogout();
              navigate('/login');
            }}
          >
            로그아웃
          </Modal.Button>
          <Modal.Button
            onClick={onCloseLogout}
            backgroundColor={theme.color.backgroundNormal}
            color="#000"
          >
            취소
          </Modal.Button>
        </Modal>
      )}
    </UserDetailWrapper>
  );
};

export default UserDetails;

const UserDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0 0 0;

  > div:first-of-type {
    border-top: 1px solid ${theme.color.borderLight};
  }

  > div:nth-of-type(n + 2) {
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
