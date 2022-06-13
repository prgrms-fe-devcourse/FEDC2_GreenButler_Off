import { useRef, useState } from 'react';
import styled from '@emotion/styled';

import theme from 'styles/theme';
const { backgroundGreen } = theme.color;

const ImageLoad = styled.div`
  width: 100%;
  background-color: ${backgroundGreen};
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImageInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: 100%;
  /* background-color: white; */
`;

const UploadImage = ({ onChange, defaultImage = null, ...props }) => {
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const fileBlob = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      setImageSrc(reader.result);
      onChange(reader.result);
    };
  };

  return (
    <div>
      <ImageLoad
        onClick={() => fileInputRef.current.click()}
        style={{ ...props.style }}
      >
        <ImageInner style={{ backgroundImage: `url(${imageSrc})` }} />
      </ImageLoad>
      <FileInput
        ref={fileInputRef}
        type="file"
        id="file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;
