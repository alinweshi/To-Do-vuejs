<template>
  <div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'BlankLayout',
}
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}
</style>
