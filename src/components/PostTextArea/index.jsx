import styled from '@emotion/styled';
import { useRef } from 'react';

import theme from 'styles/theme';

const { fontNormal, borderNormal, mainBlack } = theme.color;

const StyledTextArea = styled.textarea`
  margin-top: 20px;
  width: 100%;
  border: 1px solid ${borderNormal};
  border-radius: 15px;
  padding: 23px 20px;
  resize: none;
  font-size: 20px;
  color: ${mainBlack};
  overflow: hidden;

  ::placeholder {
    color: ${fontNormal};
  }
  &:focus {
    border: 1px solid ${borderNormal};
  }
`;

const PostTextArea = ({ children, onChange, placeholder, rows, cols, value }) => {
  const textRef = useRef();

  const handleResizeHeight = (e) => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
    onChange(textRef.current.value);
  };

  return (
    <StyledTextArea
      ref={textRef}
      onChange={handleResizeHeight}
      placeholder={placeholder}
      value={value}
      rows={rows}
      cols={cols}
    >
      {children}
    </StyledTextArea>
  );
};

export default PostTextArea;
