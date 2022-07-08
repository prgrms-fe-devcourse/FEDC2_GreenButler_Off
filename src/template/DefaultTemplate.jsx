import styled from '@emotion/styled';
import theme from 'styles/theme';

const DefaultTemplate = ({ children }) => {
  return (
    <Container id="default-template-container">
      <StyledMain>{children}</StyledMain>
    </Container>
  );
};

const StyledMain = styled.main`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 500px;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: ${theme.color.mainWhite};
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export default DefaultTemplate;
