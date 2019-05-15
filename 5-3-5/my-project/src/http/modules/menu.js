import axios from '../axios'

/* 
 * 菜单管理模块
 */

export const findMenuTree = data => {
    return axios({
        url: '/menu/findMenuTree',
        method: 'get'
    })
}