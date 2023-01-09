import Vue from 'vue'
import App from './App.vue'
import axios from './http.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from 'element-ui';

import router from './router'
import store from './store'
import qs from 'qs'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;
Vue.use(qs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
