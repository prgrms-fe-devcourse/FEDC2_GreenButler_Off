import { useEffect, useState, useCallback } from 'react';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Button from 'components/basic/Button';
import Icon from 'components/basic/Icon';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';
import { initialUserData } from 'contexts/UserContext/reducer';
import { getUser, Follow, unFollow } from 'utils/apis/userApi';
import { getUserPosts, getPostData } from 'utils/apis/postApi';
import PostImageContainer from 'components/PostImageContainer';
import { useNavigate } from 'react-router-dom';
import {
  followButtonStyle,
  followingButtonStyle,
  fullNameStyle,
  smallTextStyle,
  UserContainter,
  Header,
  UserInfo,
  UserDetailWrapper,
  UserDetail,
  Tab,
  Bottom,
} from './style';
import { currentUser } from 'dummy';

const UserPage = () => {
  const navigate = useNavigate();
  //const { currentUser, onFollow, onUnfollow } = useUserContext(); //TODO: 추후 팔로우, 팔로잉 페이지 제작시 사용
  const { id } = useParams();
  const pageUserId = id;
  const [user, setUser] = useState(initialUserData.currentUser);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [uesrLikePosts, setUserLikePosts] = useState([]);

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    handleGetLikePosts();
    handleGetUserPosts();
    handleFollowButton();
  }, [user]);

  //TODO : 추후 핸들러 분리
  const handleGetUser = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUser(pageUserId);
      setUser(data);
    }
  }, [pageUserId]);

  const isFollwing = currentUser.following.some((id) => id === pageUserId);
  const [isFollow, setIsFollow] = useState(isFollwing);

  const handleGetUserPosts = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUserPosts(pageUserId);
      setUserPosts(data);
      setPosts(data);
    }
  }, []);

  //TODO: 관리자 좋아요 post 두번된게 있네? 같은 post를 여러번 좋아요할 수 있구나 이거 나중에 더미 삭제
  const handleGetLikePosts = useCallback(async () => {
    const { likes } = user;
    if (likes.length !== 0) {
      const data = await Promise.all(
        likes.map((like) => getPostData(like.post).then((result) => result.data)),
      );
      setUserLikePosts(data);
    }
  }, [user]);

  //TODO: 추후 팔로우, 팔로잉 페이지 만들 때 최종 완성
  const handleFollowButton = useCallback(() => {
    setIsFollow((isFollow) => !isFollow);
    /*     if (isFollow) {
      onFollow({ userId: currentUser.id, followId: pageUserId });
    } else {
      onUnfollow({ unfollowId: pageUserId });
    } */
  }, []);

  return (
    <UserContainter>
      <Header />
      <UserInfo>
        <Avatar
          size={136}
          style={{
            cursor: 'pointer',
          }}
          src={
            user.image ||
            'https://user-images.githubusercontent.com/79133602/173309944-eb758bba-9df4-4b11-a580-b62324c22ef6.png'
          }
        />
        <Text style={fullNameStyle}>{user.fullName}</Text>
        <UserDetailWrapper>
          <UserDetail>
            <Text style={{ ...smallTextStyle }} onClick={() => setPosts(userPosts)}>
              {' '}
              게시물
            </Text>
            <Text fontSize={18}> {user.posts.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }} onClick={() => navigate('/user/follow')}>
              팔로워
            </Text>
            <Text fontSize={18}> {user.followers.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }} onClick={() => navigate('/user/follow')}>
              {' '}
              팔로잉
            </Text>
            <Text fontSize={18}> {user.following.length}</Text>
          </UserDetail>
        </UserDetailWrapper>
        <Button
          width="100%"
          style={isFollow ? { ...followingButtonStyle } : { ...followButtonStyle }}
          onClick={handleFollowButton}
        >
          {isFollow ? '팔로잉' : '팔로우'}
        </Button>
      </UserInfo>
      {/* //TODO: 추후 Tab 아이콘 넣는 방식으로 교체 */}
      <Tab>
        <button onClick={() => setPosts(userPosts)}>
          <Icon name="LIKE_ICON" size={18} />
        </button>
        <button onClick={() => setPosts(uesrLikePosts)}>
          <Icon name="LIKE_ICON" size={18} />
        </button>
      </Tab>
      <PostImageContainer posts={posts} />
      <Bottom />
    </UserContainter>
  );
};

export default UserPage;
