<template>
  <div class="task-details-page">
    <!-- {{ task }} -->
    <h1 class="title">Task Details</h1>

    <p v-if="loading" class="loading">Loading task...</p>

    <div v-else-if="task" class="task-card">
      <h2 class="task-title">{{ task.title }}</h2>
      <h2 class="task-date">{{ task.date }}</h2>
      <p class="task-status" :class="statusClass(task.status)">
        {{ task.status }}
      </p>
      <p class="task-desc">{{ task.description || 'No description available.' }}</p>

      <div class="actions">
        <router-link to="/tasks" class="btn back">⬅️ Back to Tasks</router-link>
      </div>
    </div>

    <p v-else class="error">Task not found.</p>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      task: null,
      loading: true,
    }
  },
  async created() {
    const taskId = this.$route.params.taskId
    console.log(taskId)
    await this.fetchTask(taskId)
  },
  methods: {
    async fetchTask(taskId) {
      this.loading = true
      try {
        const response = await api.getTask(taskId)
        this.task = response.data.data
        console.log(this.task)
      } catch (error) {
        console.error('Error fetching task:', error)
      } finally {
        this.loading = false
      }
    },
    statusClass(status) {
      return status === 'pending' ? 'pending' : 'completed'
    },
  },
}
</script>

<style scoped>
.task-details-page {
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

.task-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.task-title {
  font-size: 22px;
  font-weight: bold;
}

.task-status {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  text-transform: capitalize;
}

.pending {
  background-color: #ffcc00;
  color: #6b5300;
}

.completed {
  background-color: #28a745;
  color: white;
}

.task-desc {
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
