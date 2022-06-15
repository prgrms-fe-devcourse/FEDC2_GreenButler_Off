import { useEffect, useState, useCallback } from 'react';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import { useUserContext } from 'contexts/UserContext';
import { getUserPosts, getPostData } from 'utils/apis/postApi';
import PostImageContainer from 'components/PostImageContainer';
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
  const { currentUser } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [uesrLikePosts, setUserLikePosts] = useState([]);

  useEffect(() => {
    handleGetUserPosts();
    handleGetLikePosts();
  }, []);

  const handleGetUserPosts = useCallback(async () => {
    const { id } = currentUser;
    if (id) {
      const { data } = await getUserPosts(id);
      setUserPosts(data);
      setPosts(data);
    }
  }, []);

  const handleGetLikePosts = useCallback(async () => {
    const { likes } = currentUser;
    if (likes.length !== 0) {
      const data = await Promise.all(
        likes.map((like) => getPostData(like.post).then((result) => result.data)),
      );
      setUserLikePosts(data);
    }
  }, []);

  return (
    <UserContainter>
      <Header />
      <UserInfo>
        {/* 
        //TODO: 프로필 기본 이미지를 변경할 예정
      */}
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
          <UserDetail onClick={() => navigate('/user/follow')}>
            <Text style={{ ...smallTextStyle }}>팔로워</Text>
            <Text fontSize={18}> {currentUser.followers.length}</Text>
          </UserDetail>
          <UserDetail onClick={() => navigate('/user/follow')}>
            <Text style={{ ...smallTextStyle }}> 팔로잉</Text>
            <Text fontSize={18}> {currentUser.following.length}</Text>
          </UserDetail>
        </UserDetailWrapper>
      </UserInfo>
      {/* 
        //TODO: 추후 기본컴포넌트  Tab을 사용해서 아래 변경 : Icon을 어떻게 처리할지 고민 ,children으로 PostImageContainer를 두는 방식을 현재 사용
      */}
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

export default MyPage;
