import {
  GRID_INACTIVE,
  GRID_ACTIVE,
  HEART_INACTIVE,
  HEART_ACTIVE,
} from 'utils/constants/icons/names';
import { Icon, PostImageContainer, Tab } from 'components';
import React, { useEffect, useState, useCallback } from 'react';
import { getPostData } from 'utils/apis/postApi';

const USER_POSTS = 'userPosts';
const LIKE_POSTS = 'likePosts';

const PostData = ({ user }) => {
  const [userLikePosts, setUserLikePosts] = useState([]);
  const [currentTab, setCurrentTab] = useState(USER_POSTS);

  const onActive = (value) => {
    setCurrentTab(value);
  };

  const handleGetLikePosts = useCallback(async () => {
    const { likes } = user;
    if (likes.length !== 0) {
      try {
        const data = await Promise.allSettled(
          likes.map((like) => getPostData(like.post).then((result) => result.data)),
        );
        setUserLikePosts(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (currentTab === LIKE_POSTS && user.likes.length !== 0) {
      handleGetLikePosts();
    }
  }, [user]);

  useEffect(() => {
    if (currentTab === LIKE_POSTS && userLikePosts.length === 0) {
      handleGetLikePosts();
    }
  }, [currentTab, handleGetLikePosts, userLikePosts]);

  return (
    <Tab onActive={onActive}>
      <Tab.Item
        icon={{
          active: <Icon name={GRID_ACTIVE} size={24} />,
          inactive: <Icon name={GRID_INACTIVE} size={24} />,
        }}
        index={USER_POSTS}
      >
        <PostImageContainer posts={user.posts} />
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
  );
};

export default React.memo(PostData);
