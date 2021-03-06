import styled from '@emotion/styled';
import { IMAGE_NAMES } from 'utils/constants/images';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from 'contexts/UserContext';
import { PageWrapper, LoginForm, Modal, Logo } from 'components';

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 152px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { onLogin, currentUser } = useUserContext();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      const res = await onLogin({
        email,
        password,
      });
    } catch (e) {
      e.message = 'LoginError';
      openModal();
      throw e;
    }
  };
  return (
    <PageWrapper>
      <LoginWrapper>
        <LogoWrapper>
          <Logo name={IMAGE_NAMES.LOGO_IMAGE} width={'60%'} height={97}></Logo>
        </LogoWrapper>

        <LoginForm onSubmit={handleSubmit}></LoginForm>
        <Modal visible={showModal} onClose={closeModal}>
          <Modal.Content
            title="로그인에 실패했어요!"
            description="이메일 및 비밀번호를 다시 확인해 주세요."
            onClose={closeModal}
          ></Modal.Content>
          <Modal.Button onClick={closeModal}>확인</Modal.Button>
        </Modal>
      </LoginWrapper>
    </PageWrapper>
  );
};

export default LoginPage;
