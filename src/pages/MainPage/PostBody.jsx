import styled from '@emotion/styled';
import Image from 'components/basic/Image';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';
import theme from 'styles/theme';

const PostBody = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image
          src="https://picsum.photos/300/300/?image=75"
          width="100%"
          height="100%"
        />
      </ImageWrapper>
      <Contents>
        <IconButtons>
          <IconButton className="heart-button" name="SEARCH_GRAY">
            <IconButtonText>1</IconButtonText>
          </IconButton>
          <IconButton className="comment-button" name="SEARCH_GRAY">
            <IconButtonText>2</IconButtonText>
          </IconButton>
        </IconButtons>
        <Paragraph>
          신기해 귀여워🙌
          <br />
          선인장에도 꽃이 피는구나🌵
        </Paragraph>
        <Tags>
          <Tag>#선인장</Tag>
          <Tag>#초린이</Tag>
          <Tag>#무럭무럭자라라</Tag>
        </Tags>
        <DateText>3일 전</DateText>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  color: ${theme.color.fontBlack};
`;

const ImageWrapper = styled.div`
  width: 500px;
  height: 500px;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
  }
`;

const Contents = styled.div`
  padding: 20px;
`;

const IconButtons = styled.div`
  display: flex;
`;

const IconButton = ({ children, name }) => {
  const style = {
    padding: 0,
    borderRadius: '0',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  };
  return (
    <button style={style}>
      <Icon name={name} size={22} />
      {children}
    </button>
  );
};

const IconButtonText = ({ children, ...props }) => {
  const style = {
    color: theme.color.fontBlack,
    fontSize: '16px',
    marginLeft: '8px',
    PointerEvent: 'none',
  };
  return (
    <Text style={style} {...props}>
      {children}
    </Text>
  );
};

const Paragraph = ({ children, ...props }) => {
  const style = {
    fontSize: 20,
    lineHeight: '28px',
    padding: '17px 0',
  };

  return (
    <Text paragraph style={style} {...props}>
      {children}
    </Text>
  );
};

const Tags = styled.div``;

const Tag = ({ children, ...props }) => {
  const style = {
    color: theme.color.mainGreen,
    fontSize: '16px',
    borderRadius: '8px',
    border: `1px solid ${theme.color.mainGreen}`,
    padding: '5px 13px',
    marginRight: '5px',
  };
  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
};

const DateText = ({ children, ...props }) => {
  const style = {
    display: 'block',
    fontSize: '16px',
    color: theme.color.fontNormal,
    margin: '18px 0',
  };
  return (
    <Text style={style} {...props}>
      {children}
    </Text>
  );
};

export default PostBody;
