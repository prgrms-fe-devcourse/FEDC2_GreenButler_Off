import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBtn from './IconButton';
import Profile from 'components/Profile';
import { useUserContext } from 'contexts/UserContext';

const PostHeader = ({ author: { _id, image, fullName }, isDetailPage }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate('/user/mypage', {
      state: {
        userId: _id,
      },
    });
  }, [navigate, _id]);

  const isMyPost = useMemo(() => {
    return _id === currentUser.id && isDetailPage;
  }, [_id, currentUser.id, isDetailPage]);

  return (
    <Header>
      <Profile src={image} userName={fullName} onClick={handleClick} />
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
