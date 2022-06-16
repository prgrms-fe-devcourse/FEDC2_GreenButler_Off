import styled from '@emotion/styled';
import useValidInput from 'hooks/useValidInput';
import InputForm from 'components/InputForm';

const ChangeNameForm = ({ handleSubmit }) => {
  const { value, resetValue, error, setError, handleChange } = useValidInput(6);

  const onSubmit = () => {
    setError('');
    handleSubmit(value);
    resetValue();
  };

  return (
    <>
      <InputForm
        onSubmit={onSubmit}
        error={error}
        style={{
          marginTop: '15px',
          width: 300,
          height: 50,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <InputForm.Input placeholder="이름을 입력해주세요" onChange={handleChange} value={value} />
        <InputForm.Button style={{ width: 54, height: 34, fontSize: 13, fontWeight: 700 }}>
          수정
        </InputForm.Button>
      </InputForm>
    </>
  );
};

export default ChangeNameForm;
