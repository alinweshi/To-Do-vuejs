<template>
  <div class="user-login-page">
    <h1>User Login Page</h1>
    <UserLoginForm />
  </div>
</template>

<script>
import UserLoginForm from "@/components/UserLoginForm.vue";

export default {
  name: "UserLoginPage",
  components: {
    UserLoginForm,
  },
};
</script>

<style scoped>
.user-login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
``
