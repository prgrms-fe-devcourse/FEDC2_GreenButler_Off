import { useCallback, useEffect, useState } from 'react';
import Tab from 'components/basic/Tab';
import { useParams } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';
import FollowList from 'components/FollowList';
import MyFollowList from 'components/FollowList/MyFollowList';
import { useUserContext } from 'contexts/UserContext';
import { getUser } from 'utils/apis/userApi';

const FOLLOWING = 'following';
const FOLLOWER = 'follower';

const FollowPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isMyFollow, setIsMyFollow] = useState(true);
  const [followingData, setFollowingData] = useState([]); // 얘는 해당 user(id) 유저 정보들의 배열 vs following은 id가 담긴 배열
  const [followerData, setFollowerData] = useState([]); // 얘는 해당 follower(id) 유저 정보들의 배열 vs followers는 id가 담긴 배열
  const { currentUser } = useUserContext();

  const [currentTab, setCurrentTab] = useState(FOLLOWER);
  const onActive = (value) => {
    setCurrentTab(value);
  };

  //FOLLOWING: 내가 팔로잉 한 사람들 user: 그놈들 id , follower: 내 id
  const handleGetFollowing = useCallback(async () => {
    const { following } = user;
    if (following && following.length !== 0) {
      const data = await Promise.all(
        following.map(async (follow) => {
          const userData = await getUser(follow.user).then((result) => result.data);
          return {
            followId: follow._id,
            userData,
            followData: follow,
          };
        }),
      );
      setFollowingData(data);
    } else {
      setFollowingData([]);
    }
  }, [user]);

  //FOLLOWERS: 나를 팔로잉 한 사람들 user: 내 id , follower: 그 놈들 id
  const handleGetFollowers = useCallback(async () => {
    const { followers } = user;
    if (followers && followers.length !== 0) {
      const data = await Promise.all(
        followers.map(async (follow) => {
          const userData = await getUser(follow.follower).then((result) => result.data);
          return {
            followId: follow._id,
            userData,
            followData: follow,
          };
        }),
      );
      setFollowerData(data);
    }
  }, [user]);

  const handleGetUser = useCallback(async () => {
    if (id) {
      const { data } = await getUser(id);
      setUser(data);

      handleGetFollowers();
    }
  }, [id, handleGetFollowers]);

  useEffect(() => {
    if (currentUser.id !== id) {
      handleGetUser();
      setIsMyFollow(false);
    } else {
      setUser(currentUser);
      setIsMyFollow(true);

      handleGetFollowers();
    }
  }, [currentUser, handleGetFollowers, handleGetUser, id]);

  useEffect(() => {
    if (followingData.length === 0 && currentTab === FOLLOWING) {
      handleGetFollowing();
    }
  }, [user, handleGetFollowing, handleGetFollowers, currentTab, followingData]);

  return (
    <PageWrapper header nav prev title={user.fullName}>
      <Tab onActive={onActive}>
        <Tab.Item title="팔로워" index={FOLLOWER}>
          {isMyFollow ? (
            <MyFollowList followList={followerData} tab={FOLLOWER} />
          ) : (
            <FollowList followList={followerData} />
          )}
        </Tab.Item>
        <Tab.Item title="팔로잉" index={FOLLOWING}>
          {isMyFollow ? (
            <MyFollowList followList={followingData} tab={FOLLOWING} />
          ) : (
            <FollowList followList={followingData} />
          )}
        </Tab.Item>
      </Tab>
    </PageWrapper>
  );
};

export default FollowPage;
