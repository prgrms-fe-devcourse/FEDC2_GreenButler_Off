import Logo from 'components/Logo';
import styled from '@emotion/styled';
import { IMAGE_NAMES } from 'utils/constants/images';
import LoginForm from 'components/LoginForm';
import { login } from 'utils/apis/userApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from 'components/LoginModal';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 152px;
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
        <Logo name={IMAGE_NAMES.LOGO_IMAGE} width={'100%'} height={97}></Logo>
        <LoginForm onSubmit={handleSubmit}></LoginForm>
        <LoginModal isShow={showModal} onClose={closeModal}></LoginModal>
      </LoginWrapper>
    </PageWrapper>
  );
};

export default LoginPage;
