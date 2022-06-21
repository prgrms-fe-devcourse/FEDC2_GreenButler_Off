import styled from '@emotion/styled';
import theme from 'styles/theme';
import Card from 'components/Card';
import displayedAt from 'utils/functions/displayedAt';

const NotificationCard = ({
  notificationId,
  postId,
  message,
  fullName,
  userId,
  isSeen,
  img,
  createdAt,
}) => {
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
  return (
    <CardWrapper>
      <Card src={img} fullName={fullName} message={message}>
        <span>{displayedAt(createdAt)}</span>
      </Card>
    </CardWrapper>
  );
};

export default NotificationCard;
