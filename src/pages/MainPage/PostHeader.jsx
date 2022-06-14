import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import IconBtn from './IconButton';

const PostHeader = () => {
  return (
    <Header>
      <UserProfile>
        <Avatar
          src="https://picsum.photos/300/300/?image=50"
          alt="유저 프로필 사진"
          size={60}
          style={AvatarStyle}
        />
        <Text style={TextStyle}>식물킬러탈출</Text>
      </UserProfile>
      <IconBtn className="more-button" name="SEARCH_GRAY" size={20} />
    </Header>
  );
};

const Header = styled.header`
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarStyle = {
  marginRight: '12px',
};

const TextStyle = {
  fontSize: '22px',
  fontWeight: 500,
};

export default PostHeader;
