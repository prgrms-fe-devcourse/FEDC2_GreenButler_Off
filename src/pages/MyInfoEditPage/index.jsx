import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Text from 'components/basic/Text';
import { me } from 'dummy';
import theme from 'styles/theme';
import Input from 'components/basic/Input';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';

const MyInfoEditPage = () => {
  //const { currentUser,onChangePassword } = useUserContext();
  const { onChangePassword } = useUserContext();
  const currentUser = me;
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [inValid, setInValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setInValid(true);
      return;
    }
    setInValid(false);
    onChangePassword(password);
  };

  return (
    <PageWrapper>
      <UserContainter>
        <Header />
        <UserInfo>
          <Text
            style={{
              marginTop: 5,
              marginLeft: 20,
              fontSize: 26,
              textAlign: 'left',
              fontWeight: 700,
            }}
            block={true}
          >
            비밀번호를 설정해주세요
          </Text>
          <UserEditForm onSubmit={handleSubmit}>
            <Input
              label="변경할 비밀번호"
              style={{ marginTop: 20 }}
              type="password"
              inValid={inValid}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Input
              label="비밀번호 확인"
              style={{ marginTop: 20 }}
              type="password"
              inValid={inValid}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            ></Input>
            <button type="submit"></button>
          </UserEditForm>
        </UserInfo>
        <Bottom />
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

const Header = styled.div`
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.color.borderNormal};
  background-color: white;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  height: 90px;
  width: 100%;
  border-top: 1px solid ${theme.color.borderNormal};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  text-align: center;
  margin: 120px auto 0 auto;
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
