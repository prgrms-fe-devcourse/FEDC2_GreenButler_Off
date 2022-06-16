import styled from '@emotion/styled';
import PageWrapper from 'components/basic/pageWrapper';
import { getPostsPart } from 'utils/apis/postApi';
import PostItem from './PostItem';
import { useState, useEffect, useCallback, useRef } from 'react';

const LIMIT = 15;

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [offset, setOffset] = useState(0);
  const targetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const nextPosts = await getPostsPart({
        offset,
        limit: LIMIT,
      }).then((res) => res.data);
      setPosts([...posts, ...nextPosts]);
    })();
  }, []);

  const onIntersect = useCallback(() => {
    (async (entries, observer) => {
      console.log(entries);
      if (!entries) {
        return;
      }
      if (entries[0].isIntersecting && !isLoding) {
        observer.unobserve(entries[0].target);
        setIsLoding(true);
        setOffset(offset + 5);
        const nextPosts = await getPostsPart({
          offset,
          limit: LIMIT,
        }).then((res) => res.data);
        setPosts([...posts, ...nextPosts]);
        setIsLoding(false);
        observer.observe(entries[0].target);
      }
    })();
  }, []);

  useEffect(() => {
    let observer;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
    return () => observer && observer.disconnect();
  }, [targetRef, onIntersect]);

  return (
    <PageWrapper header nav>
      <PostList>
        {posts?.map((post, i) => {
          const isLastItem = posts.length - 1 === i;
          if (isLastItem) {
            return (
              <li key={post._id}>
                <PostItem key={post._id} post={post} />
              </li>
            );
          } else {
            return (
              <li key={post._id}>
                <PostItem key={post._id} post={post} />
              </li>
            );
          }
        })}
      </PostList>
      <div ref={targetRef}></div>
    </PageWrapper>
  );
};

const PostList = styled.ul``;

export default MainPage;

// useEffect(() => {
//   const observer = new IntersectionObserver((entries) => {
//     if (entries[0].isIntersecting && targetRef.current) {
//       console.log('화면 끝...', entries[0]);
//     }
//   }, observerOption);

//   if (targetRef.current) {
//     observer.observe(targetRef.current);
//   }
//   return () => {
//     observer.disconnect();
//   };
// }, [targetRef]);
