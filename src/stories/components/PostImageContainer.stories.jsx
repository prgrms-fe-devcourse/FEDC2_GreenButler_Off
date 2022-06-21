import PostImageContainer from 'components/PostImageContainer';

export default {
  title: 'Components/PostImageContainer',
  component: PostImageContainer,
  argTypes: {
    width: {
      defaultValue: 500,
      control: { type: 'range', min: 300, max: 500 },
    },
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    threshold: {
      type: { name: 'number' },
      defaultValue: 0.5,
      control: { type: 'number' },
    },
    mode: {
      defaultValue: 'cover',
      options: ['cover', 'fill', 'contain'],
      control: { type: 'inline-radio' },
    },
  },
};

export const Default = (args) => {
  const posts = Array.from(new Array(70), (_, k) => k).map((i) => ({
    placeholder: 'https://via.placeholder.com/200',
    src: `https://picsum.photos/200?${i}`,
  }));
  return <PostImageContainer posts={posts} style={{ ...args }} />;
};
