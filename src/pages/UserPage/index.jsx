import { useEffect, useState, useCallback } from 'react';
import theme from 'styles/theme';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Button from 'components/basic/Button';
import Icon from 'components/basic/Icon';
import Modal from 'components/Modal';
import Tab from 'components/basic/Tab';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';
import { initialUserData } from 'contexts/UserContext/reducer';
import { getUser } from 'utils/apis/userApi';
import { getUserPosts, getPostData } from 'utils/apis/postApi';
import PostImageContainer from 'components/PostImageContainer';
import { useNavigate } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';
import { IMAGE_URLS } from 'utils/constants/images';
import { GRID, HEART } from 'utils/constants/icons/names';
import {
  followButtonStyle,
  followingButtonStyle,
  fullNameStyle,
  UserContainter,
  UserInfo,
  UserDetailWrapper,
  UserDetail,
} from './style';

const USER_POSTS = 'userPosts';
const LIKE_POSTS = 'likePosts';

const UserPage = () => {
  const navigate = useNavigate();
  const { currentUser, onFollow, onUnfollow } = useUserContext();
  const { id } = useParams();
  const [pageUserId, setPageUserId] = useState(id);
  const checkFollow = currentUser.following.some((follow) => follow.user === pageUserId);
  const [user, setUser] = useState(initialUserData.currentUser);
  const [userPosts, setUserPosts] = useState([]);
  const [userLikePosts, setUserLikePosts] = useState([]);
  const [isFollow, setIsFollow] = useState(checkFollow);
  const [isFollowModal, setIsFollowModal] = useState(false);
  const [isUnFollowModal, setIsUnFollowModal] = useState(false);
  const [isFollowFailModal, setIsFollowFailModal] = useState(false);

  const onCloseFollow = () => {
    setIsFollowModal(false);
  };

  const onCloseUnFollow = () => {
    setIsUnFollowModal(false);
  };

  const [currentTab, setCurrentTab] = useState(USER_POSTS);
  const onActive = (value) => {
    setCurrentTab(value);
  };

  const hadleFollow = useCallback(() => {
    if (!isFollow) {
      onFollow({ userId: pageUserId, followId: '' });
      setIsFollowModal(true);
      setIsFollow(true);
    } else {
      setIsFollowFailModal(true);
    }
    setIsFollow(true);
  }, [pageUserId, currentUser]);

  const hadleUnFollow = useCallback(() => {
    const followData = currentUser.following.filter((follow) => follow.user === pageUserId);

    if (followData.length !== 0) {
      onUnfollow({ unfollowId: followData[0]._id });
      setIsFollow(false);
    }
    setIsUnFollowModal(false);
  }, [pageUserId, currentUser, onUnfollow]);

  useEffect(() => {
    handleGetUser();
    console.log('현재 팔로잉', currentUser.following);
  }, [currentUser, pageUserId, isFollow]);

  useEffect(() => {
    handleGetLikePosts();
    handleGetUserPosts();
  }, [user]);

  //TODO:신영 추후 핸들러 분리
  const handleGetUser = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUser(pageUserId);
      setUser(data);
      console.log('USER_DATA', data);
    }
  }, [pageUserId]);

  const handleGetUserPosts = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUserPosts(pageUserId);
      setUserPosts(data);
    }
  }, [pageUserId]);

  //TODO:신영 관리자 좋아요 post 두번된게 있네? 같은 post를 여러번 좋아요할 수 있구나 이거 나중에 더미 삭제
  const handleGetLikePosts = useCallback(async () => {
    const { likes } = user;
    if (likes.length !== 0) {
      const data = await Promise.all(
        likes.map((like) => getPostData(like.post).then((result) => result.data)),
      );
      setUserLikePosts(data);
    }
  }, [user]);

  return (
    <PageWrapper header prev nav>
      <UserContainter>
        <UserInfo>
          <Avatar
            size={136}
            style={{
              cursor: 'pointer',
            }}
            src={user.image || IMAGE_URLS.PROFILE_IMG}
            onClick={() => currentUser.id === pageUserId && navigate('/user/MyInfo')}
          />
          <Text style={fullNameStyle}>{user.fullName}</Text>
          {/* //TODO:신영 추후 컴포넌트 분리 */}

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
              <Text fontSize={18}> {user.followers.length}</Text>
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
        </UserInfo>
        {/* //TODO:신영 추후 Tab 아이콘 넣는 방식으로 교체 */}
        <Tab onActive={onActive}>
          <Tab.Item
            icon={{
              active: <Icon name={GRID} size={18} />,
              inactive: <Icon name={GRID} size={18} />,
            }}
            index={USER_POSTS}
          >
            <PostImageContainer posts={userPosts} />
          </Tab.Item>
          <Tab.Item
            icon={{
              active: <Icon name={HEART} size={18} />,
              inactive: <Icon name={HEART} size={18} />,
            }}
            index={LIKE_POSTS}
          >
            <PostImageContainer posts={userLikePosts} />
          </Tab.Item>
        </Tab>
      </UserContainter>

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
    </PageWrapper>
  );
};

export default UserPage;
