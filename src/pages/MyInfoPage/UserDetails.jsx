import { useState } from 'react';
import styled from '@emotion/styled';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import { LOGOUT, KEY } from 'utils/constants/icons/names';
import { useUserContext } from 'contexts/UserContext';
import theme from 'styles/theme';
import Modal from 'components/Modal';
import { navigate } from '@storybook/addon-links';

const UserDetails = () => {
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
            color: theme.color.fontNormal,
          }}
          fontSize={20}
        >
          {currentUser.email}
        </Text>
      </UserDetail>
      <UserDetail>
        <Icon.Link
          name={KEY}
          size={18}
          style={{
            marginTop: '2px',
            marginLeft: '28px',
          }}
          to="/user/myInfo/edit"
        >
          <Text fontSize={18} style={{ marginLeft: '10px' }}>
            비밀번호 변경하기
          </Text>
        </Icon.Link>
      </UserDetail>
      <UserDetail>
        <Icon.Button
          name={LOGOUT}
          size={18}
          style={{
            marginTop: '2px',
            marginLeft: '28px',
          }}
          onClick={() => {
            setIsLogoutModal(true);
          }}
        >
          <Text fontSize={18} style={{ marginLeft: '10px' }}>
            로그아웃
          </Text>
        </Icon.Button>
      </UserDetail>{' '}
      {isLogoutModal && (
        <Modal visible={isLogoutModal} onClose={onCloseLogout}>
          <Modal.Content
            title="로그아웃 하시겠어요?"
            description="로그아웃 시 로그인 화면으로 이동합니다."
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
