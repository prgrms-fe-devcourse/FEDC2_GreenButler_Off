import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { IMAGE_URLS } from 'utils/constants/images';

const LogoContainer = styled.div`
  ${({ logoStyle }) => logoStyle}
  position: relative;
  cursor: pointer;
  &:hover img {
    filter: brightness(95%);
  }
`;

const LogoImage = styled.img`
  cursor: pointer;
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const Logo = ({ name, width, height, ...props }) => {
  const { [name]: imageUrl } = IMAGE_URLS;
  const logoStyle = {
    width,
    height,
  };

  return (
    <LogoContainer logoStyle={logoStyle} name={name} {...props}>
      <LogoImage alt={name} src={imageUrl} />
    </LogoContainer>
  );
};

Logo.propTypes = {
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;
