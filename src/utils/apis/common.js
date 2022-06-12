import axios from 'axios';

const instance = axios.create({
  timeout: 2000,
});
instance.defaults.baseURL = process.env.REACT_APP_API_URL;
instance.interceptors.response.use(onFulfilled, onRejected);

function onFulfilled(response) {
  console.log(response); // 테스트
  return response;
}

function onRejected(error) {
  console.log(error); // 테스트

  const code = error.code;
  const status = error.response?.status;
  if (code === 'ECONNABORTED' || status === 408) {
    alert('요청이 만료되었습니다.');
  }
  return Promise.reject(error);
}

const request = async (config) => {
  return instance(config);
};

export default request;
