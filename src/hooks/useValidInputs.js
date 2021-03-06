import { useState } from 'react';

const useValidInputs = ({ initialValues, onSubmit, validate, max = 0 }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorfullName, setErrorfullName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPasswordCheck, setErrorPasswordCheck] = useState('');
  const handleChange = (e) => {
    // eslint-disable-next-line
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/]/gi;

    const { name, value } = e.target;
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (name === 'email') {
      if (!regEmail.test(value)) {
        setErrorEmail('* 이메일 형식이 아닙니다.');
        setValues({ ...values, [name]: value });
        return;
      }
      setErrorEmail('');
      setValues({ ...values, [name]: value });
    }
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

    if (name === 'passwordCheck') {
      if (max && value.length > max) {
        setValues({ ...values, [name]: value.slice(0, max) });
        return;
      } else if (value !== values['password']) {
        setErrorPasswordCheck('* 비밀번호가 일치하지 않습니다.');
        setValues({ ...values, [name]: value });
        return;
      }

      setErrorPasswordCheck('');
      setValues({ ...values, [name]: value });
    }

    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    // eslint-disable-next-line
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/]/gi;
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const { name, value } = e.target;
    if (name === 'email') {
      if (!value) {
        setErrorEmail('* 이메일을 입력해 주세요.');
        setValues({ ...values, [name]: value });
        return;
      } else if (!regEmail.test(value)) {
        setErrorEmail('* 이메일 형식이 아닙니다.');
        setValues({ ...values, [name]: value });
        return;
      }

      setErrorEmail('');
      setValues({ ...values, [name]: value });
    }
    if (name === 'fullName') {
      if (!value) {
        setErrorfullName('* 닉네임을 입력해 주세요.');
        setValues({ ...values, [name]: value });
        return;
      }

      setErrorfullName('');
      setValues({ ...values, [name]: value });
    }
    if (name === 'passwordCheck') {
      if (value !== values['password']) {
        setErrorPasswordCheck('* 비밀번호가 일치하지 않습니다.');
        setValues({ ...values, [name]: value });
        return;
      }

      setErrorPasswordCheck('');
      setValues({ ...values, [name]: value });
    }
    if (name === 'password') {
      if (max && (value.length > max || value.length < 8)) {
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
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate ? validate(values) : {};
    
    setErrorEmail(newErrors['email']);
    setErrorPassword(newErrors['password']);
    setErrorfullName(newErrors['fullName']);
    setErrorPasswordCheck(newErrors['passwordCheck']);

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
    errorEmail,
    errorPasswordCheck,
    isLoading,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useValidInputs;
