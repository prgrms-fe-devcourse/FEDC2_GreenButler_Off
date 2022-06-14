import theme from 'styles/theme';

const Header = () => {
  const style = {
    height: '90px',
    padding: '30px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${theme.color.borderLight}`,
  };

  return <header style={style}></header>;
};

export default Header;
