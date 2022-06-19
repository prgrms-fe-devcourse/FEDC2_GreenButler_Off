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

/*
  TODO:
  1. 태그 클릭 시 넘어온 keyword로 검색되게 교체
  2. 테스트 코드들 정리하고 코드 간소화 필요
  3. 정사각형의 이미지가 아니면 postList에서 짤려보이는데 이 부분 처리 필요
  4. 태그 클릭하여 넘어올 때 클릭한 태그의 키워드를 url에 담아주면 좋을 듯
*/

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
