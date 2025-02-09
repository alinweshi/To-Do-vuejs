<template>
  <div class="user-registration-page">
    <h1>User Registration Page</h1>
    <UserRegistrationForm />
  </div>
</template>

<script>
import UserRegistrationForm from "@/components/UserRegistrationForm.vue";
export default {
  name: "UserRegistrationPage",
  components: {
    UserRegistrationForm,
  },
};
</script>
