// 请求接口汇总模块，聚合模块 API。
import axios from '../axios'

//获取全部员工
export const getUser = () => {
    return axios({
        url: 'http://localhost:8081/UserApi/findAllUser',
        method: 'get'
    })
}
//查询员工
export const findUser = data => {
    return axios({
        url: 'http://localhost:8081/UserApi/findById',
        method: 'post',
        data
    })
}
//添加员工
export const addUser = data => {
    return axios({
        url: 'http://localhost:8081/UserApi/add',
        method: 'post',
        data
    })
}

//获取全部产品
export const getProduct = () => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/findAllRecord',
        method: 'get'
    })
}
//
// export const findUser = data => {
//     return axios({
//         url: 'http://localhost:8081/UserApi/findById',
//         method: 'post',
//         data
//     })
// }
// export const findUser = data => {
//     return axios({
//         url: 'http://localhost:8081/UserApi/findById',
//         method: 'post',
//         data
//     })
// }
// export const findUser = data => {
//     return axios({
//         url: 'http://localhost:8081/UserApi/findById',
//         method: 'post',
//         data
//     })
// }