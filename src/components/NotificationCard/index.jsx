import styled from '@emotion/styled';
import theme from 'styles/theme';
import { Avatar, Text } from 'components';
import { IMAGE_URLS } from 'utils/constants/images';
import { setNotificationSeen } from 'utils/apis/postApi';
import useLocalToken from 'hooks/useLocalToken';

const NotificationText = styled(Text)`
  margin-bottom: 7px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ gap }) => gap};
`;

const CardWrapper = styled.div`
  background-color: ${theme.color.mainWhite};
  width: 100%;
  height: 129px;
  border-radius: 15px;
  padding: 35px 65px 35px 30px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const NotificationCard = ({
  size = 60,
  gap = '25px',
  color,
  fontSize = 18,
  fullName,
  isSeen,
  message,
  children,
  img = IMAGE_URLS.PROFILE_IMG,
  ...props
}) => {
  const [token] = useLocalToken();
  const handleClick = async () => {
    await setNotificationSeen(token);
  };
  return (
    !isSeen && (
      <CardWrapper onClick={handleClick}>
        <Container {...props}>
          <Avatar src={img} alt="유저 프로필 이미지" size={size} />
          <Div gap={gap}>
            <NotificationText
              style={{ wordBreak: 'keep-all' }}
              color={color}
              lineHeight={'24.52px'}
            >
              <Text fontWeight={600} fontSize={fontSize}>
                {fullName}
              </Text>
              <Text fontSize={fontSize}>{message}</Text>
            </NotificationText>
            <Text color={theme.color.fontNormal} fontSize={16}>
              {children}
            </Text>
          </Div>
        </Container>
      </CardWrapper>
    )
  );
};

export default NotificationCard;
