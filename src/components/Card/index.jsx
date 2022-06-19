import styled from '@emotion/styled';
import Avatar from 'components/basic/Avatar';
import Text from 'components/basic/Text';
import { IMAGE_URLS } from 'utils/constants/images';
import theme from 'styles/theme';
const Card = ({
  src = IMAGE_URLS.PROFILE_IMG,
  size = 60,
  gap = '25px',
  color,
  fontSize = 18,
  fullName,
  message,
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <Avatar src={src} alt="유저 프로필 이미지" size={size} />
      <Div gap={gap}>
        <NotificationText color={color} lineHeight={'24.52px'}>
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
  );
};

const NotificationText = styled(Text)`
  margin-bottom: 7px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ gap }) => gap};
`;

export default Card;
