import Input from 'components/basic/Input';
import PropTypes, { number } from 'prop-types';
import Button from 'components/basic//Button';
import styled from '@emotion/styled';
import useForm from 'hooks/useForm';
import colors from 'utils/constants/colors';
import { useState } from 'react';

const { mainGreen } = colors;

const StyledForm = styled.form`
  width: '100%';
  padding: 22px 22px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${mainGreen};
  color: '#FFFFFF';
`;

const InputForm = ({
  onSubmit,
  placeholder = '태그를 입력해 주세요.',
  name = 'tag',
  width = '100%',
  height = '70px',
  fontSize = '18px',
  children = '등록',
  inValid = false,
}) => {
  const [currentInvalid, setInvalid] = useState(inValid);
  const { values, errors, handleSubmit, handleChange, isLoading } = useForm({
    initialValues: {
      tag: '',
      fullName: '',
    },
    onSubmit: async () => {
      setInvalid(false);
      await onSubmit();
    },
    validate: ({ tag, fullName }) => {
      const newErrors = {};
      if (name === 'fullName' && (!fullName || fullName.length > 7)) {
        newErrors.fullName = '닉네임은 1-7글자 사이로 입력해주세요!';
        setInvalid(true);
      }
      if (name === 'tag' && !tag) {
        newErrors.tag = '태그입력!';
        setInvalid(true);
      }
      return newErrors;
    },
  });

  const inputProps = {
    width,
    placeholder,
    name,
    fontSize,
    height,
    inValid: currentInvalid,
  };

  const buttonProps = {};

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input onChange={handleChange} {...inputProps} />
      <StyledButton type="submit" disabled={isLoading}>
        {children}
      </StyledButton>
    </StyledForm>
  );
};

export default InputForm;

InputForm.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.string,
  children: PropTypes.string,
  buttonWidth: PropTypes.string,
  buttonHeight: PropTypes.string,
  buttonFontSize: PropTypes.string,
  inValid: PropTypes.bool,
};
