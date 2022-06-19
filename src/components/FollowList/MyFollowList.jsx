import { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Button from 'components/basic/Button';
import Modal from 'components/Modal';
import Text from 'components/basic/Text';
import { IMAGE_URLS } from 'utils/constants/images';
import PropTypes from 'prop-types';
import { useUserContext } from 'contexts/UserContext';
import theme from 'styles/theme';

const FOLLOWING = 'following';
const FOLLOWER = 'follower';
const UNFOLLOW = 'unfollow';
const FOLLOW = 'follow';

//TODO: follows 데이터 구조
// const followData = [{ followId: '', userData: {}, followData: {}}]; // 팔로잉 기준 전부 isFollow true

const FollowList = ({ followList, tab }) => {
  const { currentUser, onFollow, onUnfollow } = useUserContext();
  const [isModal, setIsModal] = useState(false);

  const onClose = () => {
    setIsModal(false);
  };

  useEffect(() => {
    console.log('FOLLOWLIST', followList);
  }, []);

  const hadleToggleFollow = useCallback(
    (followId, type, userId = '') => {
      if (type === UNFOLLOW) {
        onUnfollow({ unfollowId: followId });
      } else {
        if (!currentUser.following.some((follow) => follow._id === followId)) {
          onFollow({ userId, followId });
        } else {
          setIsModal(true);
        }
      }
    },
    [currentUser],
  );

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
              {tab === FOLLOWING && (
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
              )}
              {tab === FOLLOWER && (
                <Button
                  width={100}
                  height={30}
                  borderRadius={10}
                  fontSize="16px"
                  style={{ ...followButtonStyle }}
                  onClick={() => {
                    hadleToggleFollow(followId, FOLLOW, followData.follower);
                  }}
                >
                  팔로우
                </Button>
              )}

              {isModal && (
                <Modal visible={isModal} onClose={onClose}>
                  <Modal.Content
                    title="팔로우 실패!"
                    description="이미 팔로우하고 있는 사용자에요"
                    onClose={onClose}
                  />
                  <Modal.Button onClick={onClose}>확인</Modal.Button>
                </Modal>
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
  borderColor: theme.color.borderNormal,
  backgroundColor: theme.color.backgroundLight,
  border: `1px solid `,
  flexShrink: 0,
};
