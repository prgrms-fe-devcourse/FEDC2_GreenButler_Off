import request from './common';
import { API_METHOD } from 'utils/constants/apiMethods';

/* 
  로그인
  Response: { "user": User, "token": String }
*/
export const login = ({ email, password }) => {
  return request({
    method: API_METHOD.POST,
    url: `/login`,
    data: {
      email,
      password,
    },
  });
};

/* 
  회원가입
  Response: { "user": User, "token": String }
*/
export const signup = ({ email, fullName, password }) => {
  return request({
    method: API_METHOD.POST,
    url: `/signup`,
    data: {
      email,
      fullName,
      password,
    },
  });
};

/* 
  로그아웃
  Response: User
*/
export const logout = (token) => {
  return request({
    method: API_METHOD.POST,
    url: `/logout`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* 
  인증된 사용자인지 체크한다. 인증 성공 시 사용자 정보를 응답받는다. 
  Response: User
*/
export const getCurrentUser = (token) => {
  return request({
    method: API_METHOD.GET,
    url: `/auth-user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* 
  특정 사용자 정보를 불러온다. 
  Response: User
*/
export const getUser = (userId) => {
  return request({
    method: API_METHOD.GET,
    url: `/users/${userId}`,
  });
};

/* 
  사용자들을 검색한다.
  Response: User[]
*/
export const searchUsers = (fullName) => {
  return request({
    method: API_METHOD.GET,
    url: `/search/users/${fullName}`,
  });
};

/* 
  특정 유저를 팔로우한다.
  Response: Follow 
*/
export const Follow = (token, userId) => {
  return request({
    method: API_METHOD.POST,
    url: `/follow/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
};

/* 
  특정 유저를 언팔로우한다.
  Response: Follow 
*/
export const unFollow = (token, id) => {
  return request({
    method: API_METHOD.DELETE,
    url: `/follow/delete`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id,
    },
  });
};

/* 
  나의 fullName 또는 username을 변경한다.
  Response: User
*/
export const changeUserName = (token, fullName, username) => {
  return request({
    method: API_METHOD.PUT,
    url: `/settings/update-user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...(fullName && { fullName }),
      ...(username && { username }),
    },
  });
};

/* 
  나의 profile 사진을 변경한다.
  Response: User
*/
export const changeProfile = (token, formData) => {
  return request({
    method: API_METHOD.POST,
    url: `/users/upload-photo`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });
};

/* 
  나의 계정 비밀번호를 변경한다. 
*/
export const changePassword = (token, password) => {
  return request({
    method: API_METHOD.PUT,
    url: `/settings/update-password`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      password,
    },
  });
};

/* 
  나의 알림 목록을 불러온다. 
  Response: Notification[]
*/
export const getNotifications = (token) => {
  return request({
    method: API_METHOD.GET,
    url: `/notifications`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
