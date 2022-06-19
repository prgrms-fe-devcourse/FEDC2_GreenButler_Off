import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ImageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const PostImageList = ({ children, ...props }) => {
  return <ImageContainer style={{ ...props.style }}>{children}</ImageContainer>;
};

export default PostImageList;

PostImageList.propTypes = {
  children: PropTypes.node,
};
