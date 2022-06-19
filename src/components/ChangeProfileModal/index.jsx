import Button from 'components/basic/Button';
import UploadImage from 'components/UploadImage';
import styled from '@emotion/styled';
import Text from 'components/basic/Text';
import useClickAway from '../../hooks/useClickAway';

const ChangeProfileModal = ({ onFileChange, onProfileSubmit, onClose }) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });
  return (
    <BackgroundDim>
      <Modal ref={ref}>
        <Text block fontSize={20} strong>
          프로필을 변경하시겠습니까?
        </Text>
        <UploadImage
          onChange={onFileChange}
          style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }}
        />{' '}
        <ModalButton
          onClick={() => {
            onClose();
            onProfileSubmit();
          }}
        >
          확인
        </ModalButton>
      </Modal>
    </BackgroundDim>
  );
};

export default ChangeProfileModal;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  background-color: white;
  box-shadow: rgb(99 99 99 / 14%) 0px 2px 6px 2px;
  box-sizing: border-box;
  max-width: 390px;
  width: 90%;
  border-radius: 15px;
  text-align: center;
`;

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  width: 500px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const ModalButton = styled(Button)`
  font-weight: 500;
  height: 60px;
  border-radius: 12px;
  margin-top: 20px;
`;
