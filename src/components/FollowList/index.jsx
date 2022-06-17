import { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Button from 'components/basic/Button';
import Text from 'components/basic/Text';
import { IMAGE_URLS } from 'utils/constants/images';
import PropTypes from 'prop-types';
import { useUserContext } from 'contexts/UserContext';
import theme from 'styles/theme';

const FOLLOWING = 'following';
const UNFOLLOW = 'unfollow';
const FOLLOW = 'follow';

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

const followButtonStyle = {
  color: 'white',
  backgroundColor: theme.color.mainGreen,
  flexShrink: 0,
};

const followingButtonStyle = {
  color: theme.color.borderNormal,
  borderWidth: '1px',
  borderColor: theme.color.mainWhite,
  backgroundColor: theme.color.backgroundLight,
  border: '1px solid',
  flexShrink: 0,
};

//TODO: follows 데이터 구조
// const followData = [{ followId: '', userData: {}}]; // 팔로잉 기준 전부 isFollow true

const FollowList = ({ followList, tab }) => {
  const { currentUser, onFollow, onUnfollow } = useUserContext();
  const { follwing, followers } = currentUser;
  console.log(followList, 'followList');

  const hadleToggleFollow = useCallback((followId, type, userId = '') => {
    if (type === UNFOLLOW) {
      onUnfollow({ unfollowId: followId });
    } else {
      onFollow({ userId, followId });
    }
  }, []);

  useEffect(() => {
    console.log('CURRENT_FOLLOWER', currentUser.followers);
    console.log('CURRENT_FOLLOWING', currentUser.following);
  }, [currentUser]);

  return (
    //TODO: user._id:
    <>
      {followList &&
        followList.map(({ followId, userData, followData }) => {
          return (
            <ProfileContainer key={followId}>
              <Profile>
                <Avatar size={60} src={userData.image || IMAGE_URLS.PROFILE_IMG} />
                <Text style={{ marginLeft: 20 }} fontSize={18} block>
                  {userData.fullName}
                </Text>
              </Profile>
              {currentUser.id === followData.follow || tab === FOLLOWING ? (
                <Button
                  width={100}
                  height={30}
                  borderRadius={10}
                  fontSize="16px"
                  style={{ ...followingButtonStyle }}
                  onClick={(e) => {
                    hadleToggleFollow(followId, UNFOLLOW);
                  }}
                >
                  팔로잉
                </Button>
              ) : (
                <Button
                  width={100}
                  height={30}
                  borderRadius={10}
                  fontSize="16px"
                  style={{ ...followButtonStyle }}
                  onClick={() => {
                    hadleToggleFollow(followId, FOLLOW, followData.user);
                  }}
                >
                  팔로우
                </Button>
              )}
            </ProfileContainer>
          );
        })}
    </>
  );
};

FollowList.propTypes = {
  followList: PropTypes.array,
  tab: PropTypes.string,
};

export default FollowList;
