// // 登录接口
export function login() {
  return {
    url: '/login',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      "userid": "10020",
      "password": "123456",
      'data': {
        'token': '4344323121398'
        // 其他数据
      }
    }
  }
}
// 登录接口
// export function login() {
//   const loginData = {
//     "code": 200,
//     "msg": null,
//     "data": {
//       "id": null,
//       "userid": 10020,
//       "password": 123456,
//       "token": "77ae89be36504adfb5c09ef71409ea0e",
//       "expireTime": "2018-09-01T16:24:50.473+0000",
//       "createBy": null,
//       "createTime": null,
//       "lastUpdateBy": null,
//       "lastUpdateTime": "2018-09-01T04:24:50.473+0000"
//     }
//   }
//   return {
//     url: '/login',
//     type: 'post',
//     data: loginData
//   }
// }