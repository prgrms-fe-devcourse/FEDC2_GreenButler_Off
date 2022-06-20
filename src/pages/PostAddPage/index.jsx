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

import { imageToFile, objectToForm } from 'utils/functions/converter';
import { useRef } from 'react';

const { fontNormal, borderNormal, mainBlack } = theme.color;
const { headerHeight } = theme.value;

const TextArea = styled.textarea`
  margin-top: 20px;
  width: 100%;
  border: 1px solid ${borderNormal};
  border-radius: 15px;
  padding: 23px 20px;
  resize: none;
  font-size: 20px;
  color: ${mainBlack};
  overflow: hidden;

  ::placeholder {
    color: ${fontNormal};
  }
  &:focus {
    border: 1px solid ${borderNormal};
  }
`;

const PageFixed = styled(PageWrapper)`
  position: fixed;
  overflow: auto;
  height: calc(100% - ${headerHeight});
  width: 100%;
  max-width: 500px;
  bottom: 100px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const PostAddPage = () => {
  const [tags, setTags] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [content, setContent] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const textRef = useRef();

  const handleResizeHeight = useCallback(
    (e) => {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
      setContent(e.target.value);
    },
    [textRef],
  );

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
      setIsModal(true);
      return;
    }

    const ImageBlob = imageToFile(imgSrc);
    const title = JSON.stringify({ content, tags });
    const formData = await objectToForm({
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
    setIsModal(false);
  };

  return (
    <>
      <PageFixed title="게시물 등록" header prev>
        <UploadImage onChange={onFileChange} />
        <TagAddForm onAddTag={onAddTag} onRemoveTag={onRemoveTag} tags={tags} />
        <TextArea
          ref={textRef}
          onChange={handleResizeHeight}
          placeholder="내 식물의 성장 글을 작성해주세요."
          rows={10}
        ></TextArea>

        <FixedContainer bottom style={{ padding: 15 }}>
          <Button onClick={onClickAddBtn}>게시물 등록</Button>
        </FixedContainer>
        <Modal visible={isModal} onClose={onCloseModal}>
          <Modal.Content title={modalMessage} />
          <Modal.Button onClick={onCloseModal}>확인</Modal.Button>
        </Modal>
      </PageFixed>
    </>
  );
};

export default PostAddPage;
