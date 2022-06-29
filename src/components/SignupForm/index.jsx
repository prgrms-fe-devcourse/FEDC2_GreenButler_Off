import { Input, Button, Text } from 'components';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import theme from 'styles/theme';
import PropTypes from 'prop-types';
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
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: ${theme.color.mainRed};
`;

const emailValid = (email) => {
  const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return reg.test(email);
};

const SignupForm = ({ onSubmit }) => {
  const {
    values,
    handleChange,
    handleSubmit,
    errorPassword,
    errorfullName,
    handleBlur,
    errorEmail,
    errorPasswordCheck,
  } = useValidInputs({
    initialValues: {
      email: '',
      password: '',
      fullame: '',
      passwordCheck: '',
    },
    onSubmit,
    validate: ({ email, password, fullName, passwordCheck }) => {
      const newErrors = {};

      if (!email) {
        newErrors.email = '* 이메일을 입력해 주세요.';
      } else if (!emailValid(email)) {
        newErrors.email = '* 이메일 형식이 아닙니다.';
      }
      if (!fullName) {
        newErrors.fullName = '* 닉네임을 입력해 주세요.';
      }
      if (!password || password.length < 8) {
        newErrors.password = '* 8-10자 사이로 입력해 주세요.';
      }
      if (!passwordCheck || passwordCheck.length < 8) {
        newErrors.passwordCheck = '* 8-10자 사이로 입력해 주세요.';
      } else if (password !== passwordCheck) {
        newErrors.passwordCheck = '* 비밀번호가 일치하지 않습니다.';
      }

      return newErrors;
    },
    max: 10,
  });
  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          name="email"
          height={'70'}
          label={''}
          fontSize={18}
          inValid={errorEmail ? true : false}
          placeholder={'이메일을 입력해 주세요.'}
          onChange={handleChange}
          value={values.email}
          onBlur={handleBlur}
        ></Input>
        {errorEmail ? <ErrorText>{errorEmail}</ErrorText> : <div style={{ height: '23px' }}></div>}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="fullName"
          height={'70'}
          label={''}
          fontSize={18}
          inValid={errorfullName ? true : false}
          placeholder={'닉네임을 입력해주세요.'}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fullName}
        ></Input>
        {errorfullName ? (
          <ErrorText>{errorfullName}</ErrorText>
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
          inValid={errorPassword ? true : false}
          placeholder={'비밀번호를 입력해 주세요.'}
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
        ></Input>
        {errorPassword ? (
          <ErrorText>{errorPassword}</ErrorText>
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
          inValid={errorPasswordCheck ? true : false}
          placeholder={'비밀번호를 한 번 더 입력해 주세요.'}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordCheck}
        ></Input>
        {errorPasswordCheck ? (
          <ErrorText>{errorPasswordCheck}</ErrorText>
        ) : (
          <div style={{ height: '23px' }}></div>
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
