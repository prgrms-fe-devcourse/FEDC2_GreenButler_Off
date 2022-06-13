import styled from '@emotion/styled';
import Button from 'components/basic/Button';
import Image from 'components/basic/Image';
import InputForm from 'components/basic/Input/InputForm';
import Text from 'components/basic/Text';
import { useState } from 'react';
import theme from 'styles/theme';

const { fontNormal, mainGreen, backgroundGreen, borderNormal } = theme.color;

const ImageLoad = styled.div`
  width: 100%;
  background-color: ${backgroundGreen};

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const TagItem = styled.li`
  padding: 5px 13px;
  border: 1px solid ${mainGreen};
  border-radius: 15px;
  color: ${mainGreen};
  white-space: nowrap;
  margin: 0 4px 4px 0;
`;

const TextArea = styled.textarea`
  margin-top: 20px;
  width: 100%;
  border: 1px solid ${borderNormal};
  border-radius: 15px;
  padding: 23px 20px;
  resize: none;
  font-size: 20px;
  color: ${fontNormal};

  ::placeholder {
    color: ${fontNormal};
  }
`;

const PostAddPage = () => {
  const [tags, setTags] = useState([]);

  const onSubmit = (value) => {
    setTags((state) => [...state, value]);
    console.log(value);
  };
  return (
    <>
      <ImageLoad></ImageLoad>
      <InputForm
        name="tag"
        placeholder="태그를 입력해 주세요"
        enterButton="등록"
        fontSize="18px"
        onSubmit={onSubmit}
        style={{ marginTop: '15px' }}
      />
      <Text
        fontSize={16}
        color={fontNormal}
        block
        style={{ marginTop: '15px', marginBottom: '15px' }}
      >
        * 태그는 최대 5개까지 입력 가능합니다.
      </Text>

      <TagList>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            {tag}
            <button>x</button>
          </TagItem>
        ))}
      </TagList>
      <TextArea
        placeholder="내 식물의 성장 글을 작성해주세요."
        rows={10}
      ></TextArea>
      <Button style={{ marginTop: '15px', marginBottom: '15px' }}>
        게시물 등록
      </Button>
    </>
  );
};

export default PostAddPage;
