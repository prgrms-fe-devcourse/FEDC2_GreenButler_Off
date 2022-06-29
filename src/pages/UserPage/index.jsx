import { useEffect, useState, useCallback } from 'react';
import { Icon, PostImageContainer, PageWrapper, Tab } from 'components';
import { useParams } from 'react-router-dom';
import { initialUserData } from 'contexts/UserContext/reducer';
import { useUserContext } from 'contexts/UserContext';
import { getUser } from 'utils/apis/userApi';
import { getPostData } from 'utils/apis/postApi';
import {
  GRID_INACTIVE,
  GRID_ACTIVE,
  HEART_INACTIVE,
  HEART_ACTIVE,
} from 'utils/constants/icons/names';
import { UserContainer } from './style';
import UserData from './UserData';
import getUserLevel from 'utils/functions/userLevel/getUserLevel';

const USER_POSTS = 'userPosts';
const LIKE_POSTS = 'likePosts';

const UserPage = () => {
  const { id } = useParams();
  const pageUserId = id;
  const { currentUser } = useUserContext();
  const [user, setUser] = useState(initialUserData.currentUser);
  const [userLevel, setUserLevel] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userLikePosts, setUserLikePosts] = useState([]);

  const [currentTab, setCurrentTab] = useState(USER_POSTS);

  const onActive = (value) => {
    setCurrentTab(value);
  };

  const handleGetUser = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUser(pageUserId);
      setUser(data);
      const { posts, comments, followers } = data;
      const { level } = getUserLevel({ posts, comments, followers });
      setUserPosts(posts);
      setUserLevel(level);
    }
  }, [pageUserId]);

  const handleGetLikePosts = useCallback(async () => {
    const { likes } = user;
    if (likes.length !== 0) {
      const data = await Promise.all(
        likes.map((like) => getPostData(like.post).then((result) => result.data)),
      );
      setUserLikePosts(data);
    }
  }, [user]);

  useEffect(() => {
    handleGetUser();
  }, [pageUserId, handleGetUser]);

  useEffect(() => {
    if (currentTab === LIKE_POSTS && userLikePosts.length === 0) {
      handleGetLikePosts();
    }
  }, [currentTab, handleGetLikePosts, userLikePosts]);

  return (
    <PageWrapper header prev nav info={currentUser.id === pageUserId}>
      <UserContainer>
        <UserData user={user} pageUserId={pageUserId} userLevel={userLevel} />
        <Tab onActive={onActive}>
          <Tab.Item
            icon={{
              active: <Icon name={GRID_ACTIVE} size={24} />,
              inactive: <Icon name={GRID_INACTIVE} size={24} />,
            }}
            index={USER_POSTS}
          >
            <PostImageContainer posts={userPosts} />
          </Tab.Item>
          <Tab.Item
            icon={{
              active: <Icon name={HEART_ACTIVE} size={24} />,
              inactive: <Icon name={HEART_INACTIVE} size={24} />,
            }}
            index={LIKE_POSTS}
          >
            <PostImageContainer posts={userLikePosts} />
          </Tab.Item>
        </Tab>
      </UserContainer>
    </PageWrapper>
  );
};

export default UserPage;
