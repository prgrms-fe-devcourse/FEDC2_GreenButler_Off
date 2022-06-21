import { useState, useCallback } from 'react';
import Text from 'components/basic/Text';
import { useUserContext } from 'contexts/UserContext';
import theme from 'styles/theme';
import Avatar from 'components/basic/Avatar';
import Button from 'components/basic/Button';
import Image from 'components/basic/Image';
import { IMAGE_URLS } from 'utils/constants/images';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

import {
  followButtonStyle,
  followingButtonStyle,
  fullNameStyle,
  UserInfo,
  UserDetailWrapper,
  UserDetail,
  NickName,
} from './style';

const UserData = ({ user, pageUserId, userLevel }) => {
  const { currentUser, onFollow, onUnfollow } = useUserContext();
  const checkFollow = currentUser.following.some((follow) => follow.user === pageUserId);
  const [isFollow, setIsFollow] = useState(checkFollow);
  const [isFollowModal, setIsFollowModal] = useState(false);
  const [isUnFollowModal, setIsUnFollowModal] = useState(false);
  const [followers, setFollowers] = useState(user.followers.length);

  const navigate = useNavigate();

  const onCloseFollow = () => {
    setIsFollowModal(false);
  };

  const onCloseUnFollow = () => {
    setIsUnFollowModal(false);
  };

  const hadleFollow = useCallback(() => {
    if (!isFollow) {
      onFollow({ userId: pageUserId, followId: '' });
      setIsFollowModal(true);
      setIsFollow(true);
      setFollowers(followers + 1);
    }
    setIsFollow(true);
  }, [pageUserId, isFollow, onFollow, followers]);

  const hadleUnFollow = useCallback(() => {
    const followData = currentUser.following.filter((follow) => follow.user === pageUserId);

    if (followData.length !== 0) {
      onUnfollow({ unfollowId: followData[0]._id });
      setIsFollow(false);
      setFollowers(followers - 1);
    }
    setIsUnFollowModal(false);
  }, [pageUserId, currentUser, onUnfollow, followers]);

  return (
    <UserInfo>
      <Avatar
        size={136}
        style={{
          cursor: 'pointer',
        }}
        src={user.image || IMAGE_URLS.PROFILE_IMG}
        onClick={() => currentUser.id === pageUserId && navigate('/user/MyInfo')}
      />
      <NickName>
        <Image src={userLevel.image} width={24} block={true} />
        <Text style={fullNameStyle}>{user.fullName}</Text>
      </NickName>
      <UserDetailWrapper>
        <UserDetail>
          <Text fontSize={16} color={theme.color.fontNormal}>
            게시물
          </Text>
          <Text fontSize={18}> {user.posts.length}</Text>
        </UserDetail>
        <UserDetail onClick={() => navigate(`/user/follow/${pageUserId}`)}>
          <Text fontSize={16} color={theme.color.fontNormal}>
            팔로워
          </Text>
          <Text fontSize={18}> {followers}</Text>
        </UserDetail>
        <UserDetail onClick={() => navigate(`/user/follow/${pageUserId}`)}>
          <Text fontSize={16} color={theme.color.fontNormal}>
            팔로잉
          </Text>
          <Text fontSize={18}> {user.following.length}</Text>
        </UserDetail>
      </UserDetailWrapper>

      {currentUser.id !== pageUserId && isFollow && (
        <Button
          width={100}
          height={30}
          borderRadius={10}
          fontSize="16px"
          style={{ ...followingButtonStyle }}
          onClick={() => setIsUnFollowModal(true)}
          borderColor={theme.color.borderNormal}
          borderWidth={1}
        >
          팔로잉
        </Button>
      )}
      {currentUser.id !== pageUserId && !isFollow && (
        <Button
          width={100}
          height={30}
          borderRadius={10}
          fontSize="16px"
          style={{ ...followButtonStyle }}
          onClick={hadleFollow}
        >
          팔로우
        </Button>
      )}

      <Modal visible={isFollowModal} onClose={onCloseFollow}>
        <Modal.Content
          title="팔로우 성공!"
          description="성공적으로 팔로잉 했어요"
          onClose={onCloseFollow}
        />
        <Modal.Button onClick={onCloseFollow}>확인</Modal.Button>
      </Modal>

      <Modal visible={isUnFollowModal} onClose={onCloseUnFollow}>
        <Modal.Content
          title="언팔하시겠어요?"
          description="언팔하시면 팔로잉 목록에서 사용자가 사라져요"
          onClose={onCloseUnFollow}
        />
        <Modal.Button
          onClick={() => {
            hadleUnFollow();
          }}
        >
          확인
        </Modal.Button>
        <Modal.Button
          onClick={onCloseUnFollow}
          backgroundColor={theme.color.backgroundNormal}
          color="#000"
        >
          취소
        </Modal.Button>
      </Modal>
    </UserInfo>
  );
};

export default UserData;

UserData.propTypes = {
  user: PropTypes.object,
  pageUserId: PropTypes.string,
};
