import {
  useContext,
  useCallback,
  useReducer,
  useMemo,
  createContext,
} from 'react';
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
  EDIT_FULLNAME,
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
  const [{ currentUser, isLoading }, dispatch] = useReducer(
    reducer,
    initialUserData,
  ); // 데이터의 갱신은 reducer 함수로 관리한다.
  const [localToken] = useLocalToken(); // JWT 토큰
  const {
    handleGetCurrentUser,
    handleLogin,
    handleSignup,
    handleLogout,
    handlechangeUserName,
    handlechangePassword,
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
  const onFollow = useCallback((payload = { userId: '', followId: '' }) => {
    dispatch({ type: FOLLOW, payload });
  }, []);

  // 특정 유저를 언팔로우한 경우, currentUser의 정보 갱신
  const onUnfollow = useCallback((payload = { unfollowId: '' }) => {
    dispatch({ type: UNFOLLOW, payload });
  }, []);

  //현재 유저의 닉네임을 수정
  const editFullName = useCallback(
    (payload = { fullName: '', userName: '' }) => {
      console.log('FULLNAME_CONTEXT_PAYLOAD', payload);
      const { fullName, userName } = payload;
      console.log('FULLNAME_CONTEXT', fullName);
      if (localToken) {
        handlechangeUserName(localToken, fullName, userName);
        dispatch({ type: EDIT_FULLNAME, payload });
      } /* else {
        console.log('token error');
      } */
    },
    [],
  );

  //현재 유저의 비밀번호 수정 - Reducer를 사용할 필요 없어
  const onChangePassword = useCallback(
    async (password) => {
      console.log('PASSWORD_CONTEXT', password);

      if (localToken) {
        handlechangePassword(localToken, password);
      }
      handlechangePassword(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWUyOWJkNmQxOGI0MWM1YjIzOGJhMiIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNjU0NjcxNjI5fQ.etL5BJpmU-w7nUg1JDa_1oEHqBKkTgTxPQ0tfOfj-As',
        password,
      );
    },
    [localToken, handlechangePassword],
  );

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
      editFullName,
      onChangePassword,
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
    editFullName,
    onChangePassword,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
