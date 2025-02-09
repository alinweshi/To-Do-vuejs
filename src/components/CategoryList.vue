<template>
  <div class="category-list">
    <h1 class="title">Category List</h1>
    <p v-if="loading" class="loading">Loading categories...</p>
    <div v-else-if="categories.length" class="category-container">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div v-if="editingCategory !== category.id" class="category-details">
          <h3 class="category-title">{{ category.name }}</h3>
        </div>

        <input
          v-else
          v-model="category.name"
          class="edit-input"
          @keyup.enter="updateCategory(category)"
        />

        <div class="category-actions">
          <button class="btn show" @click="getCategory(category.id)">👁️ Show</button>

          <button
            v-if="editingCategory !== category.id"
            class="btn edit"
            @click="editCategory(category.id)"
          >
            ✏️ Edit
          </button>
          <button v-else class="btn save" @click="updateCategory(category)">✅ Save</button>
          <button class="btn delete" @click="deleteCategory(category.id)">🗑️ Delete</button>
        </div>
      </div>
    </div>

    <p v-else class="no-categories">No categories available.</p>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      categories: [],
      editingCategory: null,
      loading: true,
    }
  },
  async created() {
    await this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      this.loading = true
      try {
        const response = await api.getCategories()
        this.categories = response.data.reverse()
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        this.loading = false
      }
    },
    async getCategory(categoryId) {
      try {
        const response = await api.getCategory(categoryId)
        console.log('Category details:', response.data)
        this.$router.replace(`/categories/${categoryId}`)
      } catch (error) {
        console.error('Error fetching category:', error)
      }
    },
    editCategory(categoryId) {
      this.editingCategory = categoryId
    },
    async updateCategory(category) {
      try {
        await api.updateCategory(category.id, { name: category.name })
        this.editingCategory = null
      } catch (error) {
        console.error('Error updating category:', error)
      }
    },
    async deleteCategory(categoryId) {
      if (confirm('Are you sure you want to delete this category?')) {
        try {
          await api.deleteCategory(categoryId)
          this.categories = this.categories.filter((category) => category.id !== categoryId)
        } catch (error) {
          console.error('Error deleting category:', error)
        }
      }
    },
  },
}
</script>

<style scoped>
.category-list {
  max-width: 900px;
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

.category-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.category-card:hover {
  transform: scale(1.02);
}

.category-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.category-actions {
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

.show {
  background: #ffc107;
  color: white;
}

.save {
  background: #28a745;
  color: white;
}

.delete {
  background: #dc3545;
  color: white;
}

.edit-input {
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.no-categories {
  text-align: center;
  font-size: 18px;
  color: #777;
}
</style>
