import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import '../../plugins/bootstrap-vue'
import deviceRecords from './deviceRecords.vue'


Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(deviceRecords)
}).$mount('#app')