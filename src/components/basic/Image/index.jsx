import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useState, useRef, useEffect } from 'react';
import { IMAGE_URLS } from 'utils/constants/images';

let observer = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

const onIntersection = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

const Image = ({
  lazy,
  threshold = 0.5,
  placeholder,
  src,
  block,
  width,
  height,
  alt,
  mode = 'cover',
  defaultImageUrl,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  const imageStyle = {
    display: block ? 'block' : undefined,
    width,
    objectFit: mode,
  };

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;
    imgElement && imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    return () => {
      imgElement && imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) {
      return;
    }
    observer = new IntersectionObserver(onIntersection, { threshold });
    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  const handleError = useCallback(
    ({ target }) => {
      target.onerror = null;
      target.src = defaultImageUrl || '';
      target.style.opacity = 1;
    },
    [defaultImageUrl],
  );

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      width={width}
      height={height}
      style={{ ...props.style, ...imageStyle }}
      onError={handleError}
    />
  );
};

Image.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  mode: PropTypes.string,
  block: PropTypes.bool,
};

export default Image;
