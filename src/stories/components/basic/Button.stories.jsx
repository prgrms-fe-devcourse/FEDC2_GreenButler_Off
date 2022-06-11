import Button from 'components/basic/Button';
import colors from 'utils/constants/colors';

const colorArr = Object.keys(colors).map((key) => colors[key]);

export default {
  title: 'Component/basic/Button',
  component: Button,
  argTypes: {
    backgroundColor: { options: colorArr, control: 'select' },
    width: {
      control: {
        type: 'range',
        min: 100,
        max: 500,
        step: 10,
      },
    },
    height: {
      control: {
        type: 'range',
        min: 10,
        max: 100,
        step: 10,
      },
    },
    onClick: { action: 'clicked' },
    borderColor: { options: colorArr, control: 'select' },
    borderRadius: { control: 'text' },
    borderWidth: { control: 'text' },
    children: { contorl: 'text', defaultValue: '확인' },
  },
};

const BasicButton = (args) => {
  return <Button {...args}></Button>;
};

export const Default = BasicButton.bind({});
