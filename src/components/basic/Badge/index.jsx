import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from 'styles/theme';

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Dot = styled.div`
  position: absolute;
  top: 0;
  right: 0; 
  padding: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${theme.color.mainRed};
`;

const Badge = ({ children, isShow = false }) => {

  return (
    <BadgeContainer>
      {children}
      {isShow && <Dot />}
    </BadgeContainer>
  );
}

Badge.propTypes = {
  children: PropTypes.element,
  isShow: PropTypes.bool,
}

export default Badge;