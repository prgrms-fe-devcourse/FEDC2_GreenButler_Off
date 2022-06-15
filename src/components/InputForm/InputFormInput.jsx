import React from 'react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

const { fontNormal } = theme.color;
const StyledInput = styled.input`
  font-size: 20px;
  border: none;
  width: 100%;
  min-height: 46px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 20px;
  background-color: transparent;

  ::placeholder {
    color: ${fontNormal};
  }

  &:focus {
    outline: none;
  }
`;

const InputFormInput = ({ placeholder, onChange, value, ...props }) => {
  const handleChange = (e) => {
    onChange && onChange(e);
  };
  return (
    <>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </>
  );
};

export default InputFormInput;
