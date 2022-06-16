import styled from '@emotion/styled';
import Input from './InputFormInput';
import Button from './InputFormButton';
import theme from 'styles/theme';

const { mainRed, borderNormal } = theme.color;
const StyledInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid ${borderNormal};
`;

const Error = styled.p`
  margin: 15px 0;
  color: ${mainRed};
`;

const InputForm = ({ children, error, onSubmit, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledInner {...props}>{children}</StyledInner>
      <Error>{error && error}</Error>
    </form>
  );
};

InputForm.Input = Input;
InputForm.Button = Button;

export default InputForm;
