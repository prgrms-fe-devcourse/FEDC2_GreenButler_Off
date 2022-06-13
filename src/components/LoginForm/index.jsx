import Input from 'components/basic/Input';
import Button from 'components/basic/Button';
import styled from '@emotion/styled';
import useForm from 'hooks/useForm';
import colors from 'utils/constants/colors';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Text from 'components/basic/Text';
import Viewport from 'components/Viewport';

const StyledForm = styled.form`
  width: '100%';
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${colors.mainGreen};
  color: '#FFFFFF';
  margin-top: 35px;
  margin-bottom: 33px;
`;

const SignUpLink = styled(Link)`
  display: block;
  margin-top: 16px;
  text-align: center;
  &:hover span {
    color: ${colors.mainGreen};
    border-bottom: 1px solid;
  }
`;

const ErrorText = styled.span`
  text-align: left;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: red;
`;

const LoginForm = ({
  onSubmit,
  inValidEmail = false,
  inValidPassword = false,
}) => {
  const [currentEmailInvalid, setEmailInvalid] = useState(inValidEmail);
  const [currentPasswordInvalid, setPasswordInvalid] =
    useState(inValidPassword);
  const { isLoading, values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async () => {
      setEmailInvalid(false);
      setPasswordInvalid(false);
      await onSubmit();
    },
    validate: ({ email, password }) => {
      const newErrors = {};

      if (!email) {
        newErrors.email = '! 이메일을 입력해주세요.';
        setEmailInvalid(true);
      } else {
        setEmailInvalid(false);
      }
      if (!password) {
        newErrors.password = '! 비밀번호를 입력해주세요.';
        setPasswordInvalid(true);
      } else {
        setPasswordInvalid(false);
      }

      return newErrors;
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          name="email"
          type="email"
          width={420}
          height={70}
          label={false}
          fontSize={18}
          inValid={currentEmailInvalid}
          placeholder={'이메일 주소를 입력해주세요'}
          onChange={handleChange}
        ></Input>
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="password"
          type="password"
          width={420}
          height={70}
          label={false}
          fontSize={18}
          inValid={currentPasswordInvalid}
          placeholder={'비밀 번호를 입력해주세요'}
          onChange={handleChange}
        ></Input>
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </InputWrapper>
      <StyledButton
        type="submit"
        width={420}
        height={70}
        backgroundColor={colors.mainGreen}
        borderColor={'none'}
        color={'white'}
        fontSize={18}
        disabled={isLoading}
      >
        로그인
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
