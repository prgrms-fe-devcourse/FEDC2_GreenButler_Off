import styled from '@emotion/styled';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';
import { Link, useNavigate } from 'react-router-dom';

const { headerHeight } = theme.value;
const { borderLight, mainWhite } = theme.color;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${headerHeight};
  max-width: 500px;
  padding: 30px 20px;
  border-bottom: 1px solid ${borderLight};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  background-color: ${mainWhite};
`;

const InnerLeft = styled.div``;
const InnerRight = styled.div`
  a:not(:first-of-type) {
    margin-left: 20px;
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const onClickPrev = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <InnerLeft>
        <button onClick={onClickPrev}>
          <Icon name="ARROW_LEFT" size={20} />
        </button>
      </InnerLeft>
      <InnerRight>
        <Link to="/notification">
          <Icon name="NOTIFICATION" size={30} />
        </Link>
        <Link to="/user/myinfo">
          <Icon name="MY_INFO" size={30} />
        </Link>
      </InnerRight>
    </HeaderContainer>
  );
};

export default Header;
