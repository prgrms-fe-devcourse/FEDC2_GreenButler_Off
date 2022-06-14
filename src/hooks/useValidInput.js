import { useState } from 'react';

const useValidInput = (max = 0) => {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;

    // eslint-disable-next-line
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/]/gi;

    if (max && inputValue.length > max) {
      setError(`* 1-${max}글자 사이로 입력해주세요!`);
      setInputValue(value.slice(0, max + 1));
      return;
    }
    if (reg.test(value)) {
      setError('* 특수문자 및 띄어쓰기는 사용할 수 없습니다.');
      setInputValue(value.replace(reg, ''));
      return;
    }

    setInputValue(value);
    setError('');
  };

  return {
    inputValue,
    error,
    setError,
    handleChange,
  };
};

export default useValidInput;
