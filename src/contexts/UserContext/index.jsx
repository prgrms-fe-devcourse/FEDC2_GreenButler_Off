import { useContext, useCallback, useReducer, useMemo, createContext } from 'react';
import { reducer, initialUserData } from './reducer';
import useLocalToken from 'hooks/useLocalToken';
import useHandles from './handles';
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  KEEP_LOGIN,
  FOLLOW,
  UNFOLLOW,
  LOADING_ON,
  LOADING_OFF,
  CHANGE_PROFILE,
  CHANGE_FULLNAME,
  LIKE,
  DISLIKE,
  ADD_POST,
} from './types';

export const UserContext = createContext(initialUserData);
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [{ currentUser, isLoading }, dispatch] = useReducer(reducer, initialUserData); // 데이터의 갱신은 reducer 함수로 관리한다.
  const [localToken] = useLocalToken(); // JWT 토큰
  const {
    handleGetCurrentUser,
    handleLogin,
    handleSignup,
    handleLogout,
    handlechangeUserName,
    handlechangeProfile,
    handlechangePassword,
    handlefollow,
    handleUnFollow,
    handleAddPost,
  } = useHandles();

  const onLogin = useCallback(
    async (data) => {
      dispatch({ type: LOADING_ON });
      const { user, token } = await handleLogin(data);
      if (token) {
        dispatch({ type: LOGIN, payload: user }); // 로그인 성공 시, currentUser의 정보 갱신
      }
      dispatch({ type: LOADING_OFF });
    },
    [handleLogin],
  );

  const onSignup = useCallback(
    async (data) => {
      dispatch({ type: LOADING_ON });
      const res = await handleSignup(data);

      if (res.token) {
        dispatch({ type: SIGNUP, payload: res.user }); // 회원가입 성공 시, currentUser의 정보 갱신
      }
      dispatch({ type: LOADING_OFF });
    },
    [handleSignup],
  );

  const onLogout = useCallback(async () => {
    dispatch({ type: LOADING_ON });
    handleLogout();
    dispatch({ type: LOGOUT }); // 로그아웃 후, currentUser의 정보 갱신(초기화)
    dispatch({ type: LOADING_OFF });
  }, [handleLogout]);

  // 특정 유저를 팔로우한 경우, currentUser의 정보 갱신
  const onFollow = useCallback(async (payload = { userId: '', followId: '' }) => {
    const data = await handlefollow(payload.userId);
    dispatch({ type: FOLLOW, payload: data });
  }, []);

  // 특정 유저를 언팔로우한 경우, currentUser의 정보 갱신
  const onUnfollow = useCallback((payload = { unfollowId: '' }) => {
    handleUnFollow(payload.unfollowId);
    dispatch({ type: UNFOLLOW, payload });
  }, []);

  //현재 유저의 닉네임을 수정
  const onChangeFullName = useCallback(
    (payload = { fullName: '', username: '' }) => {
      const { fullName, username } = payload;
      handlechangeUserName(fullName, username);
      dispatch({ type: CHANGE_FULLNAME, payload });
    },
    [handlechangeUserName],
  );

  //현재 유저의 프로필 사진 수정
  const onChangeProfile = useCallback(
    (payload = { image: '' }) => {
      handlechangeProfile(payload);
      dispatch({ type: CHANGE_PROFILE, payload });
    },
    [handlechangeProfile],
  );

  const onChangePassword = useCallback(
    async (password) => {
      handlechangePassword(password);
    },
    [handlechangePassword],
  );

  const onLike = useCallback((like) => {
    dispatch({ type: LIKE, payload: like });
  }, []);

  const onDisLike = useCallback((like) => {
    dispatch({ type: DISLIKE, payload: like });
  }, []);

  const onKeepLoggedIn = useCallback(async () => {
    const user = await handleGetCurrentUser();
    dispatch({ type: KEEP_LOGIN, payload: user });
  }, [handleGetCurrentUser]);

  const onAddPost = useCallback(
    async (formData) => {
      const post = await handleAddPost(formData);
      dispatch({ type: ADD_POST, payload: post });
    },
    [handleAddPost],
  );

  const value = useMemo(() => {
    return {
      currentUser,
      isLoading,
      onLogin,
      onSignup,
      onLogout,
      onFollow,
      onUnfollow,
      onChangeFullName,
      onChangeProfile,
      onChangePassword,
      onLike,
      onDisLike,
      onKeepLoggedIn,
      onAddPost,
    };
  }, [
    currentUser,
    isLoading,
    onLogin,
    onSignup,
    onLogout,
    onFollow,
    onUnfollow,
    onChangeFullName,
    onChangeProfile,
    onChangePassword,
    onLike,
    onDisLike,
    onKeepLoggedIn,
    onAddPost,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
