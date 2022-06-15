import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBtn from './IconButton';

const PostHeader = ({ author: { _id, fullName } }) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate('/user/mypage', {
      state: {
        userId: _id,
      },
    });
  }, [navigate, _id]);

  return (
    <Header>
      <UserProfile onClick={handleClick}>
        <Avatar
          src="https://picsum.photos/300/300/?image=50"
          alt="유저 프로필 사진"
          size={60}
          style={AvatarStyle}
        />
        <Text style={TextStyle}>{fullName}</Text>
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
