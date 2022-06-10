import Icon from 'components/basic/Icon';

export default {
  title: 'Component/basic/Icon',
  component: Icon,
  argTypes: {
    name: { defaultValue: 'box', control: 'text' },
    size: { defaultValue: 16, control: { type: 'range', min: 16, max: 80 } },
    strokeWidth: {
      defaultValue: 2,
      control: { type: 'range', min: 2, max: 6 },
    },
    rotate: { defaultValue: 0, control: { type: 'range', min: 0, max: 360 } },
    color: { defaultValue: '#222', control: 'color' },
  },
};

export const Default = (args) => {
  return <Icon {...args} />;
};
