import Button from 'components/basic/Button';
import Icon from 'components/basic/Icon';

const IconButton = ({ children, name, size = 15, style, ...props }) => {
  const Buttonstyle = {
    ...style,
    borderRadius: '0',
    backgroundColor: 'transparent',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Button {...props} style={Buttonstyle}>
      <Icon name={name} size={size} />
      {children}
    </Button>
  );
};

export default IconButton;
