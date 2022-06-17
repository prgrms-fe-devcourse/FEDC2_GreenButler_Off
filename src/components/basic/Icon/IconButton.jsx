import styled from '@emotion/styled';
import Icon from './index';

const Button = styled.button`
  display: flex;
  align-items: center;
`;

const IconButton = ({ children, name, size = 15, rotate, ...props }) => {
  return (
    <Button {...props}>
      <Icon name={name} size={size} rotate={rotate} />
      {children}
    </Button>
  );
};

export default IconButton;
