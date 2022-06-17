import styled from '@emotion/styled';
import theme from 'styles/theme';

const { mainWhite } = theme.color;

const Fixed = styled.div`
  position: fixed;
  max-width: 500px;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${mainWhite};
`;

const FixedContainer = ({ children, width, height, top, bottom, ...props }) => {
  const fixedStyle = {
    width,
    height,
    top: top && 0,
    bottom: bottom && 0,
  };

  return (
    <Fixed {...props} style={{ ...fixedStyle, ...props.style }}>
      {children}
    </Fixed>
  );
};

export default FixedContainer;
