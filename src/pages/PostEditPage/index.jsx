import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, UploadImage, TagAddForm, PageWrapper, FixedContainer, Modal } from 'components';
import { PostTextArea } from 'components';
import useLocalToken from 'hooks/useLocalToken';
import { channelId, addPost, updatePost } from 'utils/apis/postApi';
import { imageToFile, objectToForm } from 'utils/functions/converter';
import theme from 'styles/theme';

const { headerHeight } = theme.value;

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

const page = {
  create: {
    name: 'create',
    title: '게시물 등록',
  },
  edit: {
    name: 'edit',
    title: '게시물 수정',
  },
};

const PostEditPage = () => {
  const [tags, setTags] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [content, setContent] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [token, setValue] = useLocalToken();
  const [defaultImg, setDefaultImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.split('/')[2]; // 페이지 구분

  const { id } = useParams();

  const injectState = (post) => {
    const title = JSON.parse(post.title);

    setContent(title.content);
    setTags(title.tags);
    setDefaultImg(post.image);
  };

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
    if (!token) {
      return;
    }

    setIsLoading(true);

    if (currentPage === page.create.name) {
      if (!imgSrc || !content) {
        setModalMessage(!imgSrc ? '이미지를 등록해주세요!' : '게시글을 작성해주세요!');
        setIsModal(true);
        return;
      }
      const title = JSON.stringify({ content, tags });
      const ImageBlob = imageToFile(imgSrc);
      const formData = await objectToForm({
        title,
        image: ImageBlob,
        channelId: channelId,
      });
      await addPost(token, formData);
      navigate('/');
    }

    if (currentPage === page.edit.name) {
      if (!content) {
        setModalMessage('게시글을 작성해주세요!');
        setIsModal(true);
        return;
      }

      const title = JSON.stringify({ content, tags });
      const ImageBlob = imgSrc ? imageToFile(imgSrc) : null;
      const formData = await objectToForm({
        postId: id,
        title,
        image: ImageBlob,
        channelId: channelId,
      });
      await updatePost(token, formData);
      navigate('/');
    }

    setIsLoading(false);
  };

  const onChangeFile = useCallback((src) => {
    setImgSrc(src);
  }, []);

  const onChangeContent = useCallback((value) => {
    setContent(value);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsModal(false);
  }, []);

  useEffect(() => {
    if (currentPage === 'edit') {
      location.state?.post ? injectState(location.state.post) : navigate('/');
      // state로 받은 post가 없다면 홈으로 이동
    }
  }, [currentPage, location.state?.post]);

  return (
    <>
      <PageFixed title={page[currentPage].title} header prev>
        <UploadImage onChange={onChangeFile} defaultImage={defaultImg} />
        <TagAddForm onAddTag={onAddTag} onRemoveTag={onRemoveTag} tags={tags} />
        <PostTextArea
          onChange={onChangeContent}
          placeholder="내 식물의 성장 글을 작성해주세요."
          value={content}
          rows={10}
        ></PostTextArea>
        <FixedContainer bottom style={{ padding: 15 }}>
          <Button onClick={onClickAddBtn} disabled={isLoading}>
            {page[currentPage].title}
          </Button>
        </FixedContainer>
        <Modal visible={isModal} onClose={onCloseModal}>
          <Modal.Content title={modalMessage} />
          <Modal.Button onClick={onCloseModal}>확인</Modal.Button>
        </Modal>
      </PageFixed>
    </>
  );
};

export default PostEditPage;
