<template>
  <div class="goto">
    <button @click="goToUp">Go Forward</button>
    <button @click="reload">Reload</button>
    <button @click="goToDown">Go Down</button>
  </div>
</template>
<style scoped></style>
<script>
export default {
  name: "GoToComponent",
  data() {},
  methods: {
    goToUp() {
      this.$router.go(+1);
    },
    goToDown() {
      this.$router.go(-1);
    },
    reload() {
      this.$router.go(0);
    },
  },
};
</script>
