import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import colors from 'utils/constants/colors';

const { mainGreen, white } = colors;

const StyledButton = styled.button`
  ${({
    backgroundColor,
    width,
    height,
    hover,
    active,
    cursor,
    style,
    borderWidth,
    borderColor,
  }) => ({
    backgroundColor,
    width,
    borderWidth,
    borderColor,
    height,
    '&:hover': hover,
    '&:active': active,
    cursor,
    ...style,
  })}

  border: ${(borderWidth, borderColor) =>
    borderWidth ? `${borderWidth} solid ${borderColor}` : 'none'};

  border-radius: ${(borderRadius) => (borderRadius ? borderRadius : '10px')};
`;

const Button = ({
  backgroundColor = mainGreen,
  width = '100%',
  height = '70px',
  borderColor = 'none',
  borderRadius = '10px',
  color = white,
  fontSize = '20px',
  borderWidth = 0,
  hover = { filter: 'brightness(95%)' },
  active = { filter: 'brightness(90%)' },
  cursor = 'pointer',
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      type="button"
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      borderColor={borderColor}
      borderRadius={borderRadius}
      color={color}
      fontSize={fontSize}
      borderWidth={borderWidth}
      hover={hover}
      active={active}
      cursor={cursor}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderColor: PropTypes.string,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fontSize: PropTypes.string,
  hover: PropTypes.object,
  active: PropTypes.object,
  cursor: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
