<template>
  <div class="contact">
    <div class="contact-container">
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" type="text" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" rows="5" v-model="form.message" required></textarea>
        </div>
        <button type="submit" class="btn submit">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
    submitForm() {
      // For demonstration, we log the form data.
      console.log('Form submitted:', this.form)
      // In a real application, you would send the form data to your backend here.
      alert('Thank you for contacting us!')
      // Reset the form fields.
      this.form.name = ''
      this.form.email = ''
      this.form.message = ''
    },
  },
}
</script>

<style scoped>
.contact {
  padding: 20px;
}

.contact-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn.submit {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.btn.submit:hover {
  background: #0056b3;
}

/* On larger screens, center the contact page vertically */
@media (min-width: 1024px) {
  .contact {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
