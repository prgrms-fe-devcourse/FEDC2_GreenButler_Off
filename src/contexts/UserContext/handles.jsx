import useLocalToken from 'hooks/useLocalToken';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  login,
  logout,
  signup,
  changeUserName,
  changeProfile,
  changePassword,
  Follow,
  unFollow,
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
        await login(inputData);
      } else if (error.code === 400) {
        alert('회원가입 실패');
      }
      return data;
    },
    [navigate, setLocalToken],
  );

  const handleLogout = useCallback(async () => {
    if (localToken) {
      await logout(localToken);
    }
    // JWT 토큰 및 로컬 스토리지 초기화
    setLocalToken('');
    localStorage.clear();
    navigate('/login', { replace: true }); // 로그인 페이지로 이동
  }, [navigate, localToken, setLocalToken]);

  //회원 이름수정
  const handlechangeUserName = useCallback(
    async (fullName, username = '') => {
      if (localToken && fullName) {
        await changeUserName(localToken, fullName, username);
      }
    },
    [localToken],
  );

  //회원 프로필 사진 수정
  const handlechangeProfile = useCallback(
    async ({ image }) => {
      const byteString = atob(image.split(',')[1]);

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: 'image/jpeg',
      });

      const formData = new FormData();
      formData.append('isCover', false);
      formData.append('image', blob);

      if (localToken && image) {
        await changeProfile(localToken, formData);
      }
    },
    [localToken],
  );

  //회원 비밀번호 수정
  const handlechangePassword = useCallback(
    async (password) => {
      if (localToken && password) {
        await changePassword(localToken, password);
      }
    },
    [localToken],
  );

  //팔로우
  const handlefollow = useCallback(
    async (userId) => {
      if (localToken && userId) {
        await Follow(localToken, userId);
      }
    },
    [localToken],
  );

  //언팔
  const handleUnFollow = useCallback(
    async (followId) => {
      if (localToken && followId) {
        await unFollow(localToken, followId);
      }
    },
    [localToken],
  );

  return {
    handleGetCurrentUser,
    handleLogin,
    handleSignup,
    handleLogout,
    handlechangeUserName,
    handlechangeProfile,
    handlechangePassword,
    handlefollow,
    handleUnFollow,
  };
};

export default useHandles;
