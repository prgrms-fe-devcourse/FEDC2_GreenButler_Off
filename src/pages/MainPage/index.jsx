import styled from '@emotion/styled';
import Header from './Header';
import { getPostsPart } from 'utils/apis/postApi';
import PostItem from './PostItem';
import { useState, useEffect } from 'react';

const LIMIT = 5;

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);

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

  return (
    <Container>
      <Header />
      <PostList>
        {posts?.map((post) => (
          <li key={post._id}>
            <PostItem key={post._id} post={post} />
          </li>
        ))}
      </PostList>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

const PostList = styled.ul``;

export default MainPage;

// export const getPostsPart = ({ offset, limit }) => {
//   return request({
//     method: API_METHOD.GET,
//     url: `/posts/channel/${process.env.REACT_APP_CHANNEL_ID_TOTAL}`,
//     params: {
//       offset,
//       limit,
//     },
//   });
// };
