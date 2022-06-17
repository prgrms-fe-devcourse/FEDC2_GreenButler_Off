import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBtn from './IconButton';
import Profile from 'components/Profile';

const currentUserId = '62a75e5cb1b90b0c812c9b70';

const PostHeader = ({ author: { _id, fullName }, isDetailPage }) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate('/user/mypage', {
      state: {
        userId: _id,
      },
    });
  }, [navigate, _id]);

  const isMyPost = useMemo(() => {
    return _id === currentUserId && isDetailPage;
  }, [_id, isDetailPage]);

  return (
    <Header>
      <Profile userName={fullName} onClick={handleClick} />
      {isMyPost && <IconBtn className="more-button" name="MORE" size={20} />}
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
