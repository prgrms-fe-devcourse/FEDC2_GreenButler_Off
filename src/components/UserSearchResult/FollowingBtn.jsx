import Button from 'components/basic/Button';
import theme from 'styles/theme';

const { mainWhite, borderNormal, fontNormal } = theme.color;

const FollowingBtn = ({ onClick }) => (
  <Button
    width={100}
    height={30}
    borderRadius={10}
    fontSize="16px"
    backgroundColor={mainWhite}
    borderWidth={1}
    borderColor={borderNormal}
    color={fontNormal}
    style={{ flexShrink: 0 }}
    onClick={onClick}
  >
    팔로잉
  </Button>
);

export default FollowingBtn;
