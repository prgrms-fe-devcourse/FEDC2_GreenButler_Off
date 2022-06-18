import styled from '@emotion/styled';
import PageWrapper from 'components/basic/pageWrapper';
import { getPostsPart } from 'utils/apis/postApi';
import PostItem from './PostItem';
import { useState, useEffect, useCallback, useRef } from 'react';

const LIMIT = 5;

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [offset, setOffset] = useState(0);
  const [max, setMax] = useState(0);
  const targetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const nextPosts = await getPostsPart({
        offset,
        limit: LIMIT,
      }).then((res) => res.data);
      setPosts(nextPosts);
      setOffset(offset + 5);
      setMax(nextPosts[0].channel.posts.length);
    })();
  }, []);

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoding && offset < max) {
        observer.disconnect();
        setIsLoding(true);
        setOffset(offset + 5);
        const nextPosts = await getPostsPart({
          offset,
          limit: LIMIT,
        }).then((res) => res.data);
        setPosts([...posts, ...nextPosts]);
        setIsLoding(false);
      }
    },
    [isLoding, offset, max, posts],
  );

  useEffect(() => {
    let observer;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(targetRef.current);
    }
    return () => observer && observer.disconnect();
  }, [targetRef, onIntersect]);

  return (
    <PageWrapper header nav>
      <PostList>
        {posts?.map((post, i) => {
          if (posts.length - 1 === i) {
            return (
              <li key={i} ref={targetRef}>
                <PostItem key={i} post={post} />
              </li>
            );
          } else {
            return (
              <li key={i}>
                <PostItem key={i} post={post} />
              </li>
            );
          }
        })}
      </PostList>
    </PageWrapper>
  );
};

const PostList = styled.ul``;

export default MainPage;
