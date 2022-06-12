import { useContext, useCallback, useReducer, useMemo } from 'react';
import { reducer, UserContext, initialUserData } from './reducer';
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
} from './types';

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [localToken] = useLocalToken();
  const [{ currentUser, isLoading }, dispatch] = useReducer(reducer, initialUserData);
  const { handleGetCurrentUser, handleLogin, handleSignup, handleLogout } = useHandles();

  const onGetCurrentUser = useCallback(async () => {
    dispatch({ type: LOADING_ON });
    if (localToken) {
      const user = await handleGetCurrentUser();
      if (user?._id) {
        dispatch({ type: GET_CURRENT_USER, payload: user });
      }
    }
    dispatch({ type: LOADING_OFF });
  }, [handleGetCurrentUser, localToken]);

  const onLogin = useCallback(
    async (data) => {
      dispatch({ type: LOADING_ON });
      const { user, token } = await handleLogin(data);
      if (token) {
        dispatch({ type: LOGIN, payload: user });
      }
      dispatch({ type: LOADING_OFF });
    },
    [handleLogin],
  );

  const onSignup = useCallback(
    async (data) => {
      dispatch({ type: LOADING_ON });
      const { user, token } = await handleSignup(data);
      if (token) {
        dispatch({ type: SIGNUP, payload: user });
      }
      dispatch({ type: LOADING_OFF });
    },
    [handleSignup],
  );

  const onLogout = useCallback(async () => {
    dispatch({ type: LOADING_ON });
    handleLogout();
    dispatch({ type: LOGOUT });
    dispatch({ type: LOADING_OFF });
  }, [handleLogout]);

  const onFollow = useCallback((payload = { userId: '', followId: '' }) => {
    dispatch({ type: FOLLOW, payload });
  }, []);

  const onUnfollow = useCallback((payload = { unfollowId: '' }) => {
    dispatch({ type: UNFOLLOW, payload });
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
    };
  }, [currentUser, isLoading, onLogin, onSignup, onLogout, onGetCurrentUser, onFollow, onUnfollow]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
