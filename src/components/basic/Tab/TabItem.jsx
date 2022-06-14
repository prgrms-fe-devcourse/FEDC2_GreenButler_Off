import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Text from '../Text';

const TabItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 60px;
  background-color: ${({ active }) => (active ? '#ddf' : 'eee')};
`;

const TabItem = ({ children, title, index, active, onClick, ...props }) => {
  return (
    <TabItemWrapper active={active} onClick={onClick} {...props}>
      <Text strong={active}>{title}</Text>
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
