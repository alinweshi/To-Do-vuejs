<template>
  <div class="reset-password">
    <h1>Reset Password</h1>
    <form @submit.prevent="resetPassword">
      <input type="password" v-model="password" placeholder="New Password" />
      <input type="password" v-model="password_confirmation" placeholder="Confirm Password" />
      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Resetting...' : 'Reset Password' }}
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
      password: '',
      password_confirmation: '',
      errorMessage: '',
      loading: false,
      token: '', // You will retrieve this token from the URL
    }
  },
  mounted() {
    // Get the token from the URL (assuming it's passed as a query parameter)
    const urlParams = new URLSearchParams(window.location.search)
    this.token = urlParams.get('token')
    this.email = urlParams.get('email') // You may also retrieve the email from the URL if needed
    console.log(this.token)
    console.log(this.email)
  },
  methods: {
    async resetPassword() {
      // Validate password fields
      if (!this.password || !this.password_confirmation) {
        this.errorMessage = 'Please fill in both password fields.'
        return
      }

      if (this.password !== this.password_confirmation) {
        this.errorMessage = 'Passwords do not match.'
        return
      }

      // Show loading indicator
      this.loading = true
      try {
        // Make the API call to reset the password
        const response = await axios.post(`${BASE_URL}/api/users/reset-password`, {
          token: this.token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })

        // Check for successful response
        if (response.data.message === 'Password reset successfully.') {
          this.$router.push('/login') // Redirect to login after password reset
        } else {
          this.errorMessage = response.data.message || 'An error occurred.'
        }
      } catch (error) {
        // Error handling from the server
        this.errorMessage =
          error.response?.data?.message || 'An error occurred. Please try again later.'
      } finally {
        // Reset loading state
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.reset-password {
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
