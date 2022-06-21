import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tab from 'components/basic/Tab';
import InputForm from 'components/InputForm';
import PageWrapper from 'components/basic/pageWrapper';
import TagSearchResult from 'components/TagSearchResult';
import UserSearchResult from 'components/UserSearchResult';
import Icon from 'components/basic/Icon';
import { searchUsers } from 'utils/apis/userApi';
import { searchTag } from 'utils/apis/postApi';
import theme from 'styles/theme';

const TAG = 'tag';
const USER = 'user';

const { backgroundLight } = theme.color;

const SearchPage = () => {
  const [currentTab, setCurrentTab] = useState(TAG);
  const [inputValue, setInputValue] = useState('');
  const [searchData, setSearchData] = useState({
    keyword: '',
    [TAG]: null,
    [USER]: null,
  });

  const navigate = useNavigate();
  const { searchKeyword } = useParams();

  const onSearch = useCallback(
    async (keyword) => {
      if (currentTab === TAG) {
        const { data } = await searchTag(keyword);
        setSearchData((state) => ({ ...state, tag: data, keyword }));
      }

      if (currentTab === USER) {
        const { data } = await searchUsers(keyword);
        setSearchData((state) => ({ ...state, user: data, keyword }));
      }
    },
    [currentTab],
  );

  const onActive = useCallback((value) => {
    setCurrentTab(value);
  }, []);

  const onSubmit = useCallback(() => {
    if (inputValue === '') {
      return;
    }

    navigate(`/search/${inputValue}`);
  }, [onSearch, inputValue]);

  useEffect(() => {
    if (searchData.keyword && searchData[currentTab] === null) {
      onSearch(searchData.keyword);
    }
  }, [currentTab]);

  useEffect(() => {
    setSearchData({ keyword: '', [TAG]: null, [USER]: null });

    if (searchKeyword) {
      onSearch(searchKeyword);
      setInputValue(searchKeyword);
      return;
    }

    setInputValue('');
  }, [searchKeyword]);

  return (
    <PageWrapper header nav info>
      <InputForm
        onSubmit={onSubmit}
        style={{ marginTop: '15px', backgroundColor: backgroundLight, border: 0 }}
      >
        <Icon name="SEARCH_GRAY" size={27} style={{ marginLeft: 10 }} />
        <InputForm.Input
          placeholder="검색어를 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </InputForm>

      <Tab onActive={onActive}>
        <Tab.Item title="태그" index={TAG}>
          <TagSearchResult posts={searchData.tag} isSearch={!!searchData[TAG]} />
        </Tab.Item>
        <Tab.Item title="계정" index={USER}>
          <UserSearchResult users={searchData.user} isSearch={!!searchData[USER]} />
        </Tab.Item>
      </Tab>
    </PageWrapper>
  );
};

export default SearchPage;
