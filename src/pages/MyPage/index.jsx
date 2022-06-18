import { useEffect, useState, useCallback } from 'react';
import theme from 'styles/theme';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import { useUserContext } from 'contexts/UserContext';
import { getUserPosts, getPostData } from 'utils/apis/postApi';
import PostImageContainer from 'components/PostImageContainer';
import { useNavigate } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';
import { IMAGE_URLS } from 'utils/constants/images';
import {
  fullNameStyle,
  UserContainter,
  UserInfo,
  UserDetailWrapper,
  UserDetail,
  Tab,
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
  }, []); //TODO:유저의 정보를 받아오기 여기에 POSTS도 있음

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
    <PageWrapper header nav info prev>
      <UserContainter>
        <UserInfo>
          <Avatar size={136} src={currentUser.image || IMAGE_URLS.PROFILE_IMG} />
          <Text style={{ ...fullNameStyle }}>{currentUser.fullName}</Text>
          <UserDetailWrapper>
            <UserDetail>
              <Text
                fontSize={16}
                color={theme.color.fontNormal}
                onClick={() => setPosts(userPosts)}
              >
                게시물
              </Text>
              <Text fontSize={18}> {currentUser.posts.length}</Text>
            </UserDetail>
            <UserDetail onClick={() => navigate(`/user/follow/${currentUser.id}`)}>
              <Text fontSize={16} color={theme.color.fontNormal}>
                팔로워
              </Text>
              <Text fontSize={18}> {currentUser.followers.length}</Text>
            </UserDetail>
            <UserDetail onClick={() => navigate(`/user/follow/${currentUser.id}`)}>
              <Text fontSize={16} color={theme.color.fontNormal}>
                {' '}
                팔로잉
              </Text>
              <Text fontSize={18}> {currentUser.following.length}</Text>
            </UserDetail>
          </UserDetailWrapper>
        </UserInfo>
        {/* 
        //TODO:신영 추후 기본컴포넌트  Tab을 사용해서 아래 변경 : Icon을 어떻게 처리할지 고민 ,children으로 PostImageContainer를 두는 방식을 현재 사용
      */}
        <Tab>
          <button onClick={() => setPosts(userPosts)}>
            <Icon name="GRID" size={18} />
          </button>
          <button onClick={() => setPosts(uesrLikePosts)}>
            <Icon name="HEART" size={18} />
          </button>
        </Tab>
        <PostImageContainer posts={posts} />
      </UserContainter>
    </PageWrapper>
  );
};

export default MyPage;
