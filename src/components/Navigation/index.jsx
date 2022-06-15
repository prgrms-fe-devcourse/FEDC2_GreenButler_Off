import styled from '@emotion/styled';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const { navHeight } = theme.value;
const { mainWhite, borderLight } = theme.color;

const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  height: ${navHeight};
  max-width: 500px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid ${borderLight};
  background-color: ${mainWhite};
  z-index: 100;
`;

const NavList = styled.ul`
  display: flex;
  height: 100%;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavItem = styled.li`
  width: 25%;
  text-align: center;
  cursor: pointer;
`;

export const Navigation = () => {
  const { pathname } = useLocation();

  const showTab = ['/', '/user/mypage', '/search', '/post/detail'];

  if (!showTab.includes(pathname)) {
    return;
  }

  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <Link to="/">
            {pathname === '/' ? (
              <Icon name="HOME_ACTIVE" size={27} />
            ) : (
              <Icon name="HOME" size={27} />
            )}
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/post/create">
            <Icon name="ADD_POST" size={27} />
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/search">
            {pathname === '/search' ? (
              <Icon name="SEARCH_ACTIVE" size={27} />
            ) : (
              <Icon name="SEARCH" size={27} />
            )}
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/user/mypage">
            {pathname === '/user/mypage' ? (
              <Icon name="MY_PAGE_ACTIVE" size={27} />
            ) : (
              <Icon name="MY_PAGE" size={27} />
            )}
          </Link>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navigation;
