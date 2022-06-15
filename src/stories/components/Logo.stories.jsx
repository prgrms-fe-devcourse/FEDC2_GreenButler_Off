import { IMAGE_NAMES } from 'utils/constants/images';
import Logo from 'components/Logo';

const { LOGO_IMAGE } = IMAGE_NAMES;
const values = Object.keys(IMAGE_NAMES).map((key) => IMAGE_NAMES[key]);

export default {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    name: {
      options: values,
      control: 'select',
      defaultValue: LOGO_IMAGE,
    },
    width: {
      control: {
        type: 'range',
        min: 20,
        max: 400,
        step: 10,
      },
    },
    height: {
      control: {
        type: 'range',
        min: 20,
        max: 200,
        step: 10,
      },
    },
  },
};

export const Default = (args) => {
  return <Logo {...args} />;
};
