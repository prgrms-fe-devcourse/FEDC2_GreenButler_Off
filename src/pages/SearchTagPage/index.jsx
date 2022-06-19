import axios from 'axios';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import PageWrapper from 'components/basic/pageWrapper';
import TagSearchResult from 'components/TagSearchResult';
import { searchTag } from 'utils/apis/postApi';
import { useParams } from 'react-router-dom';

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
    console.log(updatePost, 'test');
    setPosts(updatePost.data);
  }, []);

  useEffect(() => {
    loadPosts();
    console.log('Loaded Post');
  }, [loadPosts]);

  return (
    <PageWrapper header prev info>
      <Header onClick={loadPosts}>#{tag}</Header>
      <TagSearchResult posts={posts} />
    </PageWrapper>
  );
};

export default SearchTagPage;
