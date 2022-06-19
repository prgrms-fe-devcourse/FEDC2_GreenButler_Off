import { useCallback, useState } from 'react';

const useValidInput = (max = 0) => {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // eslint-disable-next-line
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/]/gi;

    if (max && inputValue.length > 6) {
      setError(`* 1-${max}글자 사이로 입력해주세요!`);
      setValue(inputValue.slice(0, 6));
      return;
    }
    if (reg.test(inputValue)) {
      setError('* 특수문자 및 띄어쓰기는 사용할 수 없습니다.');
      setValue(inputValue.replace(reg, ''));
      return;
    }

    setValue(inputValue);
    setError('');
  };

  const resetValue = () => {
    setValue('');
  };

  return {
    value,
    error,
    setError,
    resetValue,
    handleChange,
  };
};

export default useValidInput;
