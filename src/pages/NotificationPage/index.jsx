import NotificationCard from 'components/NotificationCard';
import { getNotifications } from 'utils/apis/userApi';
import useLocalToken from 'hooks/useLocalToken';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useUserContext } from 'contexts/UserContext';
import PageWrapper from 'components/basic/pageWrapper';
import theme from 'styles/theme';

const NotificationsWrapper = styled.div`
  background-color: ${theme.color.backgroundLight};
  min-height: 100vh;
  margin: 0px -20px;
  padding: 30px 20px;
`;

const NotificationPage = () => {
  const [token] = useLocalToken();
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useUserContext();

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
            message: `님이 ${message}`,
            userId: userId,
            authorId: _id,
            isSeen: notification.seen,
            fullName: fullName,
            img: image,
          };
        }),
      );
    };
    initNotifications();
  }, []);
  return (
    <>
      <PageWrapper title="알림" header prev>
        <NotificationsWrapper>
          {notifications.map(
            ({ notificationId, postId, fullName, message, userId, authorId, isSeen, img }) =>
              postId ? (
                <Link to={`/post/detail/${postId}`}>
                  <NotificationCard
                    key={notificationId}
                    isSeen={isSeen}
                    fullName={fullName}
                    message={message}
                    img={img}
                  ></NotificationCard>
                </Link>
              ) : (
                <Link to={`/user/${authorId}`}>
                  <NotificationCard
                    key={notificationId}
                    isSeen={isSeen}
                    fullName={fullName}
                    message={message}
                    img={img}
                  ></NotificationCard>
                </Link>
              ),
          )}
        </NotificationsWrapper>
      </PageWrapper>
    </>
  );
};

export default NotificationPage;
