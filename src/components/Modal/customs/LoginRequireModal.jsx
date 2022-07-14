import { Modal } from 'components';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from 'styles/theme';

const MODAL_TITLE_LOGIN_REQUIRED = '로그인이 필요한 서비스입니다.';
const MODAL_DESCRIPTION_LOGIN_REQUIRED = '로그인 화면으로 이동하시겠어요?';

const LoginRequireModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Content
        title={MODAL_TITLE_LOGIN_REQUIRED}
        description={MODAL_DESCRIPTION_LOGIN_REQUIRED}
      />
      <Modal.Button onClick={handleClick}>예</Modal.Button>
      <Modal.Button onClick={onClose} style={modalButtonStyle}>
        아니오
      </Modal.Button>
    </Modal>
  );
};

const modalButtonStyle = {
  color: theme.color.fontBlack,
  backgroundColor: theme.color.backgroundNormal,
};

export default LoginRequireModal;
