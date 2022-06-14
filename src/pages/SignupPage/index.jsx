import Logo from 'components/Logo';
import styled from '@emotion/styled';
import { IMAGE_NAMES } from 'utils/constants/images';
import SignupForm from 'components/SignupForm';
import { signup, login } from 'utils/apis/userApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from 'components/LoginModal';
import Text from 'components/basic/Text';
import useLocalStorage from 'hooks/useLocalStrorage';

const LoginWrapper = styled.div`
  width: 500px;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 152px;
`;

const StyledText = styled(Text)`
  font-weight: 400;
`;

const SignupPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [tokenInfo, setTokenInfo] = useLocalStorage('tokenInfo', '');
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async ({ email, fullName, password }) => {
    try {
      const res = await signup({
        email,
        fullName,
        password,
      });
      if (res.data.token) {
        const resLogin = await login({ email, password });
        if (resLogin.data.token) {
          setTokenInfo(res.data.token);
          navigate('/');
        }
      }
    } catch (e) {
      e.message = 'SignupError';
      openModal();
      throw e;
    }
  };
  return (
    <LoginWrapper>
      <StyledText fontSize={30}>회원가입</StyledText>
      <SignupForm onSubmit={handleSubmit}></SignupForm>
      <LoginModal isShow={showModal} onClose={closeModal}></LoginModal>
    </LoginWrapper>
  );
};

export default SignupPage;
