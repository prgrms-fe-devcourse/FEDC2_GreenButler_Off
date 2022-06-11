import Input from 'components/basic/Input';
import Button from 'components/basic//Button';
import styled from '@emotion/styled';
import useForm from 'hooks/useForm';
import colors from 'utils/constants/colors';

const { mainGreen, white } = colors;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
  position: absolute;
  left: 50px;
  bottom: 20px;
`;

const StyledForm = styled.form`
  padding: 22px 22px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 60px;
  top: 55px;
  font-weight: 700;
  background-color: ${mainGreen};
  color: ${white};
`;

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

const EditForm = ({
  onSubmit,
  placeholder = '태그를 입력해 주세요.',
  name = 'tag',
  width = '460px',
  height = '70px',
  fontWeight = '400',
  children = '등록',
  buttonWidth = '65px',
  buttonHeight = '46px',
  inValid = false,
}) => {
  const { values, errors, handleSubmit, handleChange, isLoading } = useForm({
    initialValues: {
      tag: '',
      fullName: '',
    },
    onSubmit: async () => {
      await sleep();
      console.log('submit!');
    },
    validate: ({ tag, fullName }) => {
      const newErrors = {};
      if (name === 'tag' && !tag) {
        newErrors.tag = '태그를 입력해주세요!';
        inValid = true;
      }
      if (name === 'fullName' && !fullName) {
        newErrors.fullName = '수정할 닉네임을 입력해주세요!';
        inValid = true;
      }
      return newErrors;
    },
  });

  const inputProps = {
    placeholder,
    name,
    fontWeight,
    inValid,
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input onChange={handleChange} {...inputProps} />
      {errors[name] && <ErrorText>{errors[name]}</ErrorText>}
      <StyledButton
        type="submit"
        disabled={isLoading}
        width={buttonWidth}
        height={buttonHeight}
      >
        {children}
      </StyledButton>
    </StyledForm>
  );
};

export default EditForm;
