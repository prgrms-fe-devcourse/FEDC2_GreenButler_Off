import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import Button from 'components/basic/Button';
import UploadImage from 'components/UploadImage';
import TagAddForm from 'components/TagAddForm';
import theme from 'styles/theme';
import PageWrapper from 'components/basic/pageWrapper';
import FixedContainer from 'components/FixedContainer';

const { fontNormal, borderNormal, mainBlack } = theme.color;

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
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyYTc1ZTVjYjFiOTBiMGM4MTJjOWI3MCIsImVtYWlsIjoiMzI1QG5hdmVyLmNvbSJ9LCJpYXQiOjE2NTUxMzYyMTd9.w4YDSceQD83VMiKaTnJYEmcDEKNQAWT1Al9iyFGEL74`,
  };

  const result = await axios.post(`/posts/create`, formData, { headers });
  console.log(result);
};

const PostAddPage = () => {
  const [tags, setTags] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const onAddTag = useCallback(
    (value) => {
      const tag = `#${value}`;
      if (tags.length < 5) {
        setTags([...tags, tag]);
      }
    },
    [tags],
  );

  const onRemoveTag = useCallback(
    (index) => {
      const updateTags = tags.filter((_, itemIndex) => itemIndex !== index);
      setTags(updateTags);
    },
    [tags],
  );

  const onClickAddBtn = async () => {
    await handleDataForm({ text, tags, imgSrc });
    navigate('/');
  };

  const onFileChange = useCallback((src) => {
    setImgSrc(src);
  }, []);

  return (
    <>
<<<<<<< HEAD
      <PageWrapper title="게시물 등록" header prev style={{ paddingBottom: 100 }}>
=======
      <PageWrapper header style={{ paddingBottom: 100 }}>
>>>>>>> ff4dd2897e42ce04b14f16827b3ccb8805c78865
        <UploadImage onChange={onFileChange} />

        <TagAddForm onAddTag={onAddTag} onRemoveTag={onRemoveTag} tags={tags} />
        <TextArea
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="내 식물의 성장 글을 작성해주세요."
          rows={10}
        ></TextArea>
        <FixedContainer bottom>
          <Button style={{ marginTop: '15px', marginBottom: '15px' }} onClick={onClickAddBtn}>
            게시물 등록
          </Button>
        </FixedContainer>
      </PageWrapper>
    </>
  );
};

export default PostAddPage;
