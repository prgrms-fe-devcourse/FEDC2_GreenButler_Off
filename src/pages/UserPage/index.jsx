import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import Button from 'components/basic/Button';
import { other, posts } from 'dummy';
import theme from 'styles/theme';
import Icon from 'components/basic/Icon';

const UserPage = () => {
  const user = other;

  const smallTextStyle = {
    fontSize: 16,
    color: theme.color.fontNormal,
  };

  const followButtonStyle = {
    width: 125,
    height: 38,
    color: 'white',
    backgroundColor: theme.color.mainGreen,
    borderRadius: 10,
    marginTop: '25px',
    fontSize: 16,
  };

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

        <Text
          style={{
            display: 'block',
            marginTop: 5,
            fontWeight: 500,
            fontSize: 24,
            lineHeight: '34.75px',
            cursor: 'pointer',
          }}
        >
          {user.fullName}
        </Text>
        <UserDetailWrapper>
          <UserDetail>
            <Text style={{ ...smallTextStyle }}> 게시물</Text>
            <Text fontSize={18}> {user.posts.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }}>팔로워</Text>
            <Text fontSize={18}> {user.followers.length}</Text>
          </UserDetail>
          <UserDetail>
            <Text style={{ ...smallTextStyle }}> 팔로잉</Text>
            <Text fontSize={18}> {user.following.length}</Text>
          </UserDetail>
        </UserDetailWrapper>
        <Button width="100%" style={{ ...followButtonStyle }}>
          팔로우
        </Button>
      </UserInfo>
      {/*  추후 Tab 컴포넌트 교체 */}
      <Tab>
        <Icon name="LIKE_ICON" size={18} />
        <Icon name="LIKE_ICON" size={18} />
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
              height="100%"
              className="post-item"
              src={
                post.image ||
                `https://user-images.githubusercontent.com/79133602/173282447-b5cdf98e-4372-4284-9795-b824acf2283d.png`
              }
            />
          </Link>
        ))}
      </ImageContainer>
      <Bottom />
    </UserContainter>
  );
};

export default UserPage;

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

  i {
    cursor: pointer;
  }
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

  i {
    cursor: pointer;
  }
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
