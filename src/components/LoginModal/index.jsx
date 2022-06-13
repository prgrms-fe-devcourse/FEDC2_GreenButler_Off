import styled from '@emotion/styled';
import Text from 'components/basic/Text';
import Button from 'components/basic/Button';
import Logo from 'components/Logo';
import { useTheme } from '@emotion/react';
import { IMAGE_NAMES } from 'utils/constants/images';

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 15px;
  width: 420px;
  height: 300px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainText = styled(Text)`
  margin-top: 10px;
  margin-bottom: 11px;
`;

const SubText = styled(Text)`
  margin-bottom: 34px;
`;

const Modal = ({ isShow, onClose, width = '420px', height = '304px' }) => {
  const theme = useTheme();

  const onClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={isShow} />
      <ModalWrapper tabIndex="-1" visible={isShow} onClick={onClick}>
        <ModalInner
          tabIndex="0"
          className="modal-inner"
          width={width}
          height={height}
        >
          <Logo
            name={IMAGE_NAMES.SMALL_LOGO_IMAGE}
            width={65}
            height={65}
          ></Logo>

          <MainText fontSize={26} strong>
            로그인에 실패했어요.
          </MainText>
          <SubText fontSize={17} color={theme.color.grayDark}>
            이메일 및 비밀번호를 다시 확인해주세요
          </SubText>
          <Button
            type="submit"
            width={375}
            height={60}
            backgroundColor={theme.color.mainGreen}
            borderColor={'none'}
            color={'white'}
            fontSize={20}
            onClick={onClick}
          >
            확인
          </Button>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default Modal;
