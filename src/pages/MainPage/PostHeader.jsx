import styled from '@emotion/styled';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBtn from './IconButton';
import Profile from 'components/Profile';
import { useUserContext } from 'contexts/UserContext';
import Modal from 'components/Modal';
import theme from 'styles/theme';
import { deletePost } from 'utils/apis/postApi';
import useLocalToken from 'hooks/useLocalToken';

const PostHeader = ({ post, isDetailPage }) => {
  const {
    _id: postId,
    author: { _id, image, fullName },
  } = post;
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [localToken] = useLocalToken();

  const handleProfileClick = useCallback(() => {
    navigate(`/user/${_id}`, {
      state: {
        userId: _id,
      },
    });
  }, [navigate, _id]);

  const handleMoreClick = useCallback(() => {
    setIsModal(true);
  }, []);

  const handleUpdateClick = useCallback(() => {
    setIsModal(false);
    navigate(`/post/edit/${postId}`, {
      state: {
        post,
      },
    });
  }, [postId, post, navigate]);

  const handleDeleteClick = useCallback(async () => {
    setIsModal(false);
    if (localToken && postId) {
      await deletePost(localToken, postId);
      navigate(-1);
    }
  }, [localToken, postId, navigate]);

  const onClose = useCallback(() => {
    setIsModal(false);
  }, []);

  const isMyPost = useMemo(() => {
    return _id === currentUser.id && isDetailPage;
  }, [_id, currentUser.id, isDetailPage]);

  return (
    <>
      <Header>
        <Profile src={image} userName={fullName} onClick={handleProfileClick} />
        {isMyPost && (
          <>
            <IconBtn name="MORE" size={20} onClick={handleMoreClick} />
            <Modal visible={isModal} onClose={onClose}>
              <Modal.Custom>
                <Buttons>
                  <UpdatePostButton onClick={handleUpdateClick}>수정</UpdatePostButton>
                  <DeletePostButton onClick={handleDeleteClick}>삭제</DeletePostButton>
                </Buttons>
              </Modal.Custom>
            </Modal>
          </>
        )}
      </Header>
    </>
  );
};

const Header = styled.header`
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  background-color: ${theme.color.mainWhite};
  position: absolute;
  bottom: 0%;
  width: 100%;
  border-radius: 15px 15px 0 0;

  & > button {
    width: 100%;
    font-size: 24px;
    line-height: 29px;
  }

  @media screen and (max-width: 500px) {
    width: 100vw;
  }
`;

const UpdatePostButton = styled.button`
  padding-top: 44px;
  padding-bottom: 9.5px;

  @media screen and (max-width: 500px) {
    padding-top: 24px;
  }
`;

const DeletePostButton = styled.button`
  padding-top: 9.5px;
  padding-bottom: 35px;
  color: ${theme.color.mainRed};

  @media screen and (max-width: 500px) {
    padding-bottom: 20px;
  }
`;

export default PostHeader;
