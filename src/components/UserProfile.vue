<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-image">
        <!-- <img :src="user.image" alt="Profile Picture" /> -->
        <img src="@/assets/unnamed.jpg" alt="Profile Picture" />
      </div>
      <div class="profile-info">
        <span class="badge">Pro</span>
        <h2 class="profile-name">{{ fullName }}</h2>
        <p class="profile-title">FullStack developer</p>
        <p class="profile-bio">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>
        <ul class="social-list">
          <li><i class="fa fa-facebook"></i></li>
          <li><i class="fa fa-dribbble"></i></li>
          <li><i class="fa fa-instagram"></i></li>
          <li><i class="fa fa-linkedin"></i></li>
          <li><i class="fa fa-google"></i></li>
        </ul>
        <div class="profile-buttons">
          <button class="btn message-btn">Message</button>
          <button class="btn contact-btn">Contact</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'
export default {
  data() {
    return {}
  },
  computed: {
    user() {
      return useUserStore().user
    },
    fullName() {
      return this.user ? `${this.user.first_name} ${this.user.last_name}` : ''
    },
  },
}
</script>

<style scoped>
/* Define CSS variables for consistency */
:root {
  --primary-color: #8e24aa;
  --primary-hover: #7b1fa2;
  --secondary-color: #e1bee7;
  --text-color: #333;
  --bg-color: #fff;
  --transition-duration: 0.3s;
  --font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

body {
  background: #f0f2f5;
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.profile-card {
  background-color: var(--bg-color);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 400px;
  width: 100%;
  position: relative;
  transition: transform var(--transition-duration);
}

.profile-card:hover {
  transform: translateY(-5px);
}

/* Animated left border */
.profile-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--secondary-color);
  transition: background var(--transition-duration);
}

.profile-card:hover::before {
  background: var(--primary-color);
}

.profile-image {
  text-align: center;
  padding: 1.5rem;
}

.profile-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--secondary-color);
}

.profile-info {
  padding: 1.5rem;
  text-align: center;
}

.badge {
  display: inline-block;
  background-color: var(--secondary-color);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-color);
}

.profile-title {
  font-size: 1rem;
  color: #777;
  margin: 0.5rem 0 1rem;
}

.profile-bio {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.social-list {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 1rem 0;
}

.social-list li {
  margin: 0 0.5rem;
  font-size: 1.2rem;
  color: var(--primary-color);
  transition: color var(--transition-duration);
  cursor: pointer;
}

.social-list li:hover {
  color: var(--primary-hover);
}

.profile-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  background: transparent;
  color: var(--primary-color);
  cursor: pointer;
  transition:
    background var(--transition-duration),
    color var(--transition-duration);
}

.btn:hover {
  background: var(--primary-color);
  color: #fff;
}

.contact-btn {
  background: blue;
  color: #fff;
}
.message-btn {
  background: red;
  color: #fff;
}

.contact-btn:hover {
  background: rgb(161, 161, 238);
}
.message-btn:hover {
  background: rgb(217, 102, 102);
}
</style>

<style scoped>
/* Define CSS variables for consistency */
:root {
  --primary-color: #8e24aa;
  --primary-hover: #7b1fa2;
  --secondary-color: #e1bee7;
  --text-color: #333;
  --bg-color: #fff;
  --transition-duration: 0.3s;
  --font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

body {
  background: #f0f2f5;
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.profile-card {
  background-color: var(--bg-color);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 400px;
  width: 100%;
  position: relative;
  transition: transform var(--transition-duration);
}

.profile-card:hover {
  transform: translateY(-5px);
}

/* Animated left border */
.profile-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--secondary-color);
  transition: background var(--transition-duration);
}

.profile-card:hover::before {
  background: var(--primary-color);
}

.profile-image {
  text-align: center;
  padding: 1.5rem;
}

.profile-image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--secondary-color);
}

.profile-info {
  padding: 1.5rem;
  text-align: center;
}

.badge {
  display: inline-block;
  background-color: var(--secondary-color);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-color);
}

.profile-title {
  font-size: 1rem;
  color: #777;
  margin: 0.5rem 0 1rem;
}

.profile-bio {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.social-list {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 1rem 0;
}

.social-list li {
  margin: 0 0.5rem;
  font-size: 1.2rem;
  color: var(--primary-color);
  transition: color var(--transition-duration);
  cursor: pointer;
}

.social-list li:hover {
  color: var(--primary-hover);
}

.profile-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  background: transparent;
  color: var(--primary-color);
  cursor: pointer;
  transition:
    background var(--transition-duration),
    color var(--transition-duration);
}

.btn:hover {
  background: var(--primary-color);
  color: #fff;
}

.contact-btn {
  background: blue;
  color: #fff;
}
.message-btn {
  background: red;
  color: #fff;
}

.contact-btn:hover {
  background: rgb(161, 161, 238);
}
.message-btn:hover {
  background: rgb(217, 102, 102);
}
</style>
