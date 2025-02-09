<template>
  <div>
    <h1>Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
    </ul>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      categories: [],
    }
  },
  async created() {
    this.categories = (await api.getCategories()).data
  },
}
</script>
