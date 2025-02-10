<template>
  <div class="trashed-tasks-page">
    <h1>Trashed Tasks</h1>
    <p v-if="loading" class="loading">Loading trashed tasks...</p>

    <div v-else-if="tasks.length">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Restore</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>
              <button class="btn restore-btn" @click="restoreTask(task.id)">Restore</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>No trashed tasks available.</p>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'TrashedTasksPage',
  data() {
    return {
      tasks: [],
      loading: true,
    }
  },
  async created() {
    await this.fetchTrashedTasks()
  },
  methods: {
    async fetchTrashedTasks() {
      this.loading = true
      try {
        // Adjust the endpoint URL if necessary.
        const response = await api.getTrashedTasks()
        // Assuming the trashed tasks are returned in response.data.data or response.data.
        this.tasks = response.data.data || response.data
      } catch (error) {
        console.error('Error fetching trashed tasks:', error)
      } finally {
        this.loading = false
      }
    },
    async restoreTask(taskId) {
      console.log(api.restoreTask(taskId))

      try {
        const response = await api.restoreTask(taskId)
        this.tasks = response.data.data || response.data
        // Sending a POST request to restore the task.
        // Remove the restored task from the list.
        alert('Task restored successfully!')
      } catch (error) {
        console.error('Error restoring task:', error)
        alert('Failed to restore task.')
      }
    },
  },
}
</script>

<style scoped>
.trashed-tasks-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.loading {
  text-align: center;
  margin: 1rem 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.restore-btn {
  background-color: #28a745;
  color: #fff;
}

.restore-btn:hover {
  background-color: #218838;
}
</style>
