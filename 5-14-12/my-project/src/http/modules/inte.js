// 请求接口汇总模块，聚合模块 API。
import axios from '../axios'
/********USer******/
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
//查询入库单（ID号)
export const findProduct = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/findById',
        method: 'post',
        data
    })
}
//查询入库单（产品名字)
export const findProductName = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/findByName',
        method: 'post',
        data
    })
}
//添加入库单
export const addProduct = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/add',
        method: 'post',
        data
    })
}
//编辑入库单
export const updateProduct = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/update',
        method: 'put',
        data
    })
}
//删除入库单
export const delProduct = data => {
    return axios({
        url: 'http://localhost:8081/EnterStorageApi/delete',
        method: 'post',
        data
    })
}
/************出库管理********/
//获取全部产品
export const getoutProduct = () => {
    return axios({
        url: 'http://localhost:8081/ExitStorageApi/findAllRecord',
        method: 'get'
    })
}
//删除出库单
export const deloutProduct = data => {
    return axios({
        url: 'http://localhost:8081/ExitStorageApi/delete',
        method: 'post',
        data
    })
}
//查询出库单（ID号)
export const findoutProduct = data => {
    return axios({
        url: 'http://localhost:8081/ExitStorageApi/findById',
        method: 'post',
        data
    })
}
//查询出库单（产品名字)
export const findoutProductName = data => {
    return axios({
        url: 'http://localhost:8081/ExitStorageApi/findByName',
        method: 'post',
        data
    })
}
//添加出库单
export const addoutProduct = data => {
    return axios({
        url: 'http://localhost:8081/ExitStorageApi/add',
        method: 'post',
        data
    })
}
//
//查询员工
// export const findProduct = data => {
//     return axios({
//         url: 'http://localhost:8081/EnterStorageApi/findById',
//         method: 'post',
//         data
//     })
// }
// export const addProduct = data => {
//     return axios({
//         url: 'http://localhost:8081/EnterStorageApi/add',
//         method: 'post',
//         data
//     })
// }
// export const updateProduct = data => {
//     return axios({
//         url: 'http://localhost:8081/EnterStorageApi/update',
//         method: 'put',
//         data
//     })
// }
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
/************公司销售**********/
//获取全部的公司销售
export const getSell = () => {
    return axios({
        url: 'http://localhost:8081/SellApi/findAll',
        method: 'get'
    })
}
//查询公司销售（ID号)
export const findSell = data => {
    return axios({
        url: 'http://localhost:8081/SellApi/findById',
        method: 'post',
        data
    })
}
//查询公司销售（产品名字)
export const findSellName = data => {
    return axios({
        url: 'http://localhost:8081/SellApi/findByName',
        method: 'post',
        data
    })
}
//添加公司销售
export const addSell = data => {
    return axios({
        url: 'http://localhost:8081/SellApi/add',
        method: 'post',
        data
    })
}