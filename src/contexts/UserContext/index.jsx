import { useContext, useCallback, useReducer, useMemo, createContext } from 'react';
import { reducer, initialUserData } from './reducer';
import useLocalToken from 'hooks/useLocalToken';
import useHandles from './handles';
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  GET_CURRENT_USER,
  FOLLOW,
  UNFOLLOW,
  LOADING_ON,
  LOADING_OFF,
  ADD_POST,
  INIT_POST,
  UPDATE_POST,
  CHANGE_PROFILE,
  CHANGE_FULLNAME,
  LIKE,
  DISLIKE,
} from './types';

/* 
  UserConxt 생성
  각 페이지 컴포넌트에서는 useUserContext를 임포트해서 사용한다. 
*/
export const UserContext = createContext(initialUserData);
export const useUserContext = () => useContext(UserContext);

/* 
  전역으로 관리할 데이터 
  1) currentUser: 로그인한 유저(나)의 정보
  2) isLoading: 로딩 중인지 여부
*/
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
  } = useHandles();

  // 현재 유저의 정보를 서버로부터 가져온다.
  const onGetCurrentUser = useCallback(async () => {
    dispatch({ type: LOADING_ON });
    if (localToken) {
      const user = await handleGetCurrentUser();
      if (user?._id) {
        dispatch({ type: GET_CURRENT_USER, payload: user }); // 서버에서 받아 온 데이터로 currentUser의 정보 갱신
      }
    }
    dispatch({ type: LOADING_OFF });
  }, [handleGetCurrentUser, localToken]);

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
      console.log(res.user, res.token);
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
  //TODO:신영 userId: 팔로우 당한 사람 id, followId: FOLLOW 객체의 _id
  const onFollow = useCallback(async (payload = { userId: '', followId: '' }) => {
    console.log(payload);
    const data = await handlefollow(payload.userId);
    /*     const notice = {
      notificationType: 'FOLLOW',
      notificationTypeId: data._id,
      userId: data.user,
      postId: null,
    };
    }; */ console.log('CONTEXT_DATA', data);
    dispatch({ type: FOLLOW, payload: data });
  }, []);

  // 특정 유저를 언팔로우한 경우, currentUser의 정보 갱신
  //TODO:신영 FOLLOW 객체의 _id
  const onUnfollow = useCallback((payload = { unfollowId: '' }) => {
    console.log('컨텍스트', payload);
    handleUnFollow(payload.unfollowId);
    dispatch({ type: UNFOLLOW, payload });
  }, []);

  //현재 유저의 닉네임을 수정
  const onChangeFullName = useCallback(
    (payload = { fullName: '', userName: '' }) => {
      const { fullName, userName } = payload;
      handlechangeUserName(fullName, userName);
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

  const value = useMemo(() => {
    return {
      currentUser,
      isLoading,
      onLogin,
      onSignup,
      onLogout,
      onGetCurrentUser,
      onFollow,
      onUnfollow,
      onChangeFullName,
      onChangeProfile,
      onChangePassword,
      onLike,
      onDisLike,
    };
  }, [
    currentUser,
    isLoading,
    onLogin,
    onSignup,
    onLogout,
    onGetCurrentUser,
    onFollow,
    onUnfollow,
    onChangeFullName,
    onChangeProfile,
    onChangePassword,
    onLike,
    onDisLike,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
