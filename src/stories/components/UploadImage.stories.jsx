import UploadImage from 'components/UploadImage';

export default {
  title: 'Component/UploadImage',
  component: UploadImage,
  argTypes: {},
};

export const Default = (args) => {
  return <UploadImage {...args}></UploadImage>;
};
