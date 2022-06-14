import theme from 'styles/theme';
import styled from '@emotion/styled';

export const fullNameStyle = {
  display: 'block',
  marginTop: 5,
  fontWeight: 500,
  fontSize: 24,
  lineHeight: '34.75px',
  cursor: 'pointer',
};

export const smallTextStyle = {
  fontSize: 16,
  color: theme.color.fontNormal,
};

export const UserContainter = styled.div`
  width: 100%;
  position: relative;
  background-color: white;
`;

export const Header = styled.div`
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.color.gray};
  background-color: white;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;
export const Bottom = styled.div`
  height: 90px;
  width: 100%;
  border-top: 1px solid ${theme.color.gray};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Tab = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  margin-top: 15px;
  justify-content: space-around;
  border-bottom: 1px solid ${theme.color.gray};
  i {
    cursor: pointer;
  }
`;

export const UserInfo = styled.div`
  text-align: center;
  margin: 120px auto 0 auto;
  position: relative;
`;

export const UserDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0 0 0;
`;

export const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  > div:first-of-type {
    font-size: 16px;
    color: ${theme.color.fontNormal};
  }
`;
