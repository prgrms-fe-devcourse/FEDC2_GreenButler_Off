import styled from '@emotion/styled';
import { Button } from 'components';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)`
  font-weight: 500;
`;

const ModalButton = ({ children, onClick, ...props }) => {
  return (
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
