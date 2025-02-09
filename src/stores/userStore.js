import { defineStore } from 'pinia'
import { BASE_URL } from '@/services/config'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: null, // User object, e.g., { name: 'John Doe', email: 'john@example.com' }
  }),
  computed: {
    fullName() {
      return this.user ? `${this.user.firstName} ${this.user.lastName}` : ''
    },
    fullAddress() {
      return this.user
        ? `${this.user.addresses[0].line1},${this.user.addresses[0].line2}, ${this.user.addresses[0].city}, ${this.user.addresses[0].postal_code}`
        : ''
    },
  },
  actions: {
    async fetchUser() {
      try {
        const token = localStorage.getItem('token')
        if (!token) return // If no token exists, exit early

        // Fetch user data from the API
        const response = await fetch(`${BASE_URL}/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          // If the response is not OK (e.g., 401 Unauthorized), log out the user
          console.error('Failed to fetch user:', response.statusText)
          this.logOut()
          return
        }

        const user = await response.json() // Parse the JSON response
        console.log('Fetched user:', user)
        if (user) {
          this.logIn(user) // Update the store with the fetched user
        }
      } catch (error) {
        console.error('Error during fetchUser:', error)
        this.logOut() // Reset the state if fetching fails
      }
    },
    logIn(user) {
      this.isLoggedIn = true
      this.user = user // Set user details
    },
    logOut() {
      this.isLoggedIn = false
      this.user = null // Clear user details
      localStorage.removeItem('token') // Clear the token from localStorage
    },
  },
})
