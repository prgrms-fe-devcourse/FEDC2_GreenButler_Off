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
import useLocalToken from 'hooks/useLocalToken';
import { addPost } from 'utils/apis/postApi';

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
  formData.append('channelId', '62a04aa2703fdd3a82b4e66e');

  return formData;
};

const PostAddPage = () => {
  const [tags, setTags] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const [storedValue, setValue] = useLocalToken();

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
    const formData = await handleDataForm({ text, tags, imgSrc });
    const token = storedValue;

    if (token) {
      const result = await addPost(token, formData);
      console.log(result);
    }
    navigate('/');
  };

  const onFileChange = useCallback((src) => {
    setImgSrc(src);
  }, []);

  return (
    <>
      <PageWrapper header style={{ paddingBottom: 100 }}>
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
