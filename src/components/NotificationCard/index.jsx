import Profile from 'components/Profile';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import Card from 'components/Card';
const NotificationCard = ({ notificationId, postId, message, fullName, userId, isSeen, img }) => {
  const CardWrapper = styled.div`
    background-color: ${theme.color.mainWhite};
    width: 100%;
    height: 129px;
    border-radius: 15px;
    padding: 35px 80px 35px 30px;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
  `;
  return (
    <CardWrapper>
      <Card src={img} fullName={fullName} message={message}>
        <span>1분 전</span>
      </Card>
    </CardWrapper>
  );
};

export default NotificationCard;
