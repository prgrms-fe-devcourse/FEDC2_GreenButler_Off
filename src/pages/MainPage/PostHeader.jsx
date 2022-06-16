import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBtn from './IconButton';
import Profile from 'components/Profile';

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
      <Profile userName={fullName} onClick={handleClick} />
      <IconBtn className="more-button" name="MORE" size={20} />
    </Header>
  );
};

const Header = styled.header`
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default PostHeader;
