import PropTypes from 'prop-types';
import Button from 'components/basic/Button';
import styled from '@emotion/styled';
import useForm from 'hooks/useForm';
import theme from 'styles/theme';
import { useState } from 'react';
import Icon from '../Icon';

const { mainGreen, borderNormal, fontNormal, backgroundLight } = theme.color;

const StyledForm = styled.form`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

const StyledInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid ${borderNormal};
`;

const StyledButton = styled(Button)`
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${mainGreen};
  color: white;
`;

const StyledInput = styled.input`
  font-size: 20px;
  border: none;
  width: 100%;
  min-height: 50px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 20px;
  background-color: transparent;

  ::placeholder {
    color: ${fontNormal};
  }

  &:focus {
    outline: none;
  }
`;

/*
  수정해야 할 부분

  1. 각 컴포넌트마다 validation을 해줘야 하는 조건이 다른데
  내부에 구현을 하기에는 조금 애매한 느낌이 든다.
  => 일단 이렇게 적용 후 이후에 리팩토링

  2. submit이 아니라 input의 값이 초과되면 버튼을 disabled를 해야하기 때문에
  코드의 수정이 필요하다. 시간 소요될 듯 하여 일단 이후에 수정 예정

  3. 필요하다면 focus시 border 컬러 변경

*/
const InputForm = ({
  onSubmit,
  placeholder,
  name = 'tag',
  width = '100%',
  fontSize = '18px',
  enterButton = '',
  ...props
}) => {
  const [currentInvalid, setInvalid] = useState(false);
  const { values, errors, handleSubmit, handleChange, isLoading } = useForm({
    initialValues: {
      value: '',
    },
    onSubmit: async ({ value }) => {
      setInvalid(false);
      await onSubmit(value);
    },
    validate: ({ value }) => {
      const newErrors = {};

      if (name === 'tag' && (!value || value.length > 6)) {
        newErrors.value = '태그는 1-6글자 사이로 입력해주세요!';
      }
      if (name === 'fullName' && (!value || value.length > 7)) {
        newErrors.value = '닉네임은 1-7글자 사이로 입력해주세요!';
      }
      if (name === 'search' && !value) {
        newErrors.value = '검색어를 입력해주세요!';
      }

      if (newErrors.value) {
        setInvalid(true);
      }

      return newErrors;
    },
  });

  const inputProps = {
    width,
    placeholder,
    fontSize,
    inValid: currentInvalid,
  };

  const style = {
    search: {
      border: 'none',
      backgroundColor: backgroundLight,
    },
  };

  return (
    <StyledForm
      onSubmit={handleSubmit}
      width={width}
      style={{ ...props.style }}
    >
      <StyledInner style={{ ...style[name] }}>
        {name === 'search' && <Icon name="SEARCH_GRAY" size={30} />}
        <StyledInput
          type="text"
          name="value"
          onChange={handleChange}
          {...inputProps}
        />
        {enterButton && (
          <StyledButton
            type="submit"
            disabled={isLoading}
            width={'auto'}
            height={50}
          >
            {enterButton}
          </StyledButton>
        )}
      </StyledInner>
      {errors.value && errors.value}
    </StyledForm>
  );
};

export default InputForm;

InputForm.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.string,
  enterButton: PropTypes.string,
  inValid: PropTypes.bool,
};
