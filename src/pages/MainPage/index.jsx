import styled from '@emotion/styled';
import { useEffect } from 'react';
import Header from './Header';
import PostList from './PostList';
import { getPosts } from 'utils/apis/postApi';

const MainPage = () => {
  getPosts();

  // useEffect(() => {
  //   async () => {
  //     const data = await getPosts();
  //     console.log(data);
  //   };
  // }, []);

  return (
    <Container>
      <Header />
      <PostList />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

export default MainPage;
