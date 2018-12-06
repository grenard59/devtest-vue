// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'
import { API_URL } from './Constants'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(new VueSocketIO({
  debug: true,
  connection: API_URL
}))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
