import Input from 'components/basic/Input';
import Button from 'components/basic/Button';
import styled from '@emotion/styled';
import useForm from 'hooks/useForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import theme from 'styles/theme';
import PropTypes from 'prop-types';
import Text from 'components/basic/Text';
import useValidInputs from 'hooks/useValidInputs';

const StyledForm = styled.form`
  margin-top: 54px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${theme.color.mainGreen};
  color: '#FFFFFF';
`;

const StyledText = styled(Text)`
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0px 20px;
  margin-top: 25px;
  margin-bottom: 33px;
`;

const ErrorText = styled.span`
  text-align: left;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: ${theme.color.mainRed};
`;

const emailValid = (email) => {
  const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return reg.test(email);
};

const SignupForm = ({
  onSubmit,
  inValidEmail = false,
  inValidPassword = false,
  inValidFullName = false,
  inValidPasswordCheck = false,
}) => {
  const [currentEmailInvalid, setEmailInvalid] = useState(inValidEmail);
  const [currentPasswordInvalid, setPasswordInvalid] = useState(inValidPassword);
  const [currentPasswordCheckInvalid, setPasswordCheckInvalid] = useState(inValidPasswordCheck);
  const [currentFullNameInvalid, setFullNameInvalid] = useState(inValidFullName);
  const { isLoading, values, errors, handleChange, handleSubmit, errorPassword, errorfullName } =
    useValidInputs({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit,
      validate: ({ email, password, fullName, passwordCheck }) => {
        const newErrors = {};

        if (!email) {
          newErrors.email = '* 이메일을 입력해 주세요.';
          setEmailInvalid(true);
        } else if (!emailValid(email)) {
          newErrors.email = '* 이메일 형식이 아닙니다.';
          setEmailInvalid(true);
        } else {
          setEmailInvalid(false);
        }
        if (!fullName) {
          newErrors.fullName = '* 닉네임을 입력해 주세요.';
          setFullNameInvalid(true);
        } else {
          setFullNameInvalid(false);
        }
        if (!password || password.length < 8) {
          newErrors.password = '* 비밀번호를 8-10자 사이로 입력해 주세요.';
          setPasswordInvalid(true);
        } else {
          setPasswordInvalid(false);
        }
        if (password !== passwordCheck) {
          newErrors.passwordCheck = '* 비밀번호가 일치하지 않습니다.';
          setPasswordCheckInvalid(true);
        } else {
          setPasswordCheckInvalid(false);
        }

        return newErrors;
      },
      max: 10,
    });
  values.email;
  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          name="email"
          height={'70'}
          label={''}
          fontSize={18}
          inValid={currentEmailInvalid}
          placeholder={'이메일을 입력해 주세요.'}
          onChange={handleChange}
        ></Input>
        {errors.email ? (
          <ErrorText>{errors.email}</ErrorText>
        ) : (
          <div style={{ height: '17px' }}></div>
        )}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="fullName"
          height={'70'}
          label={''}
          fontSize={18}
          inValid={currentFullNameInvalid || errorfullName ? true : false}
          placeholder={'닉네임을 입력해주세요.'}
          onChange={handleChange}
          value={values.fullName || ''}
        ></Input>
        {errorfullName ? (
          <ErrorText>{errorfullName}</ErrorText>
        ) : errors.fullName ? (
          <ErrorText>{errors.fullName}</ErrorText>
        ) : (
          <ErrorText style={{ color: theme.color.fontNormal }}>
            * 특수문자를 제외하고 6자 이내로 입력해 주세요.
          </ErrorText>
        )}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="password"
          type="password"
          height={'70'}
          label={''}
          fontSize={18}
          inValid={currentPasswordInvalid || errorPassword ? true : false}
          placeholder={'비밀번호를 입력해 주세요.'}
          onChange={handleChange}
          value={values.password}
        ></Input>
        {errorPassword ? (
          <ErrorText>{errorPassword}</ErrorText>
        ) : errors.password ? (
          <ErrorText>{errors.password}</ErrorText>
        ) : (
          <ErrorText style={{ color: theme.color.fontNormal }}>
            * 8-10자 사이로 입력해 주세요.
          </ErrorText>
        )}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="passwordCheck"
          type="password"
          height={'70'}
          label={''}
          fontSize={18}
          inValid={currentPasswordCheckInvalid}
          placeholder={'비밀번호를 한번 더 입력해 주세요.'}
          onChange={handleChange}
        ></Input>
        {errors.passwordCheck ? (
          <ErrorText>{errors.passwordCheck}</ErrorText>
        ) : (
          <div style={{ height: '17px' }}></div>
        )}
      </InputWrapper>
      <ButtonWrapper>
        <StyledButton
          type="submit"
          height={70}
          backgroundColor={theme.color.mainGreen}
          borderColor={'none'}
          color={'white'}
        >
          <StyledText fontSize={20}>회원가입</StyledText>
        </StyledButton>
      </ButtonWrapper>
      <Link to="/login">
        <Text fontSize={18} color={theme.color.fontNormal}>
          이미 계정이 있으신가요?{'  '}
        </Text>
        <StyledText fontSize={18} strong color={theme.color.mainGreen}>
          로그인
        </StyledText>
      </Link>
    </StyledForm>
  );
};

export default SignupForm;

SignupForm.propTypes = {
  onSubmit: PropTypes.func,
  inValidEmail: PropTypes.bool,
  inValidPassword: PropTypes.bool,
  inValidFullName: PropTypes.bool,
  inValidPasswordCheck: PropTypes.bool,
};
