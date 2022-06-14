import useLocalToken from 'hooks/useLocalToken';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login, logout, signup, changeUserName } from 'utils/apis/userApi';

const useHandles = () => {
  const [localToken, setLocalToken] = useLocalToken();
  const navigate = useNavigate();

  // 인증된 사용자인 경우, 사용자 정보를 반환받을 수 있다.
  const handleGetCurrentUser = useCallback(async () => {
    const { data } = await getCurrentUser(localToken);
    if (!data?._id) {
      // JWT 토큰 및 로컬 스토리지 초기화
      alert('인증 실패');
      setLocalToken('');
      localStorage.clear();
      navigate('/login', { replace: true }); // 로그인 화면으로 이동
    }
    return data;
  }, [navigate, localToken, setLocalToken]);

  const handleLogin = useCallback(
    async (inputData) => {
      // JWT 토큰 및 로컬 스토리지 초기화
      setLocalToken('');
      localStorage.clear();

      const { data, error } = await login(inputData);
      if (!error.code) {
        setLocalToken(data.token); // 로그인 성공 시, JWT 토큰 갱신
        navigate('/', { replace: true }); // 메인페이지로 이동
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
      // JWT 토큰 및 로컬 스토리지 초기화
      setLocalToken('');
      localStorage.clear();

      const { data, error } = await signup(inputData);
      if (!error.code) {
        setLocalToken(data.token); // 회원가입 성공 시, JWT 토큰 갱신
        navigate('/', { replace: true }); // 메인 페이지로 이동 (로그인을 건너뛴다)
        alert('회원가입 성공');
      } else if (error.code === 400) {
        alert('회원가입 실패');
      }
      return data;
    },
    [navigate, setLocalToken],
  );

  const handleLogout = useCallback(async () => {
    // JWT 토큰 및 로컬 스토리지 초기화
    setLocalToken('');
    localStorage.clear();
    await logout();
    navigate('/login', { replace: true }); // 로그인 페이지로 이동
  }, [navigate, setLocalToken]);

  //회원 이름수정
  const handlechangeUserName = useCallback(
    async (fullName, username = '') => {
      changeUserName(localToken, fullName, username);
    },
    [localToken],
  );

  return {
    handleGetCurrentUser,
    handleLogin,
    handleSignup,
    handleLogout,
    handlechangeUserName,
  };
};

export default useHandles;
