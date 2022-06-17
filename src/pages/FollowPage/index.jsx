import { useCallback, useEffect, useState } from 'react';
import Tab from 'components/basic/Tab';
import { useParams } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';
import FollowList from 'components/UserSearchResult';
import { getUser } from 'utils/apis/userApi';
import { useUserContext } from 'contexts/UserContext';

const FOLLOWING = 'following';
const FOLLOWER = 'follower';

const FollowPage = () => {
  const { onFollow, onUnfollow } = useUserContext();

  //TODO:currentUser 말고 UserPage의 user정보도 필요함 => userId를 param으로 받아서 처리할 필요가 있음// 일단 currentUser가 아니라고 생각하고 로직 짜기
  //const { id } = useParams(); //현재 페이지 user의 _id
  const id = '629e29bd6d18b41c5b238ba2'; // 관리자 id
  const [user, setUser] = useState({});
  const [followingUsers, setFollowingUsers] = useState([]); // 얘는 해당 user(id) 유저 정보들의 배열 vs following은 id가 담긴 배열
  const [followerUsers, setFollowerUsers] = useState([]); // 얘는 해당 follower(id) 유저 정보들의 배열 vs followers는 id가 담긴 배열

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
    //handleFollowButton();
  }, [user]);

  const [currentTab, setCurrentTab] = useState(FOLLOWER);
  const onActive = (value) => {
    setCurrentTab(value);
  };

  //TODO: FOLLOWING: 내가 팔로잉 한 사람들 user: 그놈들 id , follower: 내 id
  const handleGetFollowing = useCallback(async () => {
    const { following } = user;
    if (following && following.length !== 0) {
      const data = await Promise.all(
        following.map((follow) => getUser(follow.user).then((result) => result.data)),
      );
      setFollowingUsers(data);
    }
  }, [user]);

  //TODO: FOLLOWERS: 나를 팔로잉 한 사람들 user: 내 id , follower: 그 놈들 id
  const handleGetFollowers = useCallback(async () => {
    const { followers } = user;
    if (followers && followers.length !== 0) {
      const data = await Promise.all(
        followers.map((follow) => getUser(follow.follower).then((result) => result.data)),
      );
      setFollowerUsers(data);
    }
  }, [user]);

  /*   const handleFollowButton = useCallback((userId) => {
    const isFollwing = user.following.some((following) => following.user === userId);
    setIsFollow((isFollow) => !isFollow);
    if (isFollow) {
      console.log('user', user);
      console.log('userId', userId);
      onFollow({ userId, followId: id });
    } else {
      console.log('user', user);
      console.log('followId', followId);
      onUnfollow({ unfollowId: followId });
    }
  }, []); */

  return (
    <PageWrapper header nav>
      <Tab onActive={onActive}>
        <Tab.Item title="팔로워" index={FOLLOWER}>
          <FollowList users={followerUsers} />
        </Tab.Item>
        <Tab.Item title="팔로잉" index={FOLLOWING}>
          <FollowList users={followingUsers} />
        </Tab.Item>
      </Tab>
    </PageWrapper>
  );
};

export default FollowPage;
