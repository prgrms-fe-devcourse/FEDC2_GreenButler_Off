import styled from '@emotion/styled';
import { Icon, FixedContainer } from 'components';
import theme from 'styles/theme';
import { useLocation } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';

const { navHeight } = theme.value;
const { mainWhite, borderLight } = theme.color;

const NavContainer = styled(FixedContainer)`
  border-top: 1px solid ${borderLight};
  background-color: ${mainWhite};
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
  const { currentUser } = useUserContext();

  return (
    <NavContainer bottom height={navHeight}>
      <NavList>
        <NavItem>
          <Icon.Link to="/" name={pathname === '/' ? 'HOME_ACTIVE' : 'HOME'} size={27} />
        </NavItem>
        <NavItem>
          <Icon.Link to="/post/create" name="ADD_POST" size={27} />
        </NavItem>
        <NavItem>
          <Icon.Link
            to="/search"
            name={pathname === '/search' ? 'SEARCH_ACTIVE' : 'SEARCH'}
            size={27}
          />
        </NavItem>
        <NavItem>
          <Icon.Link
            to={`/user/${currentUser.id}`}
            name={pathname === `/user/${currentUser.id}` ? 'MY_PAGE_ACTIVE' : 'MY_PAGE'}
            size={27}
          />
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navigation;
