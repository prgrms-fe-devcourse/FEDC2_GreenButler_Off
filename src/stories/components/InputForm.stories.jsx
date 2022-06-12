import InputForm from 'components/InputForm';

export default {
  title: 'Component/InputForm',
  component: InputForm,
  argTypes: {
    onsubmit: { action: 'onSubmit' },
    width: {
      name: 'width',
      defaultValue: 500,
      control: { type: 'range', min: 100, max: 500 },
    },
    height: {
      name: 'height',
      defaultValue: 70,
      control: { type: 'range', min: 20, max: 70 },
    },
  },
};

export const Default = (args) => {
  return <InputForm {...args} />;
};
