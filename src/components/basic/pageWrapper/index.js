import theme from 'styles/theme';

const { headerHeight, navHeight, pagePadding } = theme.value;

const PageWrapper = ({ children, header, nav, ...props }) => {
  const wrapperStyle = {
    paddingTop: header ? headerHeight : 0,
    paddingLeft: pagePadding,
    paddingRight: pagePadding,
    paddingBottom: nav ? navHeight : 0,
  };

  return <div style={{ ...wrapperStyle, ...props.style }}>{children}</div>;
};

export default PageWrapper;
