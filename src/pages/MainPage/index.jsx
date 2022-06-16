import styled from '@emotion/styled';
import PageWrapper from 'components/basic/pageWrapper';
import { getPostsPart } from 'utils/apis/postApi';
import PostItem from './PostItem';
import { useState, useEffect, useRef } from 'react';

const LIMIT = 15;

const observerOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const targetRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const initialPosts = await getPostsPart({
        offset,
        limit: LIMIT,
      }).then((res) => res.data);
      setPosts(initialPosts);
    }
    fetchData();
  }, [offset]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && targetRef.current) {
        console.log('화면 끝...', entries[0]);
      }
    }, observerOption);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

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
