import InputForm from 'components/basic/Input/InputForm';
import { useCallback, useEffect, useState } from 'react';
import Tab from 'components/basic/Tab';

import axios from 'axios';

const getSearchTag = async (keyword) => {
  const result = await axios.get(`/search/all/%23${keyword}`);
  return result.data;
};

const getSearchUser = async (keyword) => {
  const result = await axios.get(`/search/all/${keyword}`);
  return result.data;
};

const SearchPage = () => {
  const [currentTab, setCurrentTab] = useState('tag');

  const [searchData, setSearchData] = useState({
    keyword: '',
    tag: null,
    user: null,
  });

  const onSearch = useCallback(
    async (keyword) => {
      if (currentTab === 'tag') {
        const result = await getSearchTag(keyword);
        setSearchData((state) => ({ ...state, tag: result, keyword }));
      }

      if (currentTab === 'user') {
        const result = await getSearchUser(keyword);
        setSearchData((state) => ({ ...state, user: result, keyword }));
      }
    },
    [currentTab],
  );

  const onActive = (value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    if (searchData.keyword && searchData[currentTab] === null) {
      onSearch(searchData.keyword);
    }
  }, [currentTab]);

  return (
    <div>
      <InputForm
        name="search"
        placeholder="검색어를 입력해주세요."
        onSubmit={onSearch}
      />
      <div>
        <Tab onActive={onActive}>
          <Tab.Item title="태그" index="tag">
            {searchData.tag
              ? searchData.tag.map((post) => {
                  const { content, tags } = JSON.parse(post.title);
                  return (
                    <div key={post._id}>
                      <div>
                        <img src={post.image} />
                      </div>
                      {content} <p>{tags}</p>
                    </div>
                  );
                })
              : '검색 결과가 없습니다.'}
          </Tab.Item>
          <Tab.Item title="계정" index="user">
            {searchData.user
              ? searchData.user.map((data) => {
                  return <div key={data._id}>{data.fullName}</div>;
                })
              : '검색 결과가 없습니다.'}
          </Tab.Item>
        </Tab>
      </div>
    </div>
  );
};

export default SearchPage;
