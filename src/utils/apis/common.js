import axios from 'axios';

const instance = axios.create({
  timeout: 2000, // 마감시한: 서버 응답이 2초를 넘으면 실패로 간주
});
instance.defaults.baseURL = process.env.REACT_APP_API_URL; // baseURL 설정
instance.interceptors.response.use(onFulfilled, onRejected); // 서버 응답 시 처리 설정

/* 
  성공 시 응답 처리 
  (Axios는 직렬화, 역직렬화를 자동으로 수행한다. 응답을 받고 데이터에 액세스하기만 하면 된다)
*/
function onFulfilled(response) {
  console.log(response); // 테스트 용
  return response;
}

// 실패 시 에러 처리
function onRejected(error) {
  console.log(error); // 테스트 용

  // 마감시한이 지난 경우
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
