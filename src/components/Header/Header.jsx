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
const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InnerLeft = styled.div``;
const InnerRight = styled.div`
  display: flex;
  align-items: center;

  a:not(:first-of-type) {
    margin-left: 20px;
  }
`;

export const Header = ({ prev, title }) => {
  const navigate = useNavigate();

  const onClickPrev = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <InnerLeft>
        {prev && <Icon.Button name="ARROW_LEFT" size={20} onClick={onClickPrev} />}
      </InnerLeft>
      <Title>{title}</Title>
      <InnerRight>
        <Icon.Link to="/notification" name="NOTIFICATION" size={30} />
        <Icon.Link to="/user/myinfo" name="MY_INFO" size={30} />
      </InnerRight>
    </HeaderContainer>
  );
};

export default Header;
