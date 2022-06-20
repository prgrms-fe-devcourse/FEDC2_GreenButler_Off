import styled from '@emotion/styled';
import PageWrapper from 'components/basic/pageWrapper';
import UserDetails from './UserDetails';
import UserProfile from './UserProfile';

const MyInfoPage = () => {
  return (
    <PageWrapper header prev title="내정보">
      <UserContainter>
        <UserProfile />
        <UserDetails />
      </UserContainter>
    </PageWrapper>
  );
};

export default MyInfoPage;

const UserContainter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`;
