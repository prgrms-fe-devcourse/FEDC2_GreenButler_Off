import { useCallback, useEffect, useState } from 'react';
import Tab from 'components/basic/Tab';
import InputForm from 'components/basic/Input/InputForm';
import PageWrapper from 'components/basic/pageWrapper';
import TagSearchResult from 'components/TagSearchResult';
import UserSearchResult from 'components/UserSearchResult';
import { searchUsers } from 'utils/apis/userApi';
import { searchTag } from 'utils/apis/postApi';

const TAG = 'tag';
const USER = 'user';

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
        const { data } = await searchTag(keyword);
        setSearchData((state) => ({ ...state, tag: data, keyword }));
        console.log(data);
      }

      if (currentTab === USER) {
        const { data } = await searchUsers(keyword);
        setSearchData((state) => ({ ...state, user: data, keyword }));
        console.log(data);
      }
    },
    [currentTab],
  );

  const onActive = useCallback((value) => {
    setCurrentTab(value);
  }, []);

  const onSubmit = useCallback(
    (keyword) => {
      setSearchData({ keyword: '', [TAG]: null, [USER]: null });
      onSearch(keyword);
    },
    [onSearch],
  );

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
