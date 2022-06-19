import { Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  SignupPage,
  MainPage,
  PostAddPage,
  PostEditPage,
  PostDetailPage,
  MyPage,
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
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/post/create" element={<PostEditPage />} />
      <Route path="/post/edit/:id" element={<PostEditPage />} />
      <Route path="/post/detail/:id" element={<PostDetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
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
