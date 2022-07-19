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
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(9);

  const onActive = (value) => {
    setCurrentTab(value);
  };
  const handleGetLikePosts = useCallback(async () => {
    const { likes } = user;
    if (likes.length !== 0) {
      try {
        setIsLoading(true);
        const data = await Promise.allSettled(
          likes
            .slice(startIndex, endIndex)
            .map((like) => getPostData(like.post).then((result) => result.data)),
        );
        setUserLikePosts([...userLikePosts, ...data]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, startIndex, endIndex, userLikePosts]);

  const handleObserver = useCallback(
    async (entries) => {
      const { likes } = user;
      const isOverMaxIndex = endIndex > likes.length - 1;
      const isOverArray = likes.length - endIndex < 6;
      const addIndex = isOverArray ? likes.length - endIndex : 6;

      const target = entries[0];

      if (target.isIntersecting && !isLoading && !isOverMaxIndex) {
        setStartIndex(endIndex);
        setEndIndex((endIndex) => endIndex + addIndex);
      }
    },
    [endIndex, user, isLoading],
  );

  useEffect(() => {
    handleGetLikePosts();
  }, [endIndex]);

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
        <PostImageContainer posts={userLikePosts} handleObserver={handleObserver} />
      </Tab.Item>
    </Tab>
  );
};

export default React.memo(PostData);
