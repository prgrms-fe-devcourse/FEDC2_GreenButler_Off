import { useEffect, useState, useCallback } from 'react';
import { PageWrapper } from 'components';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';
import { getUser } from 'utils/apis/userApi';
import { UserContainer } from './style';
import UserData from './UserData';
import PostData from './PostData';
import getUserLevel from 'utils/functions/userLevel/getUserLevel';

const UserPage = () => {
  const { id } = useParams();
  const { currentUser } = useUserContext();
  const [user, setUser] = useState({});
  const [userLevel, setUserLevel] = useState({});

  const handleGetUser = useCallback(async () => {
    if (id) {
      const { data } = await getUser(id);
      setUser(data);
      const { posts, comments, followers } = data;
      const { level } = getUserLevel({ posts, comments, followers });
      setUserLevel(level);
    }
  }, [id]);

  useEffect(() => {
    handleGetUser();
  }, [id, handleGetUser]);

  return (
    <PageWrapper header prev nav info={currentUser.id === id}>
      {Object.keys(user).length !== 0 && (
        <UserContainer>
          <UserData user={user} pageUserId={id} userLevel={userLevel} />
          <PostData user={user} />
        </UserContainer>
      )}
    </PageWrapper>
  );
};

export default UserPage;
