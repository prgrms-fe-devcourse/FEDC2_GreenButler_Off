import { useEffect, useState, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { Avatar, Text, Icon } from 'components';
import { EDIT } from 'utils/constants/icons/names';
import { IMAGE_URLS } from 'utils/constants/images';
import ChangeNameForm from 'components/ChangeNameForm';
import { useUserContext } from 'contexts/UserContext';
import ChangeProfileModal from 'components/ChangeProfileModal';

const UserProfile = () => {
  const { currentUser, onChangeFullName, onChangeProfile } = useUserContext();
  const [isNameEditor, setIsNameEditor] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const nameEditRef = useRef();

  const onFileChange = useCallback((src) => {
    setImgSrc(src);
  }, []);

  const onProfileSubmit = useCallback(() => {
    if (imgSrc) {
      onChangeProfile({ image: imgSrc });
    }
  }, [imgSrc, onChangeProfile]);

  const handleCloseEditor = (e) => {
    const isOutClick =
      isNameEditor &&
      !e.target.matches('img') &&
      (!nameEditRef.current || !nameEditRef.current.contains(e.target));

    if (isOutClick) {
      setIsNameEditor(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseEditor);
    return () => {
      window.removeEventListener('click', handleCloseEditor);
    };
  }, [isNameEditor]);

  const onCloseProfile = () => {
    setIsProfileModal(false);
  };

  const onFullNameChange = useCallback(
    (value) => {
      onChangeFullName({ fullName: value, userName: '' });
      setIsNameEditor(false);
    },
    [onChangeFullName],
  );

  return (
    <UserProfileWrapper>
      {' '}
      <UserImage>
        <Avatar
          size={136}
          style={{
            cursor: 'pointer',
          }}
          src={currentUser.image || IMAGE_URLS.PROFILE_IMG}
          onClick={() => {
            setIsProfileModal(true);
          }}
        />
      </UserImage>
      {isNameEditor ? (
        <NickName ref={nameEditRef}>
          <ChangeNameForm handleSubmit={onFullNameChange} />
        </NickName>
      ) : (
        <NickName>
          <Text
            style={{
              display: 'block',
              fontWeight: 500,
              lineHeight: '34.75px',
              cursor: 'pointer',
            }}
            fontSize={24}
          >
            {currentUser.fullName}
          </Text>
          <Icon.Button
            name={EDIT}
            size={18}
            style={{ marginTop: '5px', marginLeft: '2px' }}
            onClick={() => {
              setIsNameEditor(true);
            }}
          />
        </NickName>
      )}{' '}
      {isProfileModal && (
        <ChangeProfileModal
          onFileChange={onFileChange}
          onProfileSubmit={onProfileSubmit}
          onClose={onCloseProfile}
        />
      )}
    </UserProfileWrapper>
  );
};

export default UserProfile;

const UserProfileWrapper = styled.div`
  text-align: center;
  margin: 50px auto 30px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserImage = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  background-color: white;
`;

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 15px 0 0 0;
  position: relative;
  cursor: pointer;
`;
