<template>
  <div class="category-details-page">
    <h1 class="title">Category Details</h1>

    <p v-if="loading" class="loading">Loading category...</p>

    <div v-else-if="category" class="category-card">
      <h2 class="category-title">{{ category.name }}</h2>
      <p class="category-desc">
        {{ category.description || 'No description available.' }}
      </p>
      <div class="actions">
        <router-link to="/categories" class="btn back">⬅️ Back to Categories</router-link>
      </div>
    </div>

    <p v-else class="error">Category not found.</p>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      category: null,
      loading: true,
    }
  },
  async created() {
    console.log(this.$route.params)
    const categoryId = this.$route.params.categoryId
    await this.fetchCategory(categoryId)
  },
  methods: {
    async fetchCategory(categoryId) {
      this.loading = true
      try {
        const response = await api.getCategory(categoryId)
        // Assuming the API response has the category data in response.data.data
        this.category = response.data
      } catch (error) {
        console.error('Error fetching category:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.category-details-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.category-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.category-title {
  font-size: 22px;
  font-weight: bold;
}

.category-desc {
  font-size: 16px;
  margin: 15px 0;
  color: #555;
}

.actions {
  margin-top: 20px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background: #007bff;
  color: white;
  text-decoration: none;
  transition: 0.2s;
}

.btn:hover {
  opacity: 0.8;
}

.error {
  color: red;
  font-size: 18px;
}
</style>
