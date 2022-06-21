import styled from '@emotion/styled';
import PageWrapper from 'components/basic/pageWrapper';
import UserDetails from './UserDetails';
import UserProfile from './UserProfile';
import UserLevel from './UserLevel';

const MyInfoPage = () => {
  return (
    <PageWrapper header prev title="내정보">
      <UserContainer>
        <UserProfile />
        <UserLevel />
        <UserDetails />
      </UserContainer>
    </PageWrapper>
  );
};

export default MyInfoPage;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`;
