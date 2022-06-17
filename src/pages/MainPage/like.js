export default {
  data: {
    _id: '62ac0c712c8a6e1973360772',
    user: '629e29bd6d18b41c5b238ba2',
    post: '62a8d1594c93de3355a58ac5',
    createdAt: '2022-06-17T05:09:05.363Z',
    updatedAt: '2022-06-17T05:09:05.363Z',
    __v: 0,
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '188',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: null,
    },
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWUyOWJkNmQxOGI0MWM1YjIzOGJhMiIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNjU0NjcxNjI5fQ.etL5BJpmU-w7nUg1JDa_1oEHqBKkTgTxPQ0tfOfj-As',
    },
    baseURL: 'http://kdt.frontend.2nd.programmers.co.kr:5007',
    method: 'post',
    url: '/likes/create',
    data: '{"postId":"62a8d1594c93de3355a58ac5"}',
  },
  request: {},
};
