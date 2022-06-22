import styled from '@emotion/styled';
import { Text } from 'components';
import theme from 'styles/theme';

const { fontDark } = theme.color;

const StyledText = styled(Text)`
  margin-top: 35px;
  text-align: center;
`;

const NoResultMessage = () => {
  return (
    <StyledText block fontSize={20} color={fontDark}>
      검색 결과가 없습니다.
    </StyledText>
  );
};

export default NoResultMessage;
