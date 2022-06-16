import InputForm from 'components/basic/Input/InputForm';

export default {
  title: 'Component/basic/InputForm',
  component: InputForm,
  argTypes: {
    width: {
      name: 'width',
      defaultValue: 500,
      control: { type: 'range', min: 200, max: 500 },
    },
    name: {
      defaultValue: 'tag',
      options: ['tag', 'fullName', 'search'],
      control: { type: 'radio' },
    }
    
  },
};

export const Default = (args) => {
  return <InputForm {...args} />;
};
