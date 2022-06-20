import { useEffect, useState, useCallback } from 'react';
import Icon from 'components/basic/Icon';
import Tab from 'components/basic/Tab';
import { useParams } from 'react-router-dom';
import { initialUserData } from 'contexts/UserContext/reducer';
import { getUser } from 'utils/apis/userApi';
import { getUserPosts, getPostData } from 'utils/apis/postApi';
import PostImageContainer from 'components/PostImageContainer';
import PageWrapper from 'components/basic/pageWrapper';
import { GRID, HEART } from 'utils/constants/icons/names';
import { UserContainter } from './style';
import UserData from './UserData';

const USER_POSTS = 'userPosts';
const LIKE_POSTS = 'likePosts';

const UserPage = () => {
  const { id } = useParams();
  const [pageUserId, setPageUserId] = useState(id);
  const [user, setUser] = useState(initialUserData.currentUser);
  const [userPosts, setUserPosts] = useState([]);
  const [userLikePosts, setUserLikePosts] = useState([]);

  const [currentTab, setCurrentTab] = useState(USER_POSTS);

  const onActive = (value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    handleGetUser();
  }, [pageUserId]);

  useEffect(() => {
    handleGetLikePosts();
    handleGetUserPosts();
  }, [user]);

  //TODO:신영 추후 핸들러 분리
  const handleGetUser = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUser(pageUserId);
      setUser(data);
    }
  }, [pageUserId]);

  const handleGetUserPosts = useCallback(async () => {
    if (pageUserId) {
      const { data } = await getUserPosts(pageUserId);
      setUserPosts(data);
    }
  }, [pageUserId, currentTab]);

  //TODO:신영 관리자 좋아요 post 두번된게 있네? 같은 post를 여러번 좋아요할 수 있구나 이거 나중에 더미 삭제
  const handleGetLikePosts = useCallback(async () => {
    const { likes } = user;
    if (likes.length !== 0) {
      const data = await Promise.all(
        likes.map((like) => getPostData(like.post).then((result) => result.data)),
      );
      setUserLikePosts(data);
    }
  }, [user]);

  return (
    <PageWrapper header prev nav>
      <UserContainter>
        <UserData user={user} pageUserId={pageUserId} />
        <Tab onActive={onActive}>
          <Tab.Item
            icon={{
              active: <Icon name={GRID} size={18} />,
              inactive: <Icon name={GRID} size={18} />,
            }}
            index={USER_POSTS}
          >
            <PostImageContainer posts={userPosts} />
          </Tab.Item>
          <Tab.Item
            icon={{
              active: <Icon name={HEART} size={18} />,
              inactive: <Icon name={HEART} size={18} />,
            }}
            index={LIKE_POSTS}
          >
            <PostImageContainer posts={userLikePosts} />
          </Tab.Item>
        </Tab>
      </UserContainter>
    </PageWrapper>
  );
};

export default UserPage;
