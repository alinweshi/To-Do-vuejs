<template>
  <header class="my-nav">
    <!-- Logo Section -->
    <div class="logo">
      <img src="@/assets/todo-logo.png" alt="App Logo" class="logo-img" />
    </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        v-model="search"
        type="text"
        placeholder="Search ..."
        class="form-control"
        aria-label="Search Products"
      />
    </div>

    <!-- Navigation Links -->
    <nav class="links">
      <ul>
        <li v-for="link in filteredRoutes" :key="link.name">
          <router-link :to="getRoute(link)" class="nav-link">{{ link.name }}</router-link>
        </li>
      </ul>
    </nav>

    <!-- User Actions -->
    <div class="user-actions">
      <template v-if="!userStore.isLoggedIn">
        <router-link to="/login" class="btn btn-primary">Log In</router-link>
        <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
      </template>
      <template v-else>
        <div>
          <span class="user-greeting">
            Hi, {{ userStore.user.first_name || 'Guest' }}
            {{ userStore.user.last_name || '' }}
          </span>
          <button class="btn btn-secondary" @click="logout">Log Out</button>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'MyNav',
  data() {
    return {
      search: '',
      myRoutes: [
        { name: 'Tasks', path: '/tasks' },
        { name: 'Trashed Tasks', path: '/tasks-trashed' },
        { name: 'Categories', path: '/categories' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        {
          name: 'Profile',
          path: '/profiles/:userId/:userName',
        },
      ],
    }
  },
  methods: {
    getRoute(link) {
      if (link.path.includes(':userId') && this.userStore.isLoggedIn) {
        const userId = this.userStore.user.id
        // const userName = `${this.userStore.user.first_name}_${this.userStore.user.last_name}`
        // const query = `?age=${link.query.age}&grade=${link.query.grade}`
        return `/profiles/${userId}`
      }
      return link.path
    },
    logout() {
      this.userStore.logOut()
      this.$router.replace('/login')
    },
  },
  computed: {
    userStore() {
      return useUserStore()
    },

    filteredRoutes() {
      return this.myRoutes.filter((route) => route.name !== 'Profile' || this.userStore.isLoggedIn)
    },
  },

  mounted() {
    this.userStore.fetchUser()
  },
}
</script>

<style scoped>
:root {
  --primary-color: #0a3d85;
  --secondary-color: #e9da0e;
  --hover-color: #4caf50;
  --danger-color: #f44336;
  --badge-bg-color: #f44336;
  --text-light: white;
}

.my-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #ebe4e4;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
}

.logo-img {
  width: 60px;
  height: 60px;
}

.search-bar .form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.links ul {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.cart-link {
  position: relative;
  display: inline-block;
}
.cart-link span {
  font-size: 14px;
  font-weight: bold;
}

.nav-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: gray;
  color: var(--text-light);
}

.cart-icon {
  font-size: 24px;
  color: var(--danger-color);
}

.cart-badge {
  background-color: var(--badge-bg-color);
  color: var(--text-light);
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;
}
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #f44336;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;
  min-width: 18px;
  text-align: center;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--secondary-color);
}

.btn-primary:hover {
  background-color: var(--hover-color);
}

.btn-secondary {
  background-color: var(--danger-color);
}

.btn-secondary:hover {
  background-color: #eadbdb;
}

.user-greeting {
  font-size: 14px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .my-nav {
    display: flex;
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Center the items horizontally */
    justify-content: center; /* Center the items vertically if necessary */
    gap: 15px;
    width: 100%; /* Ensure the navbar takes full width */
  }

  .links ul {
    display: flex;
    flex-direction: column; /* Stack navbar items vertically */
    align-items: center; /* Center navbar items horizontally */
    justify-content: center;
    justify-items: center;

    gap: 10px;
    padding: 0;
    margin: 0;
  }

  .search-bar {
    width: 90%; /* Adjust the width of the search bar */
    margin: 0 auto; /* Center the search bar horizontally */
    text-align: center; /* Center the content inside the search bar */
    margin-left: 0;
  }

  .search-bar input {
    width: 100%; /* Make the input fill the width of the search bar */
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 20px; /* Optional: for rounded corners */
  }

  /* Adjust the search bar icon or button if needed */
  .search-bar .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .icon-blue {
    color: #0088cc;
  }

  .icon-grey {
    color: grey;
  }

  i {
    width: 100px;
    text-align: center;
    vertical-align: middle;
    position: relative;
  }
}

i {
  width: 50px; /* Adjust icon size to fit better on smaller screens */
  height: 50px;
}
</style>
