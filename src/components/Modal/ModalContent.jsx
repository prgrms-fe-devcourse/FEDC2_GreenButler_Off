import styled from '@emotion/styled';
import theme from 'styles/theme';
import { Image, Text } from 'components';
import { IMAGE_URLS } from 'utils/constants/images';

import PropTypes from 'prop-types';

const { fontDark } = theme.color;
const { FLOWERPOT } = IMAGE_URLS;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const Title = styled(Text)`
  text-align: center;
  margin-top: 18px;
`;

const Description = styled(Text)`
  margin-top: 14px;
  text-align: center;
`;

const ModalContent = ({ title, description }) => {
  return (
    <Inner>
      <Image width={55} height={55} src={FLOWERPOT} />
      {title && (
        <Title block fontSize={24} strong>
          {title}
        </Title>
      )}
      {description && (
        <Description block fontSize={16} color={fontDark}>
          {description}
        </Description>
      )}
    </Inner>
  );
};

ModalContent.defaultProps = {
  __TYPE: 'Modal.Content',
};

ModalContent.propTypes = {
  __TYPE: PropTypes.oneOf(['Modal.Content']),
};

export default ModalContent;
