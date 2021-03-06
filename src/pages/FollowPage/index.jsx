import { useCallback, useEffect, useState } from 'react';
import { PageWrapper, Tab } from 'components';
import { useParams } from 'react-router-dom';
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
  const [isFollowChange, setIsFollowChange] = useState(false);

  const handleFollowChange = (value) => {
    setIsFollowChange(value);
  };

  //TODO:신영 현재 페이지 유저의 정보 => 전역데이터가 아닌 경우 context를 사용할 수 없어서 직접 api 호출
  const handleGetUser = useCallback(async () => {
    if (id) {
      const { data } = await getUser(id);
      setUser(data);
    }
  }, [id]);

  const [currentTab, setCurrentTab] = useState(FOLLOWER);
  const onActive = (value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    if (currentUser.id !== id) {
      handleGetUser();
      setIsMyFollow(false);
    } else {
      setUser(currentUser);
      setIsMyFollow(true);
    }
  }, [currentUser, id, handleGetUser]);

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
    setIsFollowChange(false);
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
    setIsFollowChange(false);
  }, [user]);
  
  useEffect(() => {
    if (currentTab === FOLLOWING && (followingData.length === 0 || isFollowChange)) {
      handleGetFollowing();
    } else if (currentTab === FOLLOWER && followerData.length === 0) {
      handleGetFollowers();
    }
  }, [
    currentTab,
    user,
    isFollowChange,
    followingData,
    followerData,
    handleGetFollowing,
    handleGetFollowers,
  ]);

  return (
    <PageWrapper header nav prev title={user.fullName}>
      <Tab onActive={onActive}>
        <Tab.Item title="팔로워" index={FOLLOWER}>
          {isMyFollow ? (
            <MyFollowList
              followList={followerData}
              tab={FOLLOWER}
              handleFollowChange={handleFollowChange}
            />
          ) : (
            <FollowList followList={followerData} />
          )}
        </Tab.Item>
        <Tab.Item title="팔로잉" index={FOLLOWING}>
          {isMyFollow ? (
            <MyFollowList
              followList={followingData}
              tab={FOLLOWING}
              handleFollowChange={handleFollowChange}
            />
          ) : (
            <FollowList followList={followingData} />
          )}
        </Tab.Item>
      </Tab>
    </PageWrapper>
  );
};

export default FollowPage;
