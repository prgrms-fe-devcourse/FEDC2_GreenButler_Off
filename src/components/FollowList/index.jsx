import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Button from 'components/basic/Button';
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
// const follows = [{ followId: '', user: {}, follow: {}, isFollow: true }]; // 팔로잉 기준 전부 isFollow true

const FollowList = ({ follows }) => {
  console.log(follows, 'follows');
  return (
    //TODO: user._id:
    <>
      {follows &&
        follows.map(({ followId, user, follow, isFollow }) => {
          return (
            <ProfileContainer key={followId}>
              <Profile>
                <Avatar size={60} src={user.image || IMAGE_URLS.PROFILE_IMG} />
                <Text style={{ marginLeft: 20 }} fontSize={18} block>
                  {user.fullName}
                </Text>
              </Profile>
              <Button
                width={100}
                height={30}
                borderRadius={10}
                fontSize="16px"
                style={{ flexShrink: 0 }}
              >
                팔로우
              </Button>
            </ProfileContainer>
          );
        })}
    </>
  );
};

FollowList.propTypes = {
  follows: PropTypes.array,
};

export default FollowList;
