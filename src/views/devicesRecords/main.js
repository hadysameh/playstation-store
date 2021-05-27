import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import '../../plugins/bootstrap-vue'
import devicesRecords from './devicesRecords.vue'


Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(devicesRecords)
}).$mount('#app')