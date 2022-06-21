import { useState } from 'react';

const useValidInputs = ({ initialValues, onSubmit, validate, max = 0 }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorfullName, setErrorfullName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const handleChange = (e) => {
    // eslint-disable-next-line
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/]/gi;

    const { name, value } = e.target;

    if (name === 'password') {
      if (max && value.length > max) {
        setErrorPassword('* 8-10자 사이로 입력해 주세요.');
        setValues({ ...values, [name]: value.slice(0, max) });
        return;
      }

      setErrorPassword('');
      setValues({ ...values, [name]: value });
    }
    if (name === 'fullName') {
      if (value.length > 6) {
        setErrorfullName('* 특수문자를 제외하고 6자 이내로 입력해 주세요.');
        setValues({ ...values, [name]: value.slice(0, 6) });
        return;
      } else if (reg.test(value)) {
        setErrorfullName('* 특수문자를 제외하고 6자 이내로 입력해 주세요.');
        setValues({ ...values, [name]: value.replace(reg, '') });
        return;
      }

      setErrorfullName('');
      setValues({ ...values, [name]: value });
    }

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate ? validate(values) : {};
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };
  return {
    values,
    errors,
    errorPassword,
    errorfullName,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useValidInputs;
