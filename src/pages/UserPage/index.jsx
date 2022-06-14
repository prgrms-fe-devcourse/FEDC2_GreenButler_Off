import { useEffect, useState, useCallback } from 'react';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Button from 'components/basic/Button';
import { me, other, dummyPosts, users } from 'dummy';
import theme from 'styles/theme';
import Icon from 'components/basic/Icon';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';
import { initialUserData } from 'contexts/UserContext/reducer';
import { getUser, Follow, unFollow } from 'utils/apis/userApi';
import { getUserPosts, getPostData } from 'utils/apis/postApi';
import ImageContainer from './ImageContainer';
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

const UserPage = () => {
  const navigate = useNavigate();
  //const user = other;
  const currentUser = me;
  const pageUserId = '62a0ab92703fdd3a82b4e73f';

  const { onFollow, onUnfollow } = useUserContext();
  //const { currentUser, onFollow, onUnfollow  } = useUserContext();
  //const pageUserId = useParams();

  const [user, setUser] = useState(initialUserData.currentUser);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [uesrLikePosts, setUserLikePosts] = useState([]);

  useEffect(() => {
    handleGetUser();
    handleGetUserPosts();
    handleGetLikePosts();
  }, []);

  const handleGetUser = useCallback(async () => {
    const { data } = await getUser('62a0ab92703fdd3a82b4e73f');
    //const { data } = await getUser(pageUserId);
    setUser(data);
  }, []);

  const likePostIds = currentUser.likes;
  const isFollwing = currentUser.following.some((id) => id === pageUserId);
  const [isFollow, setIsFollow] = useState(isFollwing);

  const handleGetUserPosts = useCallback(async () => {
    const { data } = await getUserPosts('62a0ab92703fdd3a82b4e73f');
    //const { data } = await getUserPosts(pageUserId);
    setUserPosts(data);
    setPosts(data);
  }, []);

  const handleGetLikePosts = useCallback(async () => {
    const data = await Promise.all(
      likePostIds.map((likePostId) => getPostData(likePostId).then((result) => result.data)),
    );
    setUserLikePosts(data);
  }, []);

  const handleFollowButton = useCallback(() => {
    setIsFollow((isFollow) => !isFollow);
    if (isFollow) {
      onFollow({ userId: currentUser._id, followId: pageUserId });
    } else {
      onUnfollow({ unfollowId: pageUserId });
    }
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

      {/*  추후 Tab 컴포넌트 교체       
      <Tab>
        <Tab.Item onClick={() => console.log('3')}>
          <Icon
            name="LIKE_ICON"
            size={18}
            onClick={() => setPosts(userPosts)}
          />
        </Tab.Item>
        <Tab.Item onClick={() => console.log('3')}>
          <Icon
            name="LIKE_ICON"
            size={18}
            onClick={() => setPosts(userPosts)}
          />
        </Tab.Item>
      </Tab>      
      */}

      <Tab>
        <Icon name="LIKE_ICON" size={18} onClick={() => setPosts(userPosts)} />
        <Icon name="LIKE_ICON" size={18} onClick={() => setPosts(uesrLikePosts)} />
      </Tab>
      <ImageContainer posts={posts} />
      <Bottom />
    </UserContainter>
  );
};

export default UserPage;
