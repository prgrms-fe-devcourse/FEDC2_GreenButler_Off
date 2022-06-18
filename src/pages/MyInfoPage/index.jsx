import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import theme from 'styles/theme';
import Icon from 'components/basic/Icon';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';
import Button from 'components/basic/Button';
import ChangeNameForm from 'components/ChangeNameForm';
import UploadImage from 'components/UploadImage';
import { EDIT, LOGOUT, KEY, TAG_DELETE } from 'utils/constants/icons/names';
import { IMAGE_URLS } from 'utils/constants/images';

const MyInfoPage = () => {
  const { currentUser, onChangeFullName, onLogout, onChangeProfile } = useUserContext();
  const [imgSrc, setImgSrc] = useState('');
  const [isNameEditor, setIsNameEditor] = useState(false);
  const [isImageEditor, setIsImageEditor] = useState(false);
  const nameEditRef = useRef();

  const onFullNameChange = useCallback(
    (value) => {
      onChangeFullName({ fullName: value, userName: '' });
      setIsNameEditor(false);
    },
    [onChangeFullName],
  );

  const onFileChange = useCallback((src) => {
    setImgSrc(src);
  }, []);

  const onProfileSubmit = useCallback(() => {
    onChangeProfile({ image: imgSrc });
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

  return (
    <PageWrapper header prev title="내정보">
      <UserContainter>
        <UserProfile>
          {' '}
          <UserImage>
            <Avatar
              size={136}
              style={{
                cursor: 'pointer',
              }}
              src={currentUser.image || IMAGE_URLS.PROFILE_IMG}
              onClick={() => {
                setIsImageEditor(true);
              }}
            />
          </UserImage>
          {isNameEditor ? (
            <NickName ref={nameEditRef}>
              <ChangeNameForm handleSubmit={onFullNameChange} />
            </NickName>
          ) : (
            //TODO:신영 추후 이름변경 취소 백그라운드 클릭 이벤트리스너 따로 만들기, 및 컴포넌트 분리
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
              <button
                onClick={() => {
                  setIsNameEditor(true);
                }}
              >
                <Icon name={EDIT} size={18} style={{ marginTop: '5px', marginLeft: '2px' }} />
              </button>
            </NickName>
          )}
        </UserProfile>
        {/* //TODO:신영 컴포넌트 분리
         */}
        <UserDetailWrapper>
          <UserDetail>
            <Text style={{ marginLeft: '30px' }} fontSize={20}>
              Email
            </Text>
            <Text
              style={{
                marginLeft: '10px',
              }}
              fontSize={20}
              color={theme.color.fontNormal}
            >
              {currentUser.email}
            </Text>
          </UserDetail>
          <Link to="/user/myInfo/edit">
            <UserDetail>
              <Icon
                name={KEY}
                size={18}
                style={{
                  marginTop: '2px',
                  marginLeft: '28px',
                  marginRight: '10px',
                }}
              />
              <Text fontSize={18}>비밀번호 변경하기</Text>
            </UserDetail>
          </Link>
          <UserDetail onClick={onLogout}>
            <Icon
              name={LOGOUT}
              size={18}
              style={{
                marginTop: '2px',
                marginLeft: '28px',
                marginRight: '10px',
              }}
            />
            <Text fontSize={18}>로그아웃</Text>
          </UserDetail>{' '}
        </UserDetailWrapper>
        {/*   //TODO:신영 Modal 추후 refactor/MyPagesBasic 작업시 교체 및 분리
         */}
        {isImageEditor && (
          <Modal>
            <Icon
              name={TAG_DELETE}
              onClick={() => {
                setIsImageEditor(false);
              }}
            />
            <Text>프로필을 변경하시겠습니까?</Text>
            <UploadImage
              onChange={onFileChange}
              style={{ borderRadius: '50%', overflow: 'hidden', width: '140px' }}
            />{' '}
            <Button
              onClick={() => {
                setIsImageEditor(false);
                imgSrc && onProfileSubmit();
              }}
            >
              확인
            </Button>
          </Modal>
        )}
      </UserContainter>
    </PageWrapper>
  );
};

export default MyInfoPage;

const UserContainter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`;

const UserProfile = styled.div`
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
  margin: 5px 0 0 0;
  position: relative;
  cursor: pointer;
`;

const UserDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0 0 0;

  > div:first-of-type {
    border-top: 1px solid ${theme.color.borderLight};
  }

  > div:nth-of-type(n + 2) {
    cursor: pointer;
  }
  padding-bottom: 90px;
`;

const UserDetail = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${theme.color.borderLight};
  display: flex;
  align-items: center;
`;

const Modal = styled.div`
  background-color: ${theme.color.mainWhite};
  width: 100%;
  height: 500px;
  position: absolute;
  bottom: 70px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid ${theme.color.borderLight};
  box-sizing: border-box;
  padding: 22px 80px;
  align-items: center;
  justify-content: space-around;
`;
