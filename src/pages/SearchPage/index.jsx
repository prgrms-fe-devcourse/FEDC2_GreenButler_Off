import InputForm from 'components/basic/Input/InputForm';
import { useCallback, useEffect, useState } from 'react';
import Tab from 'components/basic/Tab';
import PostImageList from 'components/PostImageList';

import axios from 'axios';
import Image from 'components/basic/Image';
import styled from '@emotion/styled';

import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import { IMAGE_URLS } from 'utils/constants/images';
import Button from 'components/basic/Button';
import { Link } from 'react-router-dom';
import PageWrapper from 'components/basic/pageWrapper';
import TagSearchResult from 'components/TagSearchResult';
import UserSearchResult from 'components/UserSearchResult';

const TAG = 'tag';
const USER = 'user';

const getSearchTag = async (keyword) => {
  const result = await axios.get(`/search/all/%23${keyword}`);
  return result.data;
};

const getSearchUser = async (keyword) => {
  const result = await axios.get(`/search/users/${keyword}`);
  return result.data;
};

/*
  TODO:
  1. 검색 후 빈 배열로 내려올 경우 검색결과 없음 메세지 출력하기
  2. 현재 유저의 팔로우 목록과 비교하여 팔로우/팔로잉 버튼 변경하여 출력하기
  3. 게시물에 이미지가 없다면 기본 이미지로 대체

*/

const SearchPage = () => {
  const [currentTab, setCurrentTab] = useState('tag');
  const [searchData, setSearchData] = useState({
    keyword: '',
    [TAG]: null,
    [USER]: null,
  });

  const onSearch = useCallback(
    async (keyword) => {
      if (currentTab === TAG) {
        const result = await getSearchTag(keyword);
        setSearchData((state) => ({ ...state, tag: result, keyword }));
        console.log(result);
      }

      if (currentTab === USER) {
        const result = await getSearchUser(keyword);
        setSearchData((state) => ({ ...state, user: result, keyword }));
        console.log(result);
      }
    },
    [currentTab],
  );

  const onActive = (value) => {
    setCurrentTab(value);
  };

  const onSubmit = (keyword) => {
    setSearchData({ keyword: '', [TAG]: null, [USER]: null });
    onSearch(keyword);
  };

  useEffect(() => {
    if (searchData.keyword && searchData[currentTab] === null) {
      onSearch(searchData.keyword);
    }
  }, [currentTab]);

  return (
    <PageWrapper header nav info>
      <InputForm
        name="search"
        placeholder="검색어를 입력해주세요."
        onSubmit={onSubmit}
        style={{ marginTop: '20px' }}
      />

      <Tab onActive={onActive}>
        <Tab.Item title="태그" index={TAG}>
          <TagSearchResult posts={searchData.tag} />
        </Tab.Item>
        <Tab.Item title="계정" index={USER}>
          <UserSearchResult users={searchData.user} />
        </Tab.Item>
      </Tab>
    </PageWrapper>
  );
};

export default SearchPage;
