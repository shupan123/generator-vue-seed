<template lang="html">
<section>
  <h3>Hello Vue</h3>
  <% if (vueRouter) { %>
  <v-menu></v-menu>
  <router-view></router-view>
  <% } %>
</section>
</template>

<script>
<% if (vueRouter) { %>
import VMenu from './components/VMenu.vue';

export default {
  components: {VMenu}
}
<% } %>
</script>

<style lang="less">
@import "./less/common.less";

</style>
