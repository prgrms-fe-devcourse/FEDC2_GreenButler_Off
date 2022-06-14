import { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from 'utils/constants/colors';

const { black, mainRed, grayLight } = colors;

const InputWrapper = styled.div`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

const Label = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 500;
  text-align: left;
`;

const StyledInput = styled.input`
  ${({ inputStyle }) => inputStyle};
  width: 100%;
  padding: 22px 22px;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid ${({ inValid }) => (inValid ? mainRed : grayLight)};

  ::placeholder {
    color: #a3a3a3;
  }

  &:focus {
    outline-color: ${black};
  }
`;

const NewInput = ({
  block,
  width,
  type = 'text',
  name = 'name',
  label = 'label',
  inValid = false,
  required = false,
  fontSize = '18px',
  placeholder,
  onChange,
  ...props
}) => {
  const InputStyle = {
    fontSize,
  };

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
    },
    [onChange],
  );

  return (
    <InputWrapper block={block} width={width}>
      {label && <Label>{label}</Label>}
      <StyledInput
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        inputStyle={InputStyle}
        onChange={handleChange}
        inValid={inValid}
      />
    </InputWrapper>
  );
};

export default NewInput;

NewInput.propTypes = {
  block: PropTypes.bool,
  width: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  inValid: PropTypes.bool,
  required: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
