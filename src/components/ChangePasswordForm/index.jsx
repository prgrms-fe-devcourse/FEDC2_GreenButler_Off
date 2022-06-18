import Input from 'components/basic/Input';
import styled from '@emotion/styled';
import { useState } from 'react';
import theme from 'styles/theme';
import useDebounce from 'hooks/useDebounce';

const ChangePasswordForm = ({ onSubmit }) => {
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
    300,
    [password, confirm],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordInvalid && !confirmInvalid) {
      onSubmit(password);
    }
  };

  return (
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
  );
};

export default ChangePasswordForm;

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
