import { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from 'utils/constants/colors';

const Label = styled.label`
  display: ${({ isLabel }) => (isLabel ? 'block' : 'none')};
  font-size: 15px;
  margin: 4px 4px;
  font-weight: bold;
  text-align: left;
  position: relative;
  left: 10px;
`;

const StyledInput = styled.input`
  ${({ inputStyle }) => inputStyle};
  &:focus {
    outline-color: ${colors.ACCENT};
  }
  padding: 0 10px;
  width: 95%;
  height: 40px;
  position: relative;
  box-sizing: border-box;
  border: ${({ inValid }) => (inValid ? `1px solid ${colors.ALERT}` : 'none')};
  background-color: ${colors.INPUT_BACKGROUND};
`;

const Input = ({
  label,
  isLabel = false,
  inValid = false,
  required = false,
  fontSize,
  placeholder,
  onChange,
  ...props
}) => {
  const InputStyle = {
    fontSize,
  };
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <>
      <Label isLabel={isLabel}>{label}</Label>
      <StyledInput
        {...props}
        inValid={inValid}
        required={required}
        placeholder={placeholder}
        inputStyle={InputStyle}
        onChange={handleChange}
      />
    </>
  );
};

export default Input;

Input.propTypes = {
  initialValue: PropTypes.string,
  label: PropTypes.string,
  isLabel: PropTypes.bool,
  inValid: PropTypes.bool,
  required: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};
