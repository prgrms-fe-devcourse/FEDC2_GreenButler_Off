import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Text from '../Text';
import colors from 'utils/constants/colors';

const TabItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 125px;
  height: 90px;
  background-color: none;
  cursor: pointer;
`;

const TabItem = ({ title, index, active, ...props }) => {
  return (
    <TabItemWrapper active={active} {...props}>
      <Text strong={active} color={active ? colors.mainGreen : colors.black}>
        {title}
      </Text>
    </TabItemWrapper>
  );
};

TabItem.defaultProps = {
  __TYPE: 'Tab.Item',
};

TabItem.propTypes = {
  __TYPE: PropTypes.oneOf(['Tab.Item']),
};

export default TabItem;
