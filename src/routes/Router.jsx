import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  SignupPage,
  HomePage,
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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post/create" element={<PostAddPage />} />
        <Route path="/post/edit" element={<PostEditPage />} />
        <Route path="/post/detail" element={<PostDetailPage />} />
        <Route path="/user/mypage" element={<MyPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/user/follow" element={<FollowPage />} />
        <Route path="/user/myInfo" element={<MyInfoPage />} />
        <Route path="/user/myInfo/edit" element={<MyInfoEditPage />} />
        <Route path="/user/notification" element={<NotificationPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/tag" element={<SearchTagPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
