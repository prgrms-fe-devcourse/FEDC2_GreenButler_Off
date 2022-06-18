import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/basic/Button';
import UploadImage from 'components/UploadImage';
import TagAddForm from 'components/TagAddForm';
import PageWrapper from 'components/basic/pageWrapper';
import FixedContainer from 'components/FixedContainer';
import useLocalToken from 'hooks/useLocalToken';
import { addPost } from 'utils/apis/postApi';
import theme from 'styles/theme';
import Modal from 'components/Modal';

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

const srcToBlob = (imgSrc) => {
  const byteString = atob(imgSrc.split(',')[1]);

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ia], {
    type: 'image/jpeg',
  });

  return blob;
};

const handleDataForm = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return formData;
};

const PostAddPage = () => {
  const [tags, setTags] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const [token, setValue] = useLocalToken();

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
    if (!imgSrc || !content) {
      setModalMessage(!imgSrc ? '이미지를 등록해주세요!' : '게시글을 작성해주세요!');
      setShowModal(true);
      return;
    }

    const ImageBlob = srcToBlob(imgSrc);
    const title = JSON.stringify({ content, tags });
    const formData = await handleDataForm({
      title,
      image: ImageBlob,
      channelId: '62a04aa2703fdd3a82b4e66e',
    });

    if (token) {
      const result = await addPost(token, formData);
      console.log(result);
    }
    navigate('/');
  };

  const onFileChange = useCallback((src) => {
    setImgSrc(src);
  }, []);

  const onCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <PageWrapper title="게시물 등록" header prev style={{ paddingBottom: 100 }}>
        <UploadImage onChange={onFileChange} />

        <TagAddForm onAddTag={onAddTag} onRemoveTag={onRemoveTag} tags={tags} />
        <TextArea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="내 식물의 성장 글을 작성해주세요."
          rows={10}
        ></TextArea>
        <FixedContainer bottom style={{ padding: 15 }}>
          <Button onClick={onClickAddBtn}>게시물 등록</Button>
        </FixedContainer>
        <Modal visible={showModal} onClose={onCloseModal}>
          <Modal.Content title={modalMessage} />
          <Modal.Button onClick={onCloseModal}>확인</Modal.Button>
        </Modal>
      </PageWrapper>
    </>
  );
};

export default PostAddPage;
