import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SIdentify from './components/identify.vue';
// import api from './http/index.js'

Vue.use(SIdentify);
Vue.use(ElementUI);
// vue.use(api);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
