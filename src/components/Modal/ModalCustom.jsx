import PropTypes from 'prop-types';

const ModalCustom = ({ children }) => {
  return <div>{children}</div>;
};

ModalCustom.defaultProps = {
  __TYPE: 'Modal.Custom',
};

ModalCustom.propTypes = {
  __TYPE: PropTypes.oneOf(['Modal.Custom']),
};

export default ModalCustom;
