import { Text, Modal, PageWrapper, SignupForm } from 'components';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { useUserContext } from 'contexts/UserContext';

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
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { onSignup } = useUserContext();

  const closeModal = () => {
    setShowModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const onClick = () => {
    navigate('/');
  };

  const handleSubmit = async ({ email, fullName, password }) => {
    try {
      const res = await onSignup({
        email,
        fullName,
        password,
      });
      setShowLoginModal(true);
    } catch (e) {
      e.message = 'SignupError';
      if (e.code === 'ERR_BAD_REQUEST') {
        setDescription('이미 가입된 이메일입니다.');
      } else if (e.code === 'ERR_NETWORK') {
        setDescription('네트워크 연결이 불안정합니다.');
      }
      setShowModal(true);
      throw e;
    }
  };
  return (
    <PageWrapper>
      <SignupWrapper>
        <StyledText fontSize={30}>회원가입</StyledText>
        <SignupForm onSubmit={handleSubmit}></SignupForm>
        <Modal visible={showLoginModal} onClose={closeLoginModal}>
          <Modal.Content
            title="회원가입에 성공했어요!"
            description="자동 로그인되어 메인 페이지로 이동합니다."
            onClose={closeLoginModal}
          ></Modal.Content>
          <Modal.Button onClick={onClick}>확인</Modal.Button>
        </Modal>
        <Modal visible={showModal} onClose={closeModal}>
          <Modal.Content
            title="회원가입에 실패했어요!"
            description={description ? description : '이메일 및 비밀번호를 다시 확인해 주세요.'}
            onClose={closeModal}
          ></Modal.Content>
          <Modal.Button onClick={closeModal}>확인</Modal.Button>
        </Modal>
      </SignupWrapper>
    </PageWrapper>
  );
};

export default SignupPage;
