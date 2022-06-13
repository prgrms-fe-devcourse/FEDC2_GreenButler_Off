import styled from '@emotion/styled';
import axios from 'axios';
import Button from 'components/basic/Button';
import Image from 'components/basic/Image';
import InputForm from 'components/basic/Input/InputForm';
import Text from 'components/basic/Text';
import { useRef, useState } from 'react';
import theme from 'styles/theme';

const { fontNormal, mainGreen, backgroundGreen, borderNormal, mainBlack } =
  theme.color;

const ImageLoad = styled.div`
  width: 100%;
  background-color: ${backgroundGreen};
  position: relative;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const ImageInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: 100%;
  background-color: white;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const TagItem = styled.li`
  padding: 5px 13px;
  border: 1px solid ${mainGreen};
  border-radius: 15px;
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
  color: ${mainBlack};

  ::placeholder {
    color: ${fontNormal};
  }
`;

const handleDataForm = async ({ text, tags, imgSrc }) => {
  // 변환한 데이터 앞 부분 자르기
  const byteString = atob(imgSrc.split(',')[1]);
  const title = { content: text, tags };

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ia], {
    type: 'image/jpeg',
  });

  const formData = new FormData();
  formData.append('image', blob);
  formData.append('title', JSON.stringify(title));
  formData.append('channelId', process.env.REACT_APP_CHANNEL_ID_TOTAL);

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyYTc1ZTVjYjFiOTBiMGM4MTJjOWI3MCIsImVtYWlsIjoiMzI1QG5hdmVyLmNvbSJ9LCJpYXQiOjE2NTUxMzYyMTd9.w4YDSceQD83VMiKaTnJYEmcDEKNQAWT1Al9iyFGEL74',
  };

  const result = await axios.post(`/posts/create`, formData, { headers });
  console.log(result);
};

const RemoveBtn = styled.button``;

const PostAddPage = () => {
  const [tags, setTags] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [text, setText] = useState('');

  const onSubmit = (value) => {
    setTags((state) => [...state, value]);
  };

  const onRemoveTag = (index) => {
    const updateTags = tags.filter((_, itemIndex) => itemIndex !== index);
    setTags(updateTags);
  };

  const onClickAddBtn = () => {
    handleDataForm({ text, tags, imgSrc });
  };

  const onFileReader = (e) => {
    const fileBlob = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
  };

  return (
    <>
      <ImageLoad>
        <ImageInner style={{ backgroundImage: `url(${imgSrc})` }} />
      </ImageLoad>
      <input type="file" id="file" onChange={onFileReader} />

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
            <RemoveBtn onClick={() => onRemoveTag(index)}>x</RemoveBtn>
          </TagItem>
        ))}
      </TagList>
      <TextArea
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="내 식물의 성장 글을 작성해주세요."
        rows={10}
      ></TextArea>
      <Button
        style={{ marginTop: '15px', marginBottom: '15px' }}
        onClick={onClickAddBtn}
      >
        게시물 등록
      </Button>
    </>
  );
};

export default PostAddPage;
