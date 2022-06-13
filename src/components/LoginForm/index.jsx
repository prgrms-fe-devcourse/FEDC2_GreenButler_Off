import Input from 'components/basic/Input';
import Button from 'components/basic/Button';
import styled from '@emotion/styled';
import useForm from 'hooks/useForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import theme from 'styles/theme';
import Text from 'components/basic/Text';

const StyledForm = styled.form`
  width: '100%';
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledButton = styled(Button)`
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${theme.color.mainGreen};
  color: '#FFFFFF';
  margin-top: 35px;
  margin-bottom: 33px;
`;

const ErrorText = styled.span`
  position: relative;
  bottom: 13px;
  margin-left: 25px;
  font-size: 12px;
  color: ${theme.color.mainRed};
`;

const LoginForm = ({
  onSubmit,
  inValidEmail = false,
  inValidPassword = false,
}) => {
  const theme = useTheme();
  const [currentEmailInvalid, setEmailInvalid] = useState(inValidEmail);
  const [currentPasswordInvalid, setPasswordInvalid] =
    useState(inValidPassword);
  const { isLoading, values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
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
        backgroundColor={theme.color.mainGreen}
        borderColor={'none'}
        color={'white'}
        fontSize={18}
        disabled={isLoading}
      >
        로그인
      </StyledButton>
      <Link to="/signup">
        <Text fontSize={18} color={theme.color.gray}>
          계정이 없으신가요?{'  '}
        </Text>
        <Text fontSize={18} strong color={theme.color.mainGreen}>
          회원가입
        </Text>
      </Link>
    </StyledForm>
  );
};

export default LoginForm;
