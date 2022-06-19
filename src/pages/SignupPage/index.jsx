import Logo from 'components/Logo';
import styled from '@emotion/styled';
import { IMAGE_NAMES } from 'utils/constants/images';
import SignupForm from 'components/SignupForm';
import { signup, login } from 'utils/apis/userApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignupModal from 'components/SignupModal';
import Text from 'components/basic/Text';
import useLocalStorage from 'hooks/useLocalStrorage';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';

const SignupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 111px;
`;

const StyledText = styled(Text)`
  font-weight: 500;
`;

const SignupPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [tokenInfo, setTokenInfo] = useLocalStorage('tokenInfo', '');
  const navigate = useNavigate();
  const { onSignup } = useUserContext();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async ({ email, fullName, password }) => {
    try {
      const res = await onSignup({
        email,
        fullName,
        password,
      });
    } catch (e) {
      e.message = 'SignupError';
      openModal();
      throw e;
    }
  };
  return (
    <PageWrapper>
      <SignupWrapper>
        <StyledText fontSize={30}>회원가입</StyledText>
        <SignupForm onSubmit={handleSubmit}></SignupForm>
        <SignupModal isShow={showModal} onClose={closeModal}></SignupModal>
      </SignupWrapper>
    </PageWrapper>
  );
};

export default SignupPage;
