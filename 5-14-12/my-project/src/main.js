import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SIdentify from './components/identify.vue';
import api from './http/index.js'
import store from './store'

Vue.use(SIdentify);
Vue.use(ElementUI);
Vue.use(api);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store新添加的
  store,//使用store
  template: '<App/>',
  components: { App }
  // render: h => h(App)
})

import vuex from 'vuex'
Vue.use(vuex);
// var store = 
new vuex.Store({//store对象
    state:{
        show:false
    }
})