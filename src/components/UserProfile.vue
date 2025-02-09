<template>
  <div class="profile">
    <h1 class="title">User Profile</h1>
    <p v-if="loading" class="loading">Loading profile...</p>
    <div v-else class="profile-details">
      <!-- View Mode: Render only if not editing and user data exists -->
      <div v-if="!editing && userStore.user" class="details-view">
        <p><strong>Name:</strong> {{ fullName }}</p>
        <p><strong>Email:</strong> {{ userStore.user.email }}</p>
        <button class="btn edit" @click="editProfile">✏️ Edit</button>
      </div>

      <!-- Edit Mode -->
      <div v-else class="details-edit">
        <div class="input-group">
          <label for="name">Name:</label>
          <input id="name" v-model="profile.name" class="edit-input" />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input id="email" v-model="profile.email" class="edit-input" />
        </div>
        <div class="input-group">
          <label for="bio">Bio:</label>
          <textarea id="bio" v-model="profile.bio" class="edit-input"></textarea>
        </div>
        <div class="profile-actions">
          <button class="btn save" @click="updateProfile">✅ Save</button>
          <button class="btn cancel" @click="cancelEdit">❌ Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { useUserStore } from '@/stores/userStore'

export default {
  data() {
    return {
      profile: {},
      editing: false,
      loading: true,
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    },
    fullName() {
      const user = this.userStore.user || {}
      return `${user.first_name || ''} ${user.last_name || ''}`.trim()
    },
  },
  async created() {
    await this.fetchProfile()
  },
  methods: {
    async fetchProfile() {
      this.loading = true
      try {
        const response = await api.getProfile()
        // Populate the local profile object with the fetched data
        this.profile = { ...response.data }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        this.loading = false
      }
    },
    editProfile() {
      this.editing = true
    },
    cancelEdit() {
      this.editing = false
      // Re-fetch profile data to discard local changes if needed
      this.fetchProfile()
    },
    async updateProfile() {
      try {
        await api.updateProfile(this.profile.id, {
          name: this.profile.name,
          email: this.profile.email,
          bio: this.profile.bio,
        })
        this.editing = false
        // Optionally, update the user store here after a successful update.
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    },
  },
}
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  color: #777;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.details-view p {
  font-size: 16px;
  margin: 5px 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

.edit-input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s ease-in-out;
}

.btn:hover {
  opacity: 0.8;
}

.edit {
  background: #007bff;
  color: white;
}

.save {
  background: #28a745;
  color: white;
}

.cancel {
  background: #dc3545;
  color: white;
}
</style>
