import Button from 'components/basic/Button';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)`
  margin-top: 30px;
`;
const ModalButton = ({ children, onClick, ...props }) => {
  return (
    // <StyledButton onClick={() => onClose()} height={60}>
    //   {children}
    // </StyledButton>
    <StyledButton {...props} onClick={() => onClick()} height={60} borderRadius={12}>
      {children}
    </StyledButton>
  );
};

ModalButton.defaultProps = {
  __TYPE: 'Modal.Button',
};

ModalButton.propTypes = {
  __TYPE: PropTypes.oneOf(['Modal.Button']),
};

export default ModalButton;
