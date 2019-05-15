// 请求接口汇总模块，聚合模块 API。
import axios from '../axios'
/********USer****/
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
/************入库管理*********/
//获取全部产品
export const getProduct = () => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/findAllRecord',
        method: 'get'
    })
}
//查询员工
export const findProduct = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/findById',
        method: 'post',
        data
    })
}
export const addProduct = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/add',
        method: 'post',
        data
    })
}
export const updateProduct = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/update',
        method: 'put',
        data
    })
}
//********员工销售******** */
//获取全部员工销售
export const getProductSale = () => {
    return axios({
        url: 'http://localhost:8081/ProductSalesApi/findAll',
        method: 'get'
    })
}
//获取全部员工销售
export const findProductSalename = data => {
    return axios({
        url: 'http://localhost:8081/ProductSalesApi/findByName',
        method: 'post',
        data
    })
}
http://localhost:8081/ExitStorageApi/findAllRecord
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