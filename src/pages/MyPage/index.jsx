import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import theme from 'styles/theme';
import Icon from 'components/basic/Icon';
import { dummyPosts, me } from 'dummy';
import { useUserContext } from 'contexts/UserContext';
import { getUserPosts } from 'utils/apis/postApi';

const MyPage = () => {
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

  const smallTextStyle = {
    fontSize: 16,
    color: theme.color.fontNormal,
  };

  const nickNameStyle = {
    display: 'block',
    marginTop: 5,
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '34.75px',
    cursor: 'pointer',
  };

  const dummyPlace = 'https://via.placeholder.com/200'; //추후 스켈레톤으로 교체

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
        <Text
          style={{
            ...nickNameStyle,
          }}
        >
          {currentUser.fullName}
        </Text>
        <UserDetailWrapper>
          <UserDetail>
            <Text style={{ ...smallTextStyle }}> 게시물</Text>
            <Text fontSize={18}> {currentUser.posts.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }}>팔로워</Text>
            <Text fontSize={18}> {currentUser.followers.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }}> 팔로잉</Text>
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
        <Icon
          name="LIKE_ICON"
          size={18}
          onClick={() => setPosts(uesrLikePosts)}
        />
      </Tab>
      <ImageContainer>
        {posts.map((post) => (
          <Link to={`/post/detail/${post._id}`} key={Math.random()}>
            <Image
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              width="100%"
              block={true}
              threshold={0.1}
              className="post-item"
              src={
                post.image ||
                `https://user-images.githubusercontent.com/79133602/173282447-b5cdf98e-4372-4284-9795-b824acf2283d.png`
              }
              alt={posts._id}
              placeholder={dummyPlace}
            />
          </Link>
        ))}
      </ImageContainer>
      <Bottom />
    </UserContainter>
  );
};

export default MyPage;

const UserContainter = styled.div`
  width: 100%;
  position: relative;
  background-color: white;
`;

const Header = styled.div`
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.color.gray};
  background-color: white;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  height: 90px;
  width: 100%;
  border-top: 1px solid ${theme.color.gray};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  margin-top: 15px;
  justify-content: space-around;
  border-bottom: 1px solid ${theme.color.gray};
  i {
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const UserInfo = styled.div`
  text-align: center;
  margin: 120px auto 0 auto;
  position: relative;
`;

const UserDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0 0 0;
  cursor: pointer;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  > div:first-of-type {
    font-size: 16px;
    color: ${theme.color.fontNormal};
  }
`;
