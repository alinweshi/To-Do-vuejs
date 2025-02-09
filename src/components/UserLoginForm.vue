<template>
  <div class="user-login-form">
    <h2>User Login</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required aria-describedby="emailFeedback" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          aria-describedby="passwordFeedback"
        />
      </div>
      <button type="submit" :disabled="isSubmitting">
        <span v-if="isSubmitting">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <div>
      <router-link to="/signup">Don't have an account? Register here</router-link>
    </div>
    <div>
      <router-link to="/forgot-password">Forgot Password?</router-link>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '@/services/config'

export default {
  data() {
    return {
      email: '',
      password: '',
      isSubmitting: false,
      error: '',
    }
  },
  methods: {
    async loginUser() {
      this.isSubmitting = true
      this.error = ''
      try {
        const response = await axios.post(`${BASE_URL}/users/login`, {
          email: this.email,
          password: this.password,
        })

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.access_token)
        this.$router.replace('/tasks')
      } catch (error) {
        if (error.response && error.response.data.error) {
          this.error = error.response.data.error
        } else {
          this.error = 'An error occurred. Please try again.'
        }
        console.error('Error during login:', error)
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style scoped>
.user-login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
}
</style>
