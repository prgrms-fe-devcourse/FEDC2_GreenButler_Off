//import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { IMAGE_URLS } from 'utils/constants/images';
import { useCallback } from 'react';

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

const Logo = ({ isLink, name, width, height, ...props }) => {
  //const navigate = useNavigate();
  const { [name]: imageUrl } = IMAGE_URLS;
  const logoStyle = {
    width,
    height,
  };

  const handleClcikLogo = useCallback(() => {
    //navigate('/');
  }, []);

  return (
    <LogoContainer
      logoStyle={logoStyle}
      name={name}
      onClick={isLink ? () => handleClcikLogo : null}
      {...props}
    >
      <LogoImage alt={name} src={imageUrl} />
    </LogoContainer>
  );
};

Logo.propTypes = {
  isLink: PropTypes.bool,
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;
