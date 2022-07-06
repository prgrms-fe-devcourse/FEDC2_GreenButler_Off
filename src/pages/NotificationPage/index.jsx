import { NotificationCard, PageWrapper } from 'components';
import { getNotifications } from 'utils/apis/userApi';
import useLocalToken from 'hooks/useLocalToken';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import displayedAt from 'utils/functions/displayedAt';
import { setNotificationSeen } from 'utils/apis/postApi';

const NotificationsWrapper = styled.div`
  background-color: ${theme.color.backgroundLight};
  min-height: 100vh;
  margin: 0px -20px;
  padding: 30px 20px;
`;

const NotificationPage = () => {
  const [token] = useLocalToken();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const initNotifications = async () => {
      const fetchedNotifications = await getNotifications(token);
      setNotifications(
        fetchedNotifications.data.map((notification) => {
          const { userId } = notification.user;
          const { fullName, image, _id } = notification.author;
          const message =
            (notification.like && '회원님의 게시물에 하트를 눌렀어요.') ||
            (notification.comment && '회원님의 게시물에 댓글을 달았어요.') ||
            (notification.follow && '회원님의 계정을 팔로우 했습니다.');
          return {
            notificationId: notification._id,
            postId: notification.post,
            message: message ? `님이 ${message}` : undefined,
            userId: userId,
            authorId: _id,
            isSeen: notification.seen,
            fullName: fullName,
            img: image,
            createdAt: notification.createdAt,
          };
        }),
      );
    };
    initNotifications();
    return () => {
      const readNotifications = async () => {
        setNotificationSeen(token);
      };
      readNotifications();
    };
  }, []);
  return (
    <>
      <PageWrapper title="알림" header prev>
        <NotificationsWrapper>
          {notifications.map(
            ({ notificationId, postId, fullName, message, authorId, isSeen, img, createdAt }) =>
              message &&
              (postId ? (
                <Link to={`/post/detail/${postId}`} key={notificationId}>
                  <NotificationCard
                    key={notificationId}
                    isSeen={isSeen}
                    fullName={fullName}
                    message={message}
                    img={img}
                    createdAt={createdAt}
                  >
                    <span>{displayedAt(createdAt)}</span>
                  </NotificationCard>
                </Link>
              ) : (
                <Link to={`/user/${authorId}`} key={notificationId}>
                  <NotificationCard
                    key={notificationId}
                    isSeen={isSeen}
                    fullName={fullName}
                    message={message}
                    img={img}
                    createdAt={createdAt}
                  >
                    <span>{displayedAt(createdAt)}</span>
                  </NotificationCard>
                </Link>
              )),
          )}
        </NotificationsWrapper>
      </PageWrapper>
    </>
  );
};

export default NotificationPage;
