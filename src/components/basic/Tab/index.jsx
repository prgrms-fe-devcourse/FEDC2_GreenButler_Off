import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import TabItem from './TabItem';

const TabItemContainer = styled.div`
  display: flex;
`;

const TabItemContent = styled.div`
  margin-top: 14px;
`;

const childrenToArray = (children, types) => {
  return React.Children.toArray(children).filter((element) => {
    if (React.isValidElement(element) && element.props.__TYPE === types) {
      return true;
    }

    console.warn("Only accepts Tab.Item as it's children.");
    return false;
  });
};

const Tab = ({ children, active, onActive, ...props }) => {
  const [currentActive, setCurrentActive] = useState(() => {
    if (active) {
      return active;
    } else {
      const index = childrenToArray(children, 'Tab.Item')[0].props.index;

      onActive(index);
      return index;
    }
  });

  const items = useMemo(() => {
    return childrenToArray(children, 'Tab.Item').map((element) => {
      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        onClick: () => {
          onActive(element.props.index);
          setCurrentActive(element.props.index);
        },
      });
    });
  }, [children, currentActive, onActive]);

  const activeItem = useMemo(() => {
    return items.find((element) => currentActive === element.props.index);
  }, [currentActive, items]);

  return (
    <div {...props}>
      <TabItemContainer>{items}</TabItemContainer>
      <TabItemContent>{activeItem.props.children}</TabItemContent>
    </div>
  );
};

Tab.Item = TabItem;

export default Tab;
