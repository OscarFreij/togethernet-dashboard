import Vue from 'vue';
import App from './vue/App.vue';
import Admin from './vue/Admin.vue';

const vm = new Vue({
  el: '#root',
  render: h => h(App),
});
