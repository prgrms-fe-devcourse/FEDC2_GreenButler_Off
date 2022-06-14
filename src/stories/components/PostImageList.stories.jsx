import PostImageList from 'components/PostImageList';
import Image from 'components/basic/Image';

export default {
  title: 'Components/PostImageList',
  component: PostImageList,
  argTypes: {
    width: {
      defaultValue: 500,
      control: { type: 'range', min: 300, max: 500 },
    },
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    src: {
      type: { name: 'string', require: true },
      defaultValue: 'https://picsum.photos/200',
      control: { type: 'text' },
    },
    placeholder: {
      type: { name: 'string' },
      defaultValue: 'https://via.placeholder.com/200',
      control: { type: 'text' },
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
  return (
    <PostImageList style={{ ...args }}>
      {Array.from(new Array(70), (_, k) => k).map((i) => (
        <Image
          width="100%"
          lazy={args.lazy}
          block={true}
          placeholder={args.placeholder}
          threshold={args.threshold}
          src={`${args.src}?${i}`}
          key={i}
        />
      ))}
    </PostImageList>
  );
};
