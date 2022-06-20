import Icon from 'components/basic/Icon';
import Text from 'components/basic/Text';
import levels from 'utils/functions/userLevel/levels';
import styled from '@emotion/styled';
import theme from 'styles/theme';

const { mainGreen, mainWhite, fontNormal } = theme.color;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const MyLevel = styled.div`
  background-color: ${mainGreen};
  width: 150px;
  text-align: center;
  padding: 10px;
  border-radius: 15px;
  color: ${mainWhite};
  font-size: 18px;
  position: absolute;
  top: -16px;
`;

const MyHistory = styled.ul`
  width: 80%;
  display: flex;
  background-color: #f0f9f7;
  border-radius: 15px;
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
`;

const UserLevel = () => {
  return (
    <LevelContainer>
      <MyLevel>초록집사</MyLevel>
      <MyHistory>
        <HistoryItem>
          <HistoryTitle>게시글</HistoryTitle>
          <HistoryCount>0</HistoryCount>
        </HistoryItem>
        <HistoryItem>
          <HistoryTitle>댓글</HistoryTitle>
          <HistoryCount>0</HistoryCount>
        </HistoryItem>
        <HistoryItem>
          <HistoryTitle>좋아요</HistoryTitle>
          <HistoryCount>0</HistoryCount>
        </HistoryItem>
      </MyHistory>

      <CurrentScore fontSize={16} block>
        현재 활동 점수 :
        <Text fontSize={16} strong>
          10
        </Text>
      </CurrentScore>
    </LevelContainer>
  );
};

export default UserLevel;
