import Vue from 'vue';
import App from './vue/App.vue';

const vm = new Vue({
  el: '#root',
  render: h => h(App)
})

export default vm
