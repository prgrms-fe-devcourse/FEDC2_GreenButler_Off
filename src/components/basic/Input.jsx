import { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from 'utils/constants/colors';

const { ALERT, BORDER_FOCUS, BORDER_NORMAL } = colors;

const InputWrapper = styled.div`
  width: ${({ width }) => width};
  padding: 10px 10px;
  box-sizing: border-box;
  position: relative;
`;

const Label = styled.label`
  display: ${({ isLabel }) => (isLabel ? 'block' : 'none')};
  font-size: 20px;
  margin: 0 0 15px 0;

  font-weight: bold;
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
  background-color: ${colors.INPUT_BACKGROUND};
  border-radius: 10px;
  border: ${({ inValid }) =>
    inValid ? `1px solid ${ALERT}` : `1px solid ${BORDER_NORMAL}`};

  &:focus {
    outline-color: ${BORDER_FOCUS};
  }
`;

const Input = ({
  width = '100%',
  height = '40px',
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
        {...props}
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
