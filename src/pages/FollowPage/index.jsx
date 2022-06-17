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

  const [currentTab, setCurrentTab] = useState(FOLLOWER);
  const onActive = (value) => {
    setCurrentTab(value);
  };

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
