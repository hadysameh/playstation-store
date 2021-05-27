import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import '../../plugins/bootstrap-vue'
import Home from './Home.vue'


Vue.config.productionTip = false

new Vue({
  
  
  render: h => h(Home)
}).$mount('#app')
