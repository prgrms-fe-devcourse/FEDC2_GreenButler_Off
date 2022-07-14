import useLocalToken from 'hooks/useLocalToken';
import { useNavigate, Outlet } from 'react-router-dom';
import LoginRequireModal from 'components/Modal/customs/LoginRequireModal';
import { useCallback } from 'react';

const PrivateWrapper = () => {
  const [token] = useLocalToken();
  const navigate = useNavigate();

  const handleCloseModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return token ? (
    <Outlet />
  ) : (
    <>
      <Outlet />
      <LoginRequireModal visible={true} onClose={handleCloseModal} />
    </>
  );
};
export default PrivateWrapper;
