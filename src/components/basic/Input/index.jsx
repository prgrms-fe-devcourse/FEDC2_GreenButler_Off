import { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes, { number } from 'prop-types';
import colors from 'utils/constants/colors';
import Icon from 'components/basic/Icon';

const { mainGreen, mainRed, grayLight } = colors;

const InputWrapper = styled.div`
  width: ${({ width }) => (typeof width === number ? width : `${width}px`)};
  padding: 22px 22px;
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

const SearchIcon = styled(Icon)`
  display: ${({ isIcon }) => (isIcon ? 'block' : 'none')};
  position: absolute;
  left: 40px;
  bottom: 50%;
  top: 50%;
  margin: auto 0 auto 0;
`;

const StyledInput = styled.input`
  ${({ inputStyle }) => inputStyle};
  padding: 0 ${({ isIcon }) => (isIcon ? '50px' : '22px')};
  width: 100%;
  position: relative;
  border: none;
  box-sizing: border-box;
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
  isIcon = false,
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
        isIcon={isIcon}
        required={required}
        placeholder={placeholder}
        inputStyle={InputStyle}
        onChange={handleChange}
        inValid={inValid}
      />
      <SearchIcon isIcon={isIcon} name="LIKE_ICON"></SearchIcon>
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
  isIcon: PropTypes.bool,
  isLabel: PropTypes.bool,
  inValid: PropTypes.bool,
  required: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
