import InputForm from 'components/basic/Input/InputForm';
import { useState } from 'react';

import axios from 'axios';

const getSearch = async (keyword, searchType) => {
  const searchKeyword = searchType === 'tag' ? `%23${keyword}` : keyword;

  return await axios.get(`/search/all/${searchKeyword}`);
};

const SearchPage = () => {
  const [posts, setPosts] = useState([]);

  const onSearch = async (keyword) => {
    const result = await getSearch(keyword, 'tag');
    setPosts(result.data);
  };
  return (
    <div>
      <InputForm
        name="search"
        placeholder="검색어를 입력해주세요."
        onSubmit={onSearch}
      />
      <div>
        {posts.map((post) => {
          const { content, tags } = JSON.parse(post.title);
          return (
            <div key={post._id}>
              <div>
                <img src={post.image} />
              </div>
              {content} <p>{tags}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
