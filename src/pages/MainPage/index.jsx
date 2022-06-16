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
  const [target, setTarget] = useState('');

  useEffect(() => {
    (async () => {
      const nextPosts = await getPostsPart({
        offset,
        limit: LIMIT,
      }).then((res) => res.data);
      setPosts(nextPosts);
    })();
  }, []);

  // const onIntersect = async ([entry], observer) => {
  //   if (entry.isIntersecting && !isLoding) {
  //     observer.unobserve(entry.target);
  //     setIsLoding(true);
  //     setOffset(offset + 5);
  //     const nextPosts = await getPostsPart({
  //       offset,
  //       limit: LIMIT,
  //     }).then((res) => res.data);
  //     setPosts([...posts, ...nextPosts]);
  //     setIsLoding(false);
  //     observer.observe(entry.target);
  //   }
  // };

  // useEffect(() => {
  //   let observer;
  //   if (target) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.4,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);

  return (
    <PageWrapper header nav>
      <PostList>
        {posts?.map((post) => (
          <li key={post._id}>
            <PostItem key={post._id} post={post} />
          </li>
        ))}
      </PostList>
      <div ref={setTarget}></div>
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
