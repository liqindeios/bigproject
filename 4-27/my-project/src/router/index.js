import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
/*引入页面*/
import Login from '@/View/Login.vue'
import Password from '@/View/Password.vue'
import Home from '@/View/Home.vue'
import HeadBar from '@/View/HeadBar/HeadBar.vue'
import Text from '@/View/Text.vue'
import NavBar from '@/View/NavBar/NavBar.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },   
    {
      path: '/Password',
      name: 'Password',
      component: Password
    },
    // {
    //   path: '/HeadBar',
    //   name: 'HeadBar',
    //   component: HeadBar,      
    // },
    // {
    //   path: '/NavBar',
    //   name: 'NavBar',
    //   component: NavBar,      
    // },
    {
      path: '/Text',
      name: 'Text',
      component: Text,  
    }
  ]
})
