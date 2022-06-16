import styled from '@emotion/styled';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import Badge from 'components/basic/Badge';
import { useUserContext } from 'contexts/UserContext';
import FixedContainer from 'components/FixedContainer';

const { headerHeight } = theme.value;
const { borderLight } = theme.color;

const HeaderContainer = styled(FixedContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px;
  border-bottom: 1px solid ${borderLight};
`;

const InnerLeft = styled.div``;

const InnerRight = styled.div`
  display: flex;

  & > * {
    margin-left: 20px;
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const {
    currentUser: { notifications },
  } = useUserContext();

  const { pathname } = useLocation();

  const hidePrev = ['/', '/user/mypage', '/search', '/post/detail'];
  const hideHeader = ['/login', '/join'];

  const onClickPrev = () => {
    navigate(-1);
  };

  if (hideHeader.includes(pathname)) {
    return;
  }

  return (
    <HeaderContainer top height={headerHeight}>
      <InnerLeft>
        {!hidePrev.includes(pathname) && (
          <Icon.Button name="ARROW_LEFT" size={20} onClick={onClickPrev} />
        )}
      </InnerLeft>
      <InnerRight>
        <Badge isShow={notifications?.seen}>
          <Icon.Link to="/notification" name="NOTIFICATION" size={30} />
        </Badge>
        <Icon.Link to="/user/myinfo" name="MY_INFO" size={30} />
      </InnerRight>
    </HeaderContainer>
  );
};

export default Header;
