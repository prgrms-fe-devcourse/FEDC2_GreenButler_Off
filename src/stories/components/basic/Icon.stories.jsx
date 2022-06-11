import Icon from 'components/basic/Icon';
import { ICON_TYPES } from 'utils/constants/icons';

export default {
  title: 'Component/basic/Icon',
  component: Icon,
  argTypes: {
    name: {
      options: Object.keys(ICON_TYPES),
      control: 'select',
      defaultValue: 'LIKE_ICON',
    },
    size: { defaultValue: 20, control: { type: 'range', min: 15, max: 80 } },
    rotate: { defaultValue: 0, control: { type: 'range', min: 0, max: 360 } },
    filter: {
      control: 'text',
    },
  },
};

export const Default = (args) => {
  return <Icon {...args} />;
};
