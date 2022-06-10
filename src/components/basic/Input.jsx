import { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import colors from 'utils/constants/colors';

const InputStyled = styled.input`
  ${({ inputStyle }) => inputStyle};
  &:focus {
    outline-color: ${colors.ACCENT};
  }
  padding: 0 10px;
  width: 95%;
  height: 40px;
  margin: 5px 10px;
  box-sizing: border-box;
  border: none;
  background-color: ${colors.INPUT_BACKGROUND};
`;

const Input = ({
  block = false,
  fontSize,
  placeholder,
  onChange,
  style,
  ...props
}) => {
  const InputStyle = {
    display: block ? 'block' : 'inline-block',
    fontSize,
    ...style,
  };
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <InputStyled
      style={{ ...style }}
      {...props}
      placeholder={placeholder}
      inputStyle={InputStyle}
      onChange={handleChange}
    />
  );
};

export default Input;
