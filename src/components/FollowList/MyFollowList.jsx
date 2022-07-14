import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Avatar, Button, Modal, Text } from 'components';
import { IMAGE_URLS } from 'utils/constants/images';
import PropTypes from 'prop-types';
import { useUserContext } from 'contexts/UserContext';
import theme from 'styles/theme';

const FOLLOWING = 'following';
const FOLLOWER = 'follower';

//TODO: follows 데이터 구조
// const followData = [{ followId: '', userData: {}, followData: {}}]; // 팔로잉 기준 전부 isFollow true

const FollowList = ({ followList, tab, handleFollowChange }) => {
  const { currentUser, onFollow, onUnfollow } = useUserContext();
  const [isModal, setIsModal] = useState(false);
  const [unfollowId, setUnfollowId] = useState('');
  const [isFollowChange, setIsFollowChange] = useState(false);

  const onClose = () => {
    setIsModal(false);
  };

  const handleFollow = useCallback(
    (followId, userId) => {
      if (!currentUser.following.some((follow) => follow.user === userId)) {
        onFollow({ userId, followId });
        setIsFollowChange(true);
        handleFollowChange(true);
      } else {
        setIsFollowChange(false);
      }
      setIsModal(true);
    },
    [currentUser, onFollow, handleFollowChange],
  );

  const handleUnFollow = useCallback(() => {
    onUnfollow({ unfollowId });
    setIsModal(false);
    handleFollowChange(true);
  }, [unfollowId, onUnfollow, handleFollowChange]);

  return (
    //TODO: user._id:
    <>
      {followList &&
        followList.map(({ followId, userData, followData }) => {
          return (
            <ProfileContainer key={followId}>
              <Link to={`/user/${userData._id}`}>
                <Profile>
                  <Avatar size={60} src={userData.image || IMAGE_URLS.PROFILE_IMG} />
                  <Text style={{ marginLeft: 20 }} fontWeight={500} fontSize={18} block>
                    {userData.fullName}
                  </Text>
                </Profile>
              </Link>
              {tab === FOLLOWING && (
                <Button
                  width={100}
                  height={30}
                  borderRadius={10}
                  fontSize="16px"
                  borderColor={theme.color.borderNormal}
                  backgroundColor={theme.color.mainWhite}
                  color={theme.color.fontNormal}
                  style={{ ...followingButtonStyle }}
                  onClick={() => {
                    setUnfollowId(followId);
                    setIsModal(true);
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
                    handleFollow(followId, followData.follower);
                  }}
                >
                  팔로우
                </Button>
              )}
            </ProfileContainer>
          );
        })}{' '}
      {tab === FOLLOWER && !isFollowChange && isModal && (
        <Modal visible={isModal} onClose={onClose}>
          <Modal.Content
            title="팔로우 실패했어요!"
            description="이미 팔로우하고 있는 사용자입니다."
            onClose={onClose}
          />
          <Modal.Button onClick={onClose}>확인</Modal.Button>
        </Modal>
      )}
      {tab === FOLLOWER && isFollowChange && isModal && (
        <Modal visible={isModal} onClose={onClose}>
          <Modal.Content title="팔로우에 성공했어요!" onClose={onClose} />
          <Modal.Button onClick={onClose}>확인</Modal.Button>
        </Modal>
      )}
      {tab === FOLLOWING && isModal && (
        <Modal visible={isModal} onClose={onClose}>
          <Modal.Content
            title="언팔하시겠어요?"
            description="언팔하시면 팔로잉 목록에서 사용자가 사라집니다."
            onClose={onClose}
          />
          <Modal.Button
            onClick={() => {
              handleUnFollow();
            }}
          >
            확인
          </Modal.Button>
          <Modal.Button
            onClick={onClose}
            backgroundColor={theme.color.backgroundNormal}
            color="#000"
          >
            취소
          </Modal.Button>
        </Modal>
      )}
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
