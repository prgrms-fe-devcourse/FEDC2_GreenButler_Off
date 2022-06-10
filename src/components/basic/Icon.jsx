import styled from '@emotion/styled';
import { ICON_TYPES } from 'utils/constants/icons';

const IconWrapper = styled.i`
  display: inline-block;
`;

const Icon = ({ name, size = 15, rotate, ...props }) => {
  const { [name]: iconUrl } = ICON_TYPES;
  const shapeStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };
  const iconStyle = {
    width: size,
    height: size,
  };

  return (
    <IconWrapper {...props} style={{ ...props.style, ...shapeStyle }}>
      <img src={iconUrl} alt={name} style={{ iconStyle }} />
    </IconWrapper>
  );
};

export default Icon;
