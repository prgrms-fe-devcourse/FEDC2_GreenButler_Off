import styled from '@emotion/styled';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBtn from './IconButton';
import Profile from 'components/Profile';
import { useUserContext } from 'contexts/UserContext';
import Modal from 'components/Modal';
import theme from 'styles/theme';

const PostHeader = ({ author: { _id, image, fullName }, isDetailPage }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const handleProfileClick = useCallback(() => {
    navigate('/user/mypage', {
      state: {
        userId: _id,
      },
    });
  }, [navigate, _id]);

  const handleMoreClick = useCallback(() => {
    setIsModal(true);
  }, []);

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
                  <UpdatePostButton>수정</UpdatePostButton>
                  <DeletePostButton>삭제</DeletePostButton>
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
`;

const UpdatePostButton = styled.button`
  padding-top: 44px;
  padding-bottom: 9.5px;
`;

const DeletePostButton = styled.button`
  padding-top: 9.5px;
  padding-bottom: 35px;
  color: ${theme.color.mainRed};
`;

export default PostHeader;
