import styled from '@emotion/styled';
import Text from 'components/basic/Text';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Input from 'components/basic/Input';
import theme from 'styles/theme';
import useDebounce from 'hooks/useDebounce';

const MyInfoEditPage = () => {
  const { onChangePassword } = useUserContext();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [confirmInvalid, setConfirmInvalid] = useState(false);
  const [errors, setErrors] = useState({});

  const regex = /\S{4,7}/;

  const validate = useDebounce(
    () => {
      const newErrors = {};
      if (password && !regex.test(password)) {
        newErrors.password = '! 4-10자 사이로 공백없이 입력해주세요';
        setPasswordInvalid(true);
      }
      if (password.length > 10) {
        newErrors.password = '! 4-10자 사이로 공백없이 입력해주세요';
        setPasswordInvalid(true);
      }
      if (confirm && password !== confirm) {
        newErrors.confirm = '! 비밀번호와 일치하지 않습니다.';
        setConfirmInvalid(true);
      }
      setErrors(newErrors);
      !newErrors.password && setPasswordInvalid(false);
      !newErrors.confirm && setConfirmInvalid(false);
    },
    200,
    [password, confirm],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordInvalid && !confirmInvalid) {
      console.log('ehoT');
      onChangePassword(password);
      navigate(-1);
    }
  };
  return (
    <PageWrapper header prev complete onComplete={handleSubmit}>
      <UserContainter>
        <UserInfo>
          <Text
            style={{
              marginTop: 5,
              marginLeft: 20,
              textAlign: 'left',
              fontWeight: 700,
            }}
            fontSize={26}
            block={true}
          >
            비밀번호를 설정해주세요
          </Text>
          <UserEditForm onSubmit={handleSubmit}>
            <Input
              label="변경할 비밀번호"
              style={{ marginTop: 5 }}
              type="password"
              name="password"
              inValid={passwordInvalid}
              onChange={(e) => {
                setPassword(e.target.value);
                validate();
              }}
            ></Input>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
            <Input
              label="비밀번호 확인"
              style={{ marginTop: 20 }}
              type="password"
              name="confirm"
              inValid={confirmInvalid}
              onChange={(e) => {
                setConfirm(e.target.value);
                validate();
              }}
            ></Input>
            {errors.confirm && <ErrorText>{errors.confirm}</ErrorText>}
          </UserEditForm>
        </UserInfo>
      </UserContainter>
    </PageWrapper>
  );
};

export default MyInfoEditPage;

const UserContainter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`;

const UserInfo = styled.div`
  text-align: center;
  margin: 50px auto 0 auto;
  position: relative;
`;

const UserEditForm = styled.form`
  margin: 10px 5px 0 5px;
  padding: 22px 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0 0 0;
  padding-bottom: 90px;
`;

const ErrorText = styled.span`
  text-align: left;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: ${theme.color.mainRed};
`;
