import styled from '@emotion/styled';
import Text from 'components/basic/Text';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';
import { useNavigate } from 'react-router-dom';
import ChangePasswordForm from 'components/ChangePasswordForm';

const MyInfoEditPage = () => {
  const { onChangePassword } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (password) => {
    onChangePassword(password);
    //TODO:신영 모달창을 띄우고 비밀번호가 변경됐습니다. 이후 내정보로 이동할지?
    navigate(-1);
  };

  return (
    <PageWrapper>
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
          <ChangePasswordForm onSubmit={handleSubmit} />
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
  margin: 120px auto 0 auto;
  position: relative;
`;
