import Icon from 'components/basic/Icon';
import Text from 'components/basic/Text';
import levels from 'utils/functions/userLevel/levels';
import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import theme from 'styles/theme';

const { fontNormal, fontBlack, backgroundLight, fontDark } = theme.color;

const ModalContainer = styled.div`
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
const Strong = styled.span`
  font-weight: bold;
  color: ${fontBlack};
`;
const LevelModal = ({ onClose }) => {
  return (
    <ModalContainer>
      <CloseButton name="CLOSE" size={30} onClick={onClose} />
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
    </ModalContainer>
  );
};

export default LevelModal;
