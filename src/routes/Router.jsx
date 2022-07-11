import { useEffect } from 'react';
import useLocalToken from 'hooks/useLocalToken';
import { Routes, Route } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';
import scrollToTop from 'utils/functions/scrollToTop';
import PrivateWrapper from './PrivateWrapper';
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
  const [token] = useLocalToken();
  const { onKeepLoggedIn } = useUserContext();
  scrollToTop();

  useEffect(() => {
    token && onKeepLoggedIn();
  }, [token]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<MainPage />} />
      <Route element={<PrivateWrapper />}>
        <Route path="/post/create" element={<PostEditPage />} />
      </Route>
      <Route element={<PrivateWrapper />}>
        <Route path="/post/edit/:id" element={<PostEditPage />} />
      </Route>
      <Route path="/post/detail/:id" element={<PostDetailPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route element={<PrivateWrapper />}>
        <Route path="/user/" element={<UserPage />} />
      </Route>
      <Route path="/user/follow/:id" element={<FollowPage />} />
      <Route element={<PrivateWrapper />}>
        <Route path="/user/myinfo" element={<MyInfoPage />} />
      </Route>
      <Route element={<PrivateWrapper />}>
        <Route path="/user/myinfo/edit" element={<MyInfoEditPage />} />
      </Route>
      <Route element={<PrivateWrapper />}>
        <Route path="/user/notification" element={<NotificationPage />} />
      </Route>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/:searchKeyword" element={<SearchPage />} />
      <Route path="/tag/:tag" element={<SearchTagPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
