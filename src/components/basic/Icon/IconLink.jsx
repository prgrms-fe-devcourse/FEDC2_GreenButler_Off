import styled from '@emotion/styled';
import Icon from './index';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const IconLink = ({ children, to, name, size = 15, rotate, ...props }) => {
  return (
    <StyledLink to={to} {...props}>
      <Icon name={name} size={size} rotate={rotate} />
      {children}
    </StyledLink>
  );
};

export default IconLink;
