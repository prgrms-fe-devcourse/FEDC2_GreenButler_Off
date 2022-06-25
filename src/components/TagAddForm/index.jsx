import styled from '@emotion/styled';
import useValidInput from 'hooks/useValidInput';
import { InputForm, Text, Icon } from 'components';
import theme from 'styles/theme';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';

const { mainGreen, fontNormal, mainRed } = theme.color;

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

const RemoveBtn = styled.button`
  margin-left: 4px;
`;

const TagAddForm = ({ onAddTag, onRemoveTag, tags }) => {
  const CHARACTER_LIMIT = 6;
  const TAG_LIMIT = 5;
  const { value, resetValue, error, handleChange } = useValidInput(CHARACTER_LIMIT);
  const [isEmphasis, setIsEmphasis] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const handleRemoveTag = (index) => {
    onRemoveTag(index);
    setErrorMsg('');
  };

  const onSubmit = useCallback(() => {
    setErrorMsg('');

    if (tags.includes(`#${value}`)) {
      setErrorMsg('* 이미 등록한 태그입니다.');
      return;
    }

    if (tags.length >= TAG_LIMIT) {
      setIsEmphasis(true);
      return;
    }

    onAddTag(value.slice(0, CHARACTER_LIMIT));
    resetValue();
  }, [tags, onAddTag, resetValue, setErrorMsg, value]);

  useEffect(() => {
    setErrorMsg(error);
  }, [error]);

  return (
    <>
      <InputForm onSubmit={onSubmit} error={errorMsg} style={{ marginTop: '15px' }}>
        <InputForm.Input
          placeholder="태그를 입력해주세요"
          onChange={handleChange}
          value={value}
          onBlur={() => isEmphasis && setIsEmphasis(false)}
        />
        <InputForm.Button disabled={value < 1}>등록</InputForm.Button>
      </InputForm>

      <Text
        fontSize={16}
        color={isEmphasis ? mainRed : fontNormal}
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
              <Icon name="TAG_DELETE" size={8} />
            </RemoveBtn>
          </TagItem>
        ))}
      </TagList>
    </>
  );
};

export default TagAddForm;
