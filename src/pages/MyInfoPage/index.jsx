import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import theme from 'styles/theme';
import Icon from 'components/basic/Icon';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';
import ChangeNameForm from 'components/ChangeNameForm';
import UploadImage from 'components/UploadImage';
import { EDIT, LOGOUT, KEY, TAG_DELETE } from 'utils/constants/icons/names';

const MyInfoPage = () => {
  const { currentUser, editFullName, onLogout } = useUserContext();
  const [imgSrc, setImgSrc] = useState('');
  const [isNameEditor, setIsNameEditor] = useState(false);
  const [isImageEditor, setIsImageEditor] = useState(false);

  const handleSubmit = useCallback(
    (value) => {
      editFullName({ payload: { fullName: value, userName: '' } });
      setIsNameEditor(false);
    },
    [editFullName],
  );

  const onFileChange = useCallback((src) => {
    setImgSrc(src);
  }, []);

  useEffect(() => {}, [handleSubmit]);

  return (
    <PageWrapper>
      <UserContainter>
        <UserInfo>
          {' '}
          <UserImage>
            <Avatar
              size={136}
              style={{
                cursor: 'pointer',
              }}
              src={
                currentUser.image ||
                `https://user-images.githubusercontent.com/79133602/173279398-ac52268b-082f-4fd2-8748-b60dad85b069.png`
              }
            />
            {isImageEditor && (
              <UploadImage
                onChange={onFileChange}
                style={{
                  width: 138,
                  borderRadius: '50%',
                  position: 'absolute',
                  left: 1,
                  bottom: 2,
                  overflow: 'hidden',
                }}
              />
            )}
            <button
              onClick={() => {
                setIsImageEditor((isImageEditor) => !isImageEditor);
              }}
            >
              <Icon
                name={isImageEditor ? TAG_DELETE : EDIT}
                size={18}
                style={{
                  marginTop: '8px',
                  marginLeft: '15px',
                  position: 'absolute',
                  right: 15,
                  bottom: 7,
                  zIndex: 2,
                }}
              />
            </button>
          </UserImage>
          {isNameEditor ? (
            <NickName>
              <ChangeNameForm handleSubmit={handleSubmit} />{' '}
              <button
                style={{ position: 'absolute', bottom: 65, right: 8 }}
                onClick={() => {
                  setIsNameEditor(false);
                }}
              >
                <Icon name={TAG_DELETE} size={18} />
              </button>
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
                fontSize={22}
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
        </UserInfo>
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

const UserImage = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  background-color: white;
  margin: 0 auto 0 auto;
`;

const UserInfo = styled.div`
  text-align: center;
  margin: 120px auto 0 auto;
  position: relative;
`;

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 20px auto 0 auto;
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
