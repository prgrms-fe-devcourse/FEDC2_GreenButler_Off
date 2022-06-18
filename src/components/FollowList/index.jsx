import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import { IMAGE_URLS } from 'utils/constants/images';
import PropTypes from 'prop-types';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
`;

//TODO: follows 데이터 구조
// const followData = [{ followId: '', userData: {}, followData: {}}]; // 팔로잉 기준 전부 isFollow true

const FollowList = ({ followList }) => {
  return (
    //TODO: user._id:
    <>
      {followList &&
        followList.map(({ followId, userData }) => {
          return (
            <ProfileContainer key={followId}>
              <Profile>
                <Avatar size={60} src={userData.image || IMAGE_URLS.PROFILE_IMG} />
                <Text style={{ marginLeft: 20 }} fontSize={18} block>
                  {userData.fullName}
                </Text>
              </Profile>
            </ProfileContainer>
          );
        })}
    </>
  );
};

FollowList.propTypes = {
  followList: PropTypes.array,
};

export default FollowList;
