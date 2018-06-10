// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import http from "./utils/http"
import '../server'
import './common/style.css'
import "element-ui/lib/theme-chalk/index.css"


Vue.use(ElementUI)
Vue.use(http)
Vue.config.silent = false
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
