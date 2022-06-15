import useLocalToken from 'hooks/useLocalToken';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  login,
  logout,
  signup,
  changeUserName,
  changePassword,
} from 'utils/apis/userApi';

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

      const res = await login(inputData);
      console.log(res);
      if (res.data.token) {
        setLocalToken(res.data.token); // 로그인 성공 시, JWT 토큰 갱신
        navigate('/', { replace: true }); // 메인페이지로 이동
        alert('로그인 성공');
      } else {
        alert('로그인 실패');
      }
      return { user: res.data.user, token: res.data.token };
    },
    [navigate, setLocalToken],
  );

  const handleSignup = useCallback(
    async (inputData) => {
      // JWT 토큰 및 로컬 스토리지 초기화
      setLocalToken('');
      localStorage.clear();

      const { data, error } = await signup(inputData);
      if (data.token) {
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
    //TODO:신영 추후 로그인 제대로 되서 토큰이 있으면 아래 주석 제거
    //await logout();
    navigate('/login', { replace: true }); // 로그인 페이지로 이동
  }, [navigate, setLocalToken]);

  //회원 이름수정
  const handlechangeUserName = useCallback(
    async (fullName, username = '') => {
      console.log('CHANGENAME_HANDLE', fullName);
      //await changeUserName(localToken, fullName, username);
    },
    [localToken],
  );

  //회원 비밀번호 수정
  const handlechangePassword = useCallback(
    async (password) => {
      console.log('PASSWORD_HANDLE', password);
      //await changePassword(localToken, password);
    },
    [localToken],
  );

  return {
    handleGetCurrentUser,
    handleLogin,
    handleSignup,
    handleLogout,
    handlechangeUserName,
    handlechangePassword,
  };
};

export default useHandles;
