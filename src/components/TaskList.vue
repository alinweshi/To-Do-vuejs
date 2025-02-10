<template>
  <div class="task-list">
    <h1 class="title">Task List</h1>
    <p v-if="loading" class="loading">Loading tasks...</p>
    <div v-else-if="tasks.length" class="task-container">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <div v-if="editingTask !== task.id" class="task-details">
          <h3 class="task-title">{{ task.title }}</h3>
          <h3 class="task-date">{{ task.date }}</h3>
          <p class="task-status" :class="statusClass(task.status)">
            {{ task.status }}
          </p>
        </div>

        <input v-else v-model="task.title" class="edit-input" @keyup.enter="updateTask(task)" />

        <div class="task-actions">
          <button class="btn show" @click="getTask(task.id)">👁️ Show</button>

          <button v-if="editingTask !== task.id" class="btn edit" @click="editTask(task.id)">
            ✏️ Edit
          </button>
          <button v-else class="btn save" @click="updateTask(task)">✅ Save</button>
          <button class="btn delete" @click="deleteTask(task.id)">🗑️ Delete</button>
        </div>
      </div>
    </div>

    <p v-else-if="tasks.length === 0" class="no-tasks">No tasks available.</p>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      tasks: [],
      editingTask: null,
      loading: true, // Add a loading state
    }
  },
  async created() {
    await this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await api.getTasks()
        this.tasks = response.data
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false // Update loading state
      }
    },
    async getTask(taskId) {
      try {
        const response = await api.getTask(taskId)
        console.log('Task details:', response.data)
        this.$router.replace(`/tasks/${taskId}`)
      } catch (error) {
        console.error('Error fetching task:', error)
      }
    },
    editTask(taskId) {
      this.editingTask = taskId
    },
    async updateTask(task) {
      try {
        await api.updateTask(task.id, { title: task.title })
        this.editingTask = null
      } catch (error) {
        console.error('Error updating task:', error)
      }
    },
    async deleteTask(taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await api.deleteTask(taskId)
          this.tasks = this.tasks.filter((task) => task.id !== taskId)
        } catch (error) {
          console.error('Error deleting task:', error)
        }
      }
    },
    statusClass(status) {
      return status === 'pending' ? 'pending' : 'completed'
    },
  },
}
</script>

<style scoped>
/* General Styling */
.task-list {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Title */
.title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

/* Task Container */
.task-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Task Cards */
.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.task-card:hover {
  transform: scale(1.02);
}

.task-details {
  flex-grow: 1;
}

/* Task Title */
.task-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Task Status */
.task-status {
  font-size: 14px;
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

/* Buttons */
.task-actions {
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

/* Edit Button */
.edit {
  background: #007bff;
  color: white;
}
.show {
  background: #ffc107;
  color: white;
}

/* Save Button */
.save {
  background: #28a745;
  color: white;
}

/* Delete Button */
.delete {
  background: #dc3545;
  color: white;
}

/* Edit Input */
.edit-input {
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* No Tasks */
.no-tasks {
  text-align: center;
  font-size: 18px;
  color: #777;
}
</style>
