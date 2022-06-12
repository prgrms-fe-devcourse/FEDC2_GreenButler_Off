import NewInput from 'components/basic/Input/NewInput';

export default {
  title: 'Component/basic/NewInput',
  component: NewInput,
  argTypes: {
    label: {
      defaultValue: 'Label',
      control: 'text',
    },
    required: {
      defaultValue: false,
      control: 'boolean',
    },
    fontSize: { control: 'number' },
    width: {
      name: 'width',
      defaultValue: 500,
      control: { type: 'range', min: 200, max: 500 },
    },
  },
};


export const Default = (args) => <NewInput {...args} />;