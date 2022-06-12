import Tab from 'components/basic/Tab';

export default {
  title: 'Component/Tab',
  component: Tab,
};

export const Default = () => {
  return (
    <Tab>
      <Tab.Item title="Home" index="item1"></Tab.Item>
      <Tab.Item title="NewPost" index="item2"></Tab.Item>
      <Tab.Item title="Search" index="item3"></Tab.Item>
      <Tab.Item title="MyPage" index="item4"></Tab.Item>
    </Tab>
  );
};
