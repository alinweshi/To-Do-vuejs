<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <div class="form-label"><label for="firstName">First Name</label></div>
        <div class="form-input">
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="firstName"
            required
            :class="{ 'is-invalid': firstName && !isValidFirstName }"
          />
        </div>
        <div v-if="firstName && !isValidFirstName" class="invalid-feedback">
          First name must be at least 2 characters long.
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><label for="lastName">Last Name</label></div>
        <div class="form-input">
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="lastName"
            required
            :class="{ 'is-invalid': lastName && !isValidLastName }"
          />
        </div>
        <div v-if="lastName && !isValidLastName" class="invalid-feedback">
          Last name must be at least 2 characters long.
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><label for="phone">Phone Number</label></div>
        <div class="form-input">
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="phone"
            required
            :class="{ 'is-invalid': phone && !isValidPhone }"
          />
        </div>
        <div v-if="phone && !isValidPhone" class="invalid-feedback">
          Please enter a valid 10-digit phone number.
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><label for="email">Email address</label></div>
        <div class="form-input">
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
            :class="{ 'is-invalid': email && !isValidEmail }"
          />
        </div>
        <div v-if="email && !isValidEmail" class="invalid-feedback">
          Please enter a valid email address.
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><label for="password">Password</label></div>
        <div class="form-input">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
            :class="{ 'is-invalid': password && !isValidPassword }"
          />
        </div>
        <div v-if="password && !isValidPassword" class="invalid-feedback">
          Password must be at least 6 characters long.
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><label for="confirmPassword">Confirm Password</label></div>
        <div class="form-input">
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            :class="{ 'is-invalid': confirmPassword && confirmPassword !== password }"
          />
        </div>
        <div v-if="confirmPassword && confirmPassword !== password" class="invalid-feedback">
          Passwords do not match.
        </div>
      </div>
      <div>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting">Registering...</span>
          <span v-else>Register</span>
        </button>
      </div>
    </form>
    <div>
      <router-link to="/login">Already have an account? Login</router-link>
    </div>
  </div>
</template>
<style scoped>
/* Container: Center content and apply padding */
.container {
  max-width: 500px; /* Limiting the max width for better readability */
  margin: 0 auto; /* Center horizontally */
  padding: 20px;
  border: 1px solid #ddd; /* Subtle border */
  border-radius: 8px; /* Rounded corners */
  background-color: #f9f9f9; /* Light background */
}

/* Form Group: Consistent spacing between input fields */
.form-group {
  margin-bottom: 20px;
}

/* Label styling */
.form-label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

/* Input field styles */
.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc; /* Light border */
  border-radius: 5px;
  font-size: 1rem; /* Consistent font size */
  transition: border-color 0.3s ease; /* Smooth transition on focus */
}

.form-control:focus {
  border-color: #007bff; /* Highlight border on focus */
  outline: none;
}

/* Invalid input field style */
.is-invalid {
  border-color: #dc3545; /* Red border when invalid */
}

/* Button Styling */
.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color: #007bff; /* Blue background */
  color: #fff;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Feedback message for invalid inputs */
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
}

/* Spinner style for submitting */
.spinner-border {
  margin-top: 20px;
}

/* Layout: Align form and page content in the center */
.user-registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f4f4f4; /* Light background */
}
</style>

<script>
import axios from 'axios'
import { BASE_URL } from '@/services/config'

export default {
  name: 'RegistrationForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      isSubmitting: false,
      errors: {},
    }
  },
  computed: {
    isValidFirstName() {
      return this.firstName.length >= 2
    },
    isValidLastName() {
      return this.lastName.length >= 2
    },
    isValidPhone() {
      const phonePattern = /^\d{11}$/
      return phonePattern.test(this.phone)
    },
    isValidEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      return emailPattern.test(this.email)
    },
    isValidPassword() {
      return this.password.length >= 6
    },
  },
  methods: {
    async register() {
      if (
        !this.isValidFirstName ||
        !this.isValidLastName ||
        !this.isValidPhone ||
        !this.isValidEmail ||
        !this.isValidPassword ||
        this.password !== this.confirmPassword
      ) {
        alert('Please fix the errors in the form.')
        return
      }

      this.isSubmitting = true
      try {
        const response = await axios.post(`${BASE_URL}/users/register`, {
          first_name: this.firstName,
          last_name: this.lastName,
          phone: this.phone,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
        })

        localStorage.setItem('token', response.data.token)
        alert('User registered successfully')
        this.$router.replace('/login')
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors
        } else {
          alert('An error occurred. Please try again.')
        }
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
