import Button from 'components/basic/Button';

const FollowBtn = ({ onClick }) => (
  <Button
    width={100}
    height={30}
    borderRadius={10}
    fontSize="16px"
    style={{ flexShrink: 0 }}
    onClick={onClick}
  >
    팔로우
  </Button>
);

export default FollowBtn;
