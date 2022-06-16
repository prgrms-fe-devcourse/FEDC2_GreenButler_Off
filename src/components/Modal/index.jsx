import styled from '@emotion/styled';
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import useClickAway from '../../hooks/useClickAway';

/*
 TODO:
 body를 container로 감싼 형태이기 때문에
 container 바깥으로 빠져나가는 현상 발생하여 해결 필요
 */

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

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0.2);
  box-sizing: border-box;
  width: 300px;
  border-radius: 15px;
`;

const Modal = ({ children, width, height, visible = false, onClose, ...props }) => {
  const containerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );

  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.querySelector('#default-template-container').appendChild(el);
    //모바일 view기 때문에 body에서 처리하면안됨
    return () => {
      document.querySelector('#default-template-container').removeChild(el);
    };
  });

  return ReactDOM.createPortal(
    <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <ModalContainer {...props} ref={ref} style={{ ...props.style, ...containerStyle }}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el,
  );
};

export default Modal;
