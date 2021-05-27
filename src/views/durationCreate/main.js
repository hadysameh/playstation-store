import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import '../../plugins/bootstrap-vue'
import duration from './duration.vue'


Vue.config.productionTip = false

new Vue({
  
  render: h => h(duration)
}).$mount('#app')