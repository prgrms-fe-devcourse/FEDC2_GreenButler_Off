import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import colors from 'utils/constants/colors';

const { mainGreen } = colors;

const StyledButton = styled.button`
  border-radius: ${({ borderRadius }) => borderRadius};
  cursor: pointer;
  padding: 0 16px;
  white-space: nowrap;

  &:hover {
    ${({ hover }) => hover}
  }
  &:active {
    ${({ active }) => active}
  }
  :disabled {
    opacity: 0.5;
  }
`;

const Button = ({
  width = '100%',
  height = '70px',
  color = 'white',
  backgroundColor = mainGreen,
  borderColor = 'none',
  borderRadius = '15px',
  borderWidth = 0,
  fontSize = '20px',
  hover = { filter: 'brightness(95%)' },
  active = { filter: 'brightness(90%)' },
  children,
  onClick,
  disabled,
  ...props
}) => {
  const buttonStyle = {
    width,
    height,
    color,
    backgroundColor,
    border: `${borderWidth ? borderWidth : 0}px solid ${borderColor ? borderColor : 'none'}`,
    borderRadius,
    fontSize,
  };

  return (
    <StyledButton
      style={{ ...buttonStyle, ...props.style }}
      hover={!disabled && hover}
      active={!disabled && active}
      onClick={onClick}
      disabled={disabled}
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
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
