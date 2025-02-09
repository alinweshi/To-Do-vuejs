<template>
  <div id="app">
    <!-- Navigation -->
    <my-nav />

    <!-- Main Content -->
    <div id="content">
      <router-view />
      <!-- router for root elements content ,firstly goto router/index.js to take path -->
    </div>

    <!-- Footer -->
    <footer-component />
  </div>
</template>

<script>
import MyNav from '@/components/MyNav.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    MyNav,
    FooterComponent,
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
