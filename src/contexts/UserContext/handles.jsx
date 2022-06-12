import useLocalToken from 'hooks/useLocalToken';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthUser, login, logout, signup } from 'utils/apis/userApi';

const useHandles = () => {
  const [localToken, setLocalToken] = useLocalToken();
  const navigate = useNavigate();

  // 인증된 사용자인지 체크한다. 인증된 경우 사용자 정보를 반환한다.
  const handleGetCurrentUser = useCallback(async () => {
    const { data } = await checkAuthUser(localToken);
    if (!data?._id) {
      alert('인증 실패');
      setLocalToken('');
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    return data;
  }, [navigate, localToken, setLocalToken]);

  const handleLogin = useCallback(
    async (inputData) => {
      setLocalToken('');
      localStorage.clear();

      const { data, error } = await login(inputData);
      if (!error.code) {
        setLocalToken(data.token);
        navigate('/', { replace: true });
        alert('로그인 성공');
      } else if (error.code === 400) {
        alert('로그인 실패');
      }
      return { user: data.user, token: data.token };
    },
    [navigate, setLocalToken],
  );

  const handleSignup = useCallback(
    async (inputData) => {
      setLocalToken('');
      localStorage.clear();

      const { data, error } = await signup(inputData);
      if (!error.code) {
        setLocalToken(data.token);
        navigate('/', { replace: true });
        alert('회원가입 성공');
      } else if (error.code === 400) {
        alert('회원가입 실패');
      }
      return data;
    },
    [navigate, setLocalToken],
  );

  const handleLogout = useCallback(async () => {
    setLocalToken('');
    localStorage.clear();
    await logout();
    navigate('/login', { replace: true });
  }, [navigate, setLocalToken]);

  return {
    handleGetCurrentUser,
    handleLogin,
    handleSignup,
    handleLogout,
  };
};

export default useHandles;
