import styled from '@emotion/styled';
import Button from '../basic/Button';

const StyledButton = styled(Button)`
  font-size: ${({ fontSize }) => fontSize};
  background-color: #30a57d;
  color: white;
  padding: 0 16px;
  font-size: 18px;
  border-radius: 10px;
`;

const InputFormButton = ({ children, ...props }) => {
  return (
    <StyledButton
      type="submit"
      width="auto"
      height={46}
      borderRadius={12}
      fontWeight={500}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default InputFormButton;
