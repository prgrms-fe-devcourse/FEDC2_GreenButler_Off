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
    color: { control: 'color' },
    fontSize: { control: 'number' },
  },
};

export const Default = (args) => {
  return <Icon {...args}></Icon>;
};
