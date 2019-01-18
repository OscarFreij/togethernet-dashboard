import Vue from 'vue';
import App from './vue/App.vue';
import Admin from './vue/Admin.vue';

const vm = new Vue({
  el: '#root',
  render: h => h(App),
});

// Hack of the year
window.vm = vm;

const adminWindow = open();
adminWindow.document.body.innerHTML = '<div id="root"></div>';
new Vue({
  el: adminWindow.document.getElementById('root'),
  render: h => h(Admin),
});

window.addEventListener('beforeunload', () => { adminWindow.close(); });
