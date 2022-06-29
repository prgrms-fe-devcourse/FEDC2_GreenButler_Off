import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import ImageComponent from '../Image';
import PropTypes from 'prop-types';
import { IMAGE_URLS } from 'utils/constants/images';

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
  flex-shrink: 0;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

const Avatar = ({
  lazy,
  threshold,
  src = IMAGE_URLS.PROFILE_IMG,
  size = 70,
  placeholder,
  alt = '유저 프로필 이미지',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper {...props}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        src={src}
        width={size}
        height={size}
        alt={alt}
        mode="cover"
        placeholder={placeholder}
        style={{ opacity: loaded ? 1 : 0 }}
        defaultImageUrl={IMAGE_URLS.PROFILE_IMG}
      />
    </AvatarWrapper>
  );
};

Avatar.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string,
  size: PropTypes.number,
  placeholder: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
