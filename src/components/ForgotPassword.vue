<template>
  <div class="forgot-password">
    <h1>Forgot Password</h1>
    <form @submit.prevent="forgotPassword">
      <input type="email" v-model="email" placeholder="Email" />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>
    </form>
  </div>
</template>

<script>
import { BASE_URL } from '@/services/config'

import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      emailError: '',
      loading: false,
    }
  },
  methods: {
    async forgotPassword() {
      // Reset error message if user starts typing again
      this.emailError = ''

      // Validate email
      if (!this.email) {
        this.emailError = 'Please enter your email.'
        return
      }

      // Email format validation (basic check)
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      if (!emailPattern.test(this.email)) {
        this.emailError = 'Please enter a valid email address.'
        return
      }

      // Show loading state
      this.loading = true

      try {
        // Make the API call to your backend to initiate the password reset
        const response = await axios.post(`${BASE_URL}/users/forget-password`, {
          email: this.email,
        })

        // Check if the response is successful
        if (response.data.message === 'Reset link sent successfully.') {
          // Redirect to login page after successful password reset
          this.$router.push('/reset-password')
        }
      } catch (error) {
        // Handle errors (like invalid email or server error)
        if (error.response && error.response.data) {
          this.emailError = error.response.data.message || 'Failed to send reset link.'
        } else {
          this.emailError = 'An error occurred. Please try again later.'
        }
      } finally {
        // Reset loading state
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.forgot-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
