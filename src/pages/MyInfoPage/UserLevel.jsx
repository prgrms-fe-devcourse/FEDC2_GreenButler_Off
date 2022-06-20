import Icon from 'components/basic/Icon';
import Text from 'components/basic/Text';
import { levels } from 'utils/functions/userLevel/levels';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import { useEffect } from 'react';
import { getUser } from 'utils/apis/userApi';
import { useUserContext } from 'contexts/UserContext';
import { useState } from 'react';
import Image from 'components/basic/Image';
import Modal from 'components/Modal';
import Profile from 'components/Profile';
import Avatar from 'components/basic/Avatar';

const { mainGreen, mainWhite, fontNormal, fontBlack, backgroundLight, fontDark } = theme.color;

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
  background-image: url(https://user-images.githubusercontent.com/81489300/174669864-832f9df6-7ae6-41c1-93df-1e9d4b6e50bb.svg);
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
`;

const Strong = styled.span`
  font-weight: bold;
  color: ${fontBlack};
`;

const LevelModal = styled.div`
  width: 100%;
  background-color: white;
  max-width: 370px;
  border-radius: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 25px;
`;

const CloseButton = styled(Icon.Button)`
  position: absolute;
  right: 20px;
`;

const ScoreDescription = styled.div`
  font-size: 14px;
  background-color: ${backgroundLight};
  border-radius: 10px;
  padding: 16px;
  line-height: 24px;
  margin-top: 20px;
  color: ${fontDark};
`;
const LevelList = styled.ul`
  margin: 20px 0 20px;

  li:not(:first-of-type) {
    margin-top: 20px;
  }
`;

const LevelItem = styled.li`
  display: flex;
  align-items: center;
`;

const LevelInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
`;
const LevelName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
const LevelDescription = styled.span`
  font-size: 14px;
  margin-top: 8px;
  color: ${fontNormal};
`;

const UserLevel = () => {
  const { currentUser } = useUserContext();
  const [userData, setUserData] = useState({ post: 0, comment: 0, follower: 0 });
  const [isModal, setIsModal] = useState(false);

  const getUserInfo = async (userId) => {
    const result = await getUser(userId).then((res) => res.data);
    setUserData({
      post: result.posts.length,
      comment: result.comments.length,
      follower: result.followers.length,
    });
    console.log(result);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (currentUser.id) {
      getUserInfo(currentUser.id);
    }
  }, [currentUser.id]);

  return (
    <LevelContainer>
      <MyLevel>
        <LevelIcon />
        초록집사
      </MyLevel>
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
          999
        </Text>
      </CurrentScore>
      <Modal visible={isModal} onClose={closeModal}>
        <Modal.Custom>
          <LevelModal>
            <CloseButton name="CLOSE" size={30} onClick={closeModal} />
            <Text fontSize={22} block strong style={{ marginTop: 30 }}>
              활동 점수
            </Text>
            <Text block fontSize={16} style={{ marginTop: 12 }}>
              활동 점수에 따라 등급이 부여됩니다.
            </Text>
            <ScoreDescription>
              게시물 등록 시 <Strong>+2점</Strong>, 댓글 등록 시 <Strong>+1점</Strong>,<br />
              다른 사람이 나를 팔로우 할 시 <Strong>+1점</Strong>
            </ScoreDescription>
            <LevelList>
              {levels.map((level, index) => (
                <LevelItem key={index}>
                  <Avatar
                    src={level.image}
                    size={50}
                    alt={level.name}
                    style={{ backgroundColor: level.color, border: 0 }}
                  />
                  <LevelInfo>
                    <LevelName>{level.name}</LevelName>
                    <LevelDescription>{level.description}</LevelDescription>
                  </LevelInfo>
                </LevelItem>
              ))}
            </LevelList>
          </LevelModal>
        </Modal.Custom>
      </Modal>
    </LevelContainer>
  );
};

export default UserLevel;
