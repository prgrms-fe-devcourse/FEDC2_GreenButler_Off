import { useEffect } from 'react';
import useLocalToken from 'hooks/useLocalToken';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';
import {
  LoginPage,
  SignupPage,
  MainPage,
  PostEditPage,
  PostDetailPage,
  UserPage,
  FollowPage,
  MyInfoPage,
  MyInfoEditPage,
  SearchPage,
  SearchTagPage,
  NotificationPage,
  NotFoundPage,
} from '../pages/index';

const Router = () => {
  const navigate = useNavigate();
  const [token] = useLocalToken();
  const { onKeepLoggedIn } = useUserContext();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    onKeepLoggedIn();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/post/create" element={<PostEditPage />} />
      <Route path="/post/edit/:id" element={<PostEditPage />} />
      <Route path="/post/detail/:id" element={<PostDetailPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/user/follow/:id" element={<FollowPage />} />
      <Route path="/user/myinfo" element={<MyInfoPage />} />
      <Route path="/user/myinfo/edit" element={<MyInfoEditPage />} />
      <Route path="/user/notification" element={<NotificationPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/tag/:tag" element={<SearchTagPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
