import PropTypes from 'prop-types';

const Text = ({
  children,
  block,
  paragraph,
  fontSize = 24,
  strong,
  underline,
  delete: del,
  color,
  mark,
  code,
  lineHeight,
  ...props
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  const fontStyle = {
    fontWeight: strong ? 'bold' : undefined,
    fontSize,
    textDecoration: underline ? 'underline' : undefined,
    color,
    lineHeight,
  };

  if (mark) {
    children = <mark>{children}</mark>;
  }
  if (code) {
    children = <code>{children}</code>;
  }
  if (del) {
    children = <del>{children}</del>;
  }

  return <Tag style={{ ...props.style, ...fontStyle }}>{children}</Tag>;
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.number,
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  delete: PropTypes.bool,
  code: PropTypes.bool,
  mark: PropTypes.bool,
  strong: PropTypes.bool,
  color: PropTypes.string,
};

export default Text;
