import Avatar from 'components/basic/Avatar';

export default {
  title: 'Component/Avatar',
  component: Avatar,
  argTypes: {
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    threshold: {
      type: { name: 'number' },
      defaultValue: 0.5,
      control: { type: 'number' },
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
    size: {
      defaultValue: 70,
      control: { type: 'range', min: 0, max: 500 },
    },
    alt: {
      control: 'string',
    },
  },
};

export const Default = (args) => {
  return <Avatar {...args} />;
};

export const Lazy = (args) => {
  return (
    <div>
      {Array.from(new Array(20), (_, k) => k).map((i) => (
        <Avatar {...args} lazy size={300} src={`${args.src}?${i}`} key={i} />
      ))}
    </div>
  );
};
