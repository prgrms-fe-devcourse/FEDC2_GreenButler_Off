import { useEffect, useState, useCallback } from 'react';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import { dummyPosts, me } from 'dummy';
import { useUserContext } from 'contexts/UserContext';
import { getUserPosts } from 'utils/apis/postApi';
import ImageContainer from './ImageContainer';
import { useNavigate } from 'react-router-dom';
import {
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
const MyPage = () => {
  const navigate = useNavigate();
  //const { currentUser } = useUserContext();
  const currentUser = me;
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [uesrLikePosts, setUserLikePosts] = useState(dummyPosts);

  const handleGetUserPosts = useCallback(async () => {
    const { data } = await getUserPosts('629e29bd6d18b41c5b238ba2');
    setUserPosts(data);
    setPosts(data);
  }, []);

  useEffect(() => {
    handleGetUserPosts();
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
            currentUser.image ||
            `https://user-images.githubusercontent.com/79133602/173279398-ac52268b-082f-4fd2-8748-b60dad85b069.png`
          }
        />
        <Text style={{ ...fullNameStyle }}>{currentUser.fullName}</Text>
        <UserDetailWrapper>
          <UserDetail>
            <Text style={{ ...smallTextStyle }} onClick={() => setPosts(userPosts)}>
              {' '}
              게시물
            </Text>
            <Text fontSize={18}> {currentUser.posts.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }} onClick={() => navigate('/user/follow')}>
              팔로워
            </Text>
            <Text fontSize={18}> {currentUser.followers.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }} onClick={() => navigate('/user/follow')}>
              {' '}
              팔로잉
            </Text>
            <Text fontSize={18}> {currentUser.following.length}</Text>
          </UserDetail>
        </UserDetailWrapper>
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

export default MyPage;
