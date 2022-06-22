import styled from '@emotion/styled';
import { Avatar, Text } from 'components';
import { IMAGE_URLS } from 'utils/constants/images';

const Profile = ({
  src = IMAGE_URLS.PROFILE_IMG,
  size = 60,
  gap = '12px',
  color,
  fontSize = 22,
  userName,
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <Avatar src={src} alt="유저 프로필 이미지" size={size} />
      <Div gap={gap}>
        <Text color={color} fontSize={fontSize} fontWeight={500}>
          {userName}
        </Text>
        {children}
      </Div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ gap }) => gap};
`;

export default Profile;
