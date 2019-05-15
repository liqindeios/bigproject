import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/View/Login.vue'
import Password from '@/View/Password.vue'
import Home from '@/View/Home.vue'
import NF from '@/View/Error/404.vue'

import api from '@/http/api'
import store from '@/store'
import {getIFramePath,getIFrameUrl} from '@/utils/iframe'
import {isURL} from '@/utils/validate'

import UserInfo from '@/View/Sys/UserInfo'
import UserIndi from '@/View/Sys/UserIndi'
import FinaMang from '@/View/Sys/FinaMang'
import GodownEntry from '@/View/Sys/GodownEntry'
import InveControl from '@/View/Sys/InveControl'
import OutboundOrder from '@/View/Sys/OutboundOrder'
import OutgoingInquiry from '@/View/Sys/OutgoingInquiry'
import Permissions from '@/View/Sys/Permissions'
import ProductsInfo from '@/View/Sys/ProductsInfo'
import PutStorage from '@/View/Sys/PutStorage'
import Retrieval from '@/View/Sys/Retrieval'
import SaleGoods from '@/View/Sys/SaleGoods'
import WarehousingInquiry from '@/View/Sys/WarehousingInquiry'
import User from '@/View/Sys/User'

Vue.use(Router)

// export default new Router
const router = new Router({
  routes : [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: '首页',
      component: Home,
      children: [
        {path: '/Sys/UserInfo',component: UserInfo,name: '个人信息'},
        {path: '/Sys/UserIndi',component: UserIndi,name: '个人绩效'},
        {path: '/Sys/FinaMang',component: FinaMang,name: '个人绩效'},
        {path: '/Sys/GodownEntry',component: GodownEntry,name: '个人绩效'},
        {path: '/Sys/InveControl',component: InveControl,name: '个人绩效'},
        {path: '/Sys/OutboundOrder',component: OutboundOrder,name: '个人绩效'},
        {path: '/Sys/OutgoingInquiry',component: OutgoingInquiry,name: '个人绩效'},
        {path: '/Sys/Permissions',component: Permissions,name: '个人绩效'},
        {path: '/Sys/ProductsInfo',component: ProductsInfo,name: '个人绩效'},
        {path: '/Sys/PutStorage',component: PutStorage,name: '个人绩效'},
        {path: '/Sys/SaleGoods',component: SaleGoods,name: '个人绩效'},
        {path: '/Sys/WarehousingInquiry',component: WarehousingInquiry,name: '个人绩效'},
        {path: '/Sys/Retrieval',component: Retrieval,name: '员工信息'},
        {path: '/Sys/User',component: User,name: '员工信息'}
      ]
    },
    {
      path: '/Password',
      name: 'Password',
      component: Password
    },
    {
      path: '/404',
      name: 'NF',
      component: NF
    }
  ]
})
router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook}
  //登录界面登录成功之后，会把用户信息保存在会话
  //存在时间为会话生命周期，页面关闭即失效
  let user = sessionStorage.getItem('user');
  if (to.path == '/') {
    //如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (user) {
      next({path: '/Home'})
    } else {
      next()
    }
  } else {
    //如果访问非登录界面，且用户会话信息不存在，代表未登录，则跳转到登录界面
    if (!user) {
      next({path: '/'})
    } else {
      addDynamicMenuAndRoutes(user, to, from)
      next()
    }
  }
})
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  if(store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.menu.findMenuTree().then(res => {
    // 添加动态路由
    // console.log(res)
    let dynamicRoutes = addDynamicRoutes(res.data)
    // let dynamicRoutes = addDynamicRoutes(res)
    // 处理静态组件绑定路由
    // handleStaticComponent(router, dynamicRoutes)
    router.options.routes[1].children = router.options.routes[1].children.concat(dynamicRoutes)
    router.addRoutes(router.options.routes)
    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setMenuTree', res.data)
    // store.commit('setMenuTree', res)
  }).then(res => {
    api.user.findPermissions({'name':userName}).then(res => {
      // 保存用户权限标识集合
      store.commit('setPerms', res.data)
      // store.commit('setPerms', res)
    })
  })
  .catch(function(res) {
  })
}
/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
// function handleStaticComponent(router, dynamicRoutes) {
//   for(let j=0;j<dynamicRoutes.length; j++) {
//     if(dynamicRoutes[j].name == '代码生成') {
//       dynamicRoutes[j].component = Generator
//       break
//     }
//   }
//   router.options.routes[1].children = router.options.routes[1].children.concat(dynamicRoutes)
// }

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}
/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
       menuList[i].url = menuList[i].url.replace(/^\//, '')
       // 创建路由配置
       var route = {
         path: menuList[i].url,
         component: null,
         name: menuList[i].name,
         meta: {
           icon: menuList[i].icon,
           index: menuList[i].id
         }
       }
       let path = getIFramePath(menuList[i].url)
       if (path) {
         // 如果是嵌套页面, 通过iframe展示
         route['path'] = path
         route['component'] = resolve => require([`@/View/IFrame/IFrame`], resolve)
         // 存储嵌套页面路由路径和访问URL
         let url = getIFrameUrl(menuList[i].url)
         let iFrameUrl = {'path':path, 'url':url}
         store.commit('addIFrameUrl', iFrameUrl)
       } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].url.split('/')
          let url = ''
          for(let i=0; i<array.length; i++) {
             url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          route['component'] = resolve => require([`@/View/${url}.vue`], resolve)
          // console.log(url)
          // console.log(route['component'])
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    // console.log('动态路由加载...')
    // console.log(routes)
    // console.log('动态路由加载完成.')
  }
  return routes
 }
export default router