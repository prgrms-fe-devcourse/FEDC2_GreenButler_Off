//import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Image from 'components/basic/Image';
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

const StyledImage = styled(Image)`
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
      <StyledImage alt={name} src={imageUrl} />
    </LogoContainer>
  );
};

export default Logo;
