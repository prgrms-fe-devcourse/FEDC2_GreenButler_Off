import InputForm from 'components/InputForm';

export default {
  title: 'Component/InputForm',
  component: InputForm,
  argTypes: {
    onsubmit: { action: 'onSubmit' },
  },
};

export const Default = (args) => {
  return <InputForm {...args} />;
};
