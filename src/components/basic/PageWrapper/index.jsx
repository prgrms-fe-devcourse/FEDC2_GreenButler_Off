import { Header, Navigation } from 'components';
import theme from 'styles/theme';

const { headerHeight, navHeight, pagePadding } = theme.value;

const PageWrapper = ({
  children,
  title,
  header,
  nav,
  info,
  prev,
  complete,
  onComplete,
  ...props
}) => {
  const wrapperStyle = {
    paddingTop: header ? headerHeight : 0,
    paddingLeft: pagePadding,
    paddingRight: pagePadding,
    paddingBottom: nav ? navHeight : 0,
  };

  return (
    <div>
      {header && (
        <Header prev={prev} title={title} info={info} complete={complete} onComplete={onComplete} />
      )}
      <div {...props} style={{ ...wrapperStyle, ...props.style }}>
        {' '}
        {children}
      </div>
      {nav && <Navigation />}
    </div>
  );
};

export default PageWrapper;
