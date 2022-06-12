import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import TabItem from './TabItem';

const childrenToArray = (children, types) => {
  return React.Children.toArray(children).filter((element) => {
    if (React.isValidElement(element) && types.includes(element.props.__TYPE)) {
      return true;
    }

    console.warn(
      `Only accepts ${
        Array.isArray(types) ? types.join(', ') : types
      } as it's children.`,
    );
    return false;
  });
};

const TabItemContainer = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
`;

const Tab = ({ children, active, ...props }) => {
  const [currentActive, setCurrentActive] = useState(() => {
    if (active) {
      return active;
    } else {
      const index = childrenToArray(children, 'Tab.Item')[0].props.index;
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
          setCurrentActive(element.props.index);
        },
      });
    });
  }, [children, currentActive]);

  const activeItem = useMemo(
    () => items.find((element) => currentActive === element.props.index),
    [currentActive, items],
  );

  return (
    <>
      <TabItemContainer>{items}</TabItemContainer>
      <div>{activeItem.props.children}</div>
    </>
  );
};

Tab.Item = TabItem;

export default Tab;
