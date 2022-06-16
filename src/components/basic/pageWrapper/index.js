import Header from 'components/Header/Header';
import Navigation from 'components/Navigation';
import theme from 'styles/theme';

const { headerHeight, navHeight, pagePadding } = theme.value;

const PageWrapper = ({ children, title, header, nav, prev, complete, onComplete, ...props }) => {
  const wrapperStyle = {
    paddingTop: header ? headerHeight : 0,
    paddingLeft: pagePadding,
    paddingRight: pagePadding,
    paddingBottom: nav ? navHeight : 0,
  };

  return (
    <div>
      {header && <Header prev={prev} title={title} complete={complete} onComplete={onComplete} />}
      <div style={{ ...wrapperStyle, ...props.style }}> {children}</div>
      {nav && <Navigation />}
    </div>
  );
};

export default PageWrapper;
