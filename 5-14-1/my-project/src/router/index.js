import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'
import Password from '@/views/Password.vue'
import Home from '@/views/Home.vue'
import NF from '@/views/Error/404.vue'

import api from '@/http/api'
import store from '@/store'
import {getIFramePath,getIFrameUrl} from '@/utils/iframe'
import {isURL} from '@/utils/validate'

import UserInfo from '@/views/Sys/UserInfo'
import SalesState from '@/views/Sys/SalesState'
import GodownEntry from '@/views/Sys/GodownEntry'
import SalesProfile from '@/views/Sys/SalesProfile'
import OutboundOrder from '@/views/Sys/OutboundOrder'
import PutStorage from '@/views/Sys/PutStorage'
import Retrieval from '@/views/Sys/Retrieval'
import User from '@/views/Sys/User'
import Echart from '@/views/Sys/Echart'
import InventAccount from '@/views/Sys/InventAccount'
import DeliveryNote from '@/views/Sys/DeliveryNote'
import Journal from '@/views/Sys/Journal'

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
        {path: '/Sys/SalesState',component: SalesState,name: '公司月销售表'},
        {path: '/Sys/GodownEntry',component: GodownEntry,name: '入库单填写'},
        {path: '/Sys/SalesProfile',component: SalesProfile,name: '业务员销售情况表'},
        {path: '/Sys/OutboundOrder',component: OutboundOrder,name: '出库单填写'},
        {path: '/Sys/PutStorage',component: PutStorage,name: '入库管理'},
        {path: '/Sys/Retrieval',component: Retrieval,name: '出库管理'},
        {path: '/Sys/User',component: User,name: '员工信息'},
        {path: '/sys/Echart',component: Echart,name: '销售统计'},
        {path: '/sys/InventAccount',component: InventAccount,name: '库存帐'},
        {path: '/sys/DeliveryNote',component: DeliveryNote,name: '送货单填写'},
        {path: '/sys/Journal',component: Journal,name: '日志文件'}
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
  //后台数据连接
  // console.log("后台菜单")
  // var me = sessionStorage.menu
  // var menu = JSON.parse(me)
  // let dynamicRoutes = addDynamicRoutes(menu)
  // router.options.routes[1].children = router.options.routes[1].children.concat(dynamicRoutes)
  // // router.addRoutes(router.options.routes)
  // store.commit('menuRouteLoaded', true)
  // store.commit('setMenuTree', menu)
  
  //Mock数据
  api.menu.findMenuTree().then(res => {
    // 添加动态路由
    let dynamicRoutes = addDynamicRoutes(res.data)
    // 处理静态组件绑定路由
    // handleStaticComponent(router, dynamicRoutes)
    router.options.routes[1].children = router.options.routes[1].children.concat(dynamicRoutes)
    // router.addRoutes(router.options.routes)
    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setMenuTree', res.data)
  }).catch(function(res) {
  })
}
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
         route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
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
          route['component'] = resolve => require([`@/views/${url}.vue`], resolve)
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