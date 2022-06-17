import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const DefaultTemplate = ({ children }) => {
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <Container id="default-template-container" height={height}>
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
  overflow-x: hidden;
  margin: 0 auto;
  height: ${({ height }) => `${height}`}px;
  background-color: ${({ theme }) => theme.color.mainWhite};

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export default DefaultTemplate;
