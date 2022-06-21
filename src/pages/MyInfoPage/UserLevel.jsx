import styled from '@emotion/styled';
import theme from 'styles/theme';
import { useEffect } from 'react';
import { getUser } from 'utils/apis/userApi';
import { useUserContext } from 'contexts/UserContext';
import { useState } from 'react';
import { Modal, Text } from 'components';
import getUserLevel from 'utils/functions/userLevel/getUserLevel';
import { useCallback } from 'react';
import LevelModal from './LevelModal';

const { mainGreen, mainWhite, fontNormal, fontBlack } = theme.color;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 40px;
  margin-bottom: 50px;
`;

const MyLevel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  position: absolute;
  top: -16px;
  font-size: 18px;
  text-align: center;
  color: ${mainWhite};
  border-radius: 30px;
  background-color: ${mainGreen};
  font-weight: 500;
`;

const MyHistory = styled.ul`
  width: 80%;
  display: flex;
  background-color: #f0f9f7;
  border-radius: 30px;
  padding: 25px;
  justify-content: space-around;
`;

const HistoryItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const HistoryTitle = styled.span`
  font-size: 16px;
  color: ${fontNormal};
`;

const HistoryCount = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${mainGreen};
  margin-top: 10px;
`;

const CurrentScore = styled(Text)`
  margin-top: 24px;
  cursor: pointer;
`;

const LevelIcon = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  background-color: white;
  background-image: ${({ src }) => src && `URL(${src})`};
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
`;

const UserLevel = () => {
  const { currentUser } = useUserContext();
  const [userData, setUserData] = useState({
    post: 0,
    comment: 0,
    follower: 0,
    currentLevel: null,
    currentScore: 0,
  });

  const [isModal, setIsModal] = useState(false);

  const getUserInfo = async (userId) => {
    const result = await getUser(userId).then((res) => res.data);
    const { score, level } = getUserLevel({
      posts: result.posts,
      comments: result.comments,
      followers: result.followers,
    });

    setUserData({
      post: result.posts.length,
      comment: result.comments.length,
      follower: result.followers.length,
      currentLevel: level,
      currentScore: score,
    });
  };

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      getUserInfo(currentUser.id);
    }
  }, [currentUser.id]);

  return (
    <LevelContainer>
      {userData.currentLevel && (
        <MyLevel>
          <LevelIcon src={userData.currentLevel.image} />
          {userData.currentLevel?.name}
        </MyLevel>
      )}
      <MyHistory>
        <HistoryItem>
          <HistoryTitle>게시글</HistoryTitle>
          <HistoryCount>{userData.post}</HistoryCount>
        </HistoryItem>
        <HistoryItem>
          <HistoryTitle>댓글</HistoryTitle>
          <HistoryCount>{userData.comment}</HistoryCount>
        </HistoryItem>
        <HistoryItem>
          <HistoryTitle>팔로워</HistoryTitle>
          <HistoryCount>{userData.follower}</HistoryCount>
        </HistoryItem>
      </MyHistory>

      <CurrentScore fontSize={16} block>
        <Text color={fontBlack} fontSize={16} underline onClick={() => setIsModal(true)}>
          현재 활동 점수
        </Text>
        :
        <Text fontSize={16} strong style={{ marginLeft: 5 }}>
          {userData.currentScore}
        </Text>
      </CurrentScore>
      <Modal visible={isModal} onClose={closeModal}>
        <Modal.Custom>
          <LevelModal onClose={closeModal} />
        </Modal.Custom>
      </Modal>
    </LevelContainer>
  );
};

export default UserLevel;
