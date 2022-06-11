import { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes, { number } from 'prop-types';
import colors from 'utils/constants/colors';

const { mainGreen, mainRed, grayLight } = colors;

const InputWrapper = styled.div`
  width: ${({ width }) => (typeof width === number ? width : `${width}px`)};
  padding: 10px 10px;
  box-sizing: border-box;
  position: relative;
`;

const Label = styled.label`
  display: ${({ isLabel }) => (isLabel ? 'block' : 'none')};
  font-size: 20px;
  margin: 0 0 15px 0;

  font-weight: 500;
  text-align: left;
  position: relative;
  left: 5px;
`;

const StyledInput = styled.input`
  ${({ inputStyle }) => inputStyle};
  padding: 0 20px;
  width: 100%;
  position: relative;
  border: none;
  box-sizing: border-box;
  flex-grow: 1;
  border-radius: 10px;
  border: ${({ inValid }) =>
    inValid ? `1px solid ${mainRed}` : `1px solid ${grayLight}`};

  &:focus {
    outline-color: ${mainGreen};
  }
`;

const Input = ({
  type = 'text',
  name = 'name',
  width = '100%',
  height = '70px',
  label,
  isLabel = false,
  inValid = false,
  required = false,
  fontSize = '18px',
  placeholder,
  onChange,
  ...props
}) => {
  const InputStyle = {
    fontSize,
    height,
  };

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <InputWrapper width={width}>
      <Label isLabel={isLabel}>{label}</Label>
      <StyledInput
        type={type}
        name={name}
        height={height}
        required={required}
        placeholder={placeholder}
        inputStyle={InputStyle}
        onChange={handleChange}
        inValid={inValid}
      />
    </InputWrapper>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
