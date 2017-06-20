import Vue from 'vue';
import App from './App.vue';

<% if (vueRouter) { %>
import VueRouter from 'vue-router';
import routerConfig from './router/index';
Vue.use(VueRouter);
const router = new VueRouter(routerConfig);
<% } %>

new Vue({
  el: '#app',
  <% if (vueRouter) { %>
  router,
  <% } %>
  render: h => h(App)
});
