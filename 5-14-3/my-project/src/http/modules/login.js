import axios from '../axios'

/* 
 * 系统登录模块
 */

// 登录
//后台数据
export const login = data => {
    return axios({
        url: 'http://localhost:8081/UserApi/login',
        method: 'post',
        data
    })
}
// export const login = () => {
//     return axios({
//         url: 'http://localhost:8081/UserApi/login',
//         method: 'post',
//         // data
//     })
// }
//Mock数据
// export const login = () => {
//     return axios({
//         url: '/login',
//         method: 'post',
//         // data
//     })
// }
// 登出
export const logout = () => {
    return axios({
        url: '/logout',
        method: 'get'
    })
}