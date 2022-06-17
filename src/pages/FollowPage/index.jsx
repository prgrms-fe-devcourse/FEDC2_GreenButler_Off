import { useCallback, useEffect, useState } from 'react';
import Tab from 'components/basic/Tab';
import { useParams } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';
import FollowList from 'components/FollowList';
import { getUser } from 'utils/apis/userApi';

const FOLLOWING = 'following';
const FOLLOWER = 'follower';

const FollowPage = () => {
  //TODO:currentUser 말고 UserPage의 user정보도 필요함 => userId를 param으로 받아서 처리할 필요가 있음// 일단 currentUser가 아니라고 생각하고 로직 짜기
  //const { id } = useParams(); //현재 페이지 user의 _id
  const id = '629e29bd6d18b41c5b238ba2'; // 관리자 id
  const [user, setUser] = useState({});
  const [followingData, setFollowingData] = useState([]); // 얘는 해당 user(id) 유저 정보들의 배열 vs following은 id가 담긴 배열
  const [followerData, setFollowerData] = useState([]); // 얘는 해당 follower(id) 유저 정보들의 배열 vs followers는 id가 담긴 배열

  useEffect(() => {
    handleGetUser();
  }, []);

  //TODO:신영 현재 페이지 유저의 정보 => 전역데이터가 아닌 경우 context를 사용할 수 없어서 직접 api 호출
  const handleGetUser = useCallback(async () => {
    if (id) {
      const { data } = await getUser(id);
      setUser(data);
    }
  }, [id]);

  useEffect(() => {
    handleGetFollowing();
    handleGetFollowers();
  }, [user]);

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

  return (
    <PageWrapper header nav>
      <Tab onActive={onActive}>
        <Tab.Item title="팔로워" index={FOLLOWER}>
          <FollowList followList={followerData} tab={FOLLOWER} />
        </Tab.Item>
        <Tab.Item title="팔로잉" index={FOLLOWING}>
          <FollowList followList={followingData} tab={FOLLOWING} />
        </Tab.Item>
      </Tab>
    </PageWrapper>
  );
};

export default FollowPage;
