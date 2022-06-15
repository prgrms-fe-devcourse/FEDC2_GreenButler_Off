import styled from '@emotion/styled';
import useValidInput from 'hooks/useValidInput';
import InputForm from 'components/InputForm';
import Text from 'components/basic/Text';
import Icon from 'components/basic/Icon';

import theme from 'styles/theme';

const { mainGreen, fontNormal } = theme.color;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.li`
  padding: 5px 13px;
  border: 1px solid ${mainGreen};
  border-radius: 15px;
  white-space: nowrap;
  margin: 0 4px 4px 0;
  color: ${mainGreen};
  display: flex;
  align-items: center;
`;

const RemoveBtn = styled.button``;

const TagAddForm = ({ onAddTag, onRemoveTag, tags }) => {
  const MAX = 6;
  const { value, resetValue, error, setError, handleChange } =
    useValidInput(MAX);

  const handleRemoveTag = (index) => {
    onRemoveTag(index);
    setError('');
  };

  const onSubmit = () => {
    setError('');
    onAddTag(value.slice(0, MAX));
    resetValue();
  };

  return (
    <>
      <InputForm
        onSubmit={onSubmit}
        error={error}
        style={{ marginTop: '15px' }}
      >
        <InputForm.Input
          placeholder="태그를 입력해주세요"
          onChange={handleChange}
          value={value}
        />
        <InputForm.Button disabled={value < 1}>등록</InputForm.Button>
      </InputForm>

      <Text
        fontSize={16}
        color={fontNormal}
        block
        style={{ marginTop: '15px', marginBottom: '15px' }}
      >
        * 태그는 최대 5개까지 입력 가능합니다.
      </Text>

      <TagList>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            <Text block fontSize={16} style={{ marginBottom: '2px' }}>
              {tag}
            </Text>
            <RemoveBtn onClick={() => handleRemoveTag(index)}>
              <Icon name="TAG_DELETE" size={8}></Icon>
            </RemoveBtn>
          </TagItem>
        ))}
      </TagList>
    </>
  );
};

export default TagAddForm;
