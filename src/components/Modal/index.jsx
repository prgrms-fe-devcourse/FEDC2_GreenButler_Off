import React from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { useEffect, useMemo } from 'react';
import useClickAway from '../../hooks/useClickAway';
import ModalButton from './ModalButton';
import ModalContent from './ModalContent';

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
  transform: translate(-50%, -50%);
  padding: 25px;
  background-color: white;
  box-shadow: rgb(99 99 99 / 14%) 0px 2px 6px 2px;
  box-sizing: border-box;
  max-width: 390px;
  width: 90%;
  border-radius: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 30px;
`;

const Modal = ({ children, visible = false, onClose, ...props }) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.querySelector('#default-template-container').appendChild(el);

    return () => {
      document.querySelector('#default-template-container').removeChild(el);
    };
  });

  const content = React.Children.toArray(children).filter(
    (element) => element.props.__TYPE === 'Modal.Content',
  );
  const buttons = React.Children.toArray(children).filter(
    (element) => element.props.__TYPE === 'Modal.Button',
  );

  return ReactDOM.createPortal(
    <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <ModalContainer {...props} ref={ref} style={{ ...props.style }}>
        {content}
        <ButtonContainer>{buttons}</ButtonContainer>
      </ModalContainer>
    </BackgroundDim>,
    el,
  );
};

Modal.Content = ModalContent;
Modal.Button = ModalButton;

export default Modal;
