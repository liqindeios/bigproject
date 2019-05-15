import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
/*引入页面*/
import Login from '@/View/Login.vue'
import Password from '@/View/Password.vue'
import Home from '@/View/Home.vue'
import NF from '@/View/Error/404.vue'

import Menu from '@/View/SysMng/Menu.vue'
import User from '@/View/SysMng/User.vue'
import Main from '@/View/SysMng/Main.vue'

Vue.use(Router)

export default new Router
({
  routes: [
    {
      path: '/',
      name: 'Login',
      // component: Login
      component: () => import('@//View/Login')
    },   
    {
      path: '/Password',
      name: 'Password',
      component: Password
    },
    {
      path: '/Home',
      name: '首页',
      component: Home,
      children: [
        { path: '/SysMng/User', component: User, name: '机构管理' },
        { path: '/SysMng/Main', component: Main, name: '主页' },
        { path: '/SysMng/User', component: User, name: '用户管理' },
        { path: '/SysMng/Main', component: Main, name: '角色管理' },
        { path: '/SysMng/Menu', component: Menu, name: '菜单管理' },
      ]
    },
    {
      path: '/404',
      name: 'NF',
      component: NF
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   //to and from are Route Object,next() must be called to resolve the hook}
//   //登录界面登录成功之后，会把用户信息保存在会话
//   //存在时间为会话生命周期，页面关闭即失效
//   let user = sessionStorage.getItem('user');
//   if(to.path == 'login'){
//     //如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
//     if(user){
//       next({path: '/Home'})
//     }else{
//       next()
//     }
//   }else{
//     //如果访问非登录界面，且用户会话信息不存在，代表未登录，则跳转到登录界面
//     if(!user){
//       next({path: '/'})
//     }else{
//       next()
//     }
//   }
// })