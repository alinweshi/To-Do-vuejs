import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export default {
  // Tasks
  getTasks() {
    return apiClient.get('/tasks')
  },
  getTask(id) {
    return apiClient.get(`/tasks/${id}`)
  },
  createTask(task) {
    return apiClient.post('/tasks', task)
  },
  updateTask(id, task) {
    return apiClient.put('/tasks/' + id, task)
  },
  deleteTask(id) {
    return apiClient.delete('/tasks/' + id)
  },

  // Categories
  getCategories() {
    return apiClient.get('/categories')
  },
  getCategory(id) {
    return apiClient.get('/categories/' + id)
  },
  createCategory(category) {
    return apiClient.post('/categories', category)
  },
  updateCategory(id, category) {
    return apiClient.put('/categories/' + id, category)
  },
  deleteCategory(id) {
    return apiClient.delete('/categories/' + id)
  },

  // Authentication
  login(credentials) {
    return apiClient.post('/login', credentials)
  },
  logout() {
    return apiClient.post('/logout')
  },
  register(userInfo) {
    return apiClient.post('/register', userInfo)
  },
}
