import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from 'components/basic/PageWrapper';
import TagSearchResult from 'pages/SearchPage/TagSearchResult';
import { searchTag } from 'utils/apis/postApi';

const Header = styled.h3`
  display: block;
  text-align: center;
  margin: 40px 0 30px;
  font-size: 30px;
`;

const SearchTagPage = () => {
  const { tag } = useParams();

  const [posts, setPosts] = useState();

  const loadPosts = useCallback(async () => {
    const updatePost = await searchTag(tag);

    setPosts(updatePost.data);
  }, [tag]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <PageWrapper header prev info>
      <Header onClick={loadPosts}>#{tag}</Header>
      <TagSearchResult posts={posts} />
    </PageWrapper>
  );
};

export default SearchTagPage;
