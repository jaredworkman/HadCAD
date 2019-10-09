import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment' // Display datas
// require('dotenv').config({path: require('find-config')('.env')} );

Vue.config.productionTip = false

Vue.filter('date', (val) => {
  if (val) return moment(String(val)).format('MM/DD/YYYY');
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
