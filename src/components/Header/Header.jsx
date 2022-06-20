import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';
import FixedContainer from 'components/FixedContainer';
import Badge from 'components/basic/Badge';
import Icon from 'components/basic/Icon';
import Text from 'components/basic/Text';
import theme from 'styles/theme';
import { memo } from 'react';

const { headerHeight, pagePadding } = theme.value;
const { borderLight } = theme.color;

const HeaderContainer = styled(FixedContainer)`
  border-bottom: 1px solid ${borderLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${pagePadding};
`;

const Title = memo(styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 500;
`);

const InnerRight = styled.div`
  position: absolute;
  top: 50%;
  right: ${pagePadding};
  transform: translateY(-50%);
  display: flex;

  & > * {
    margin-left: 20px;
  }
`;

export const Header = ({ prev, title, info, complete, onComplete }) => {
  const navigate = useNavigate();

  const onClickPrev = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer top height={headerHeight}>
      <div>{prev && <Icon.Button name="ARROW_LEFT" size={20} onClick={onClickPrev} />}</div>

      {title && <Title>{title}</Title>}

      <InnerRight>
        {info && (
          <>
            <Icon.Link to="/user/notification" name="NOTIFICATION" size={30} />
            <Icon.Link to="/user/myinfo" name="MY_INFO" size={30} />
          </>
        )}
        {complete && (
          <button onClick={onComplete}>
            <Text fontSize={20} fontWeight={500}>
              완료
            </Text>
          </button>
        )}
      </InnerRight>
    </HeaderContainer>
  );
};

export default Header;
