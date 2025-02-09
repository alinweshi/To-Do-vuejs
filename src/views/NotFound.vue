<template>
  <div class="container">
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <p>there is no page with this name</p>
    </div>
    <div class="button">
      <button><RouterLink :to="'/'">back to home</RouterLink></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
