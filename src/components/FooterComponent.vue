<template>
  <div>
    <ul>
      <!-- <li v-for="link in FooterRoutes" :key="link.name">
        <RouterLink :to="{ name: link.name }">{{ link.meta.title }}</RouterLink>
      </li> -->
    </ul>
  </div>
  <GoToComponent />
</template>

<script>
import GoToComponent from "@/components/GoToComponent.vue";
export default {
  name: "footer-page",
  components: {
    GoToComponent,
  },
  data() {
    return {
      // FooterRoutes: [],
    };
  },
  mounted() {
    // Filter routes to only include those that have a meta.title
    this.FooterRoutes = this.$router.options.routes.filter(
      (route) => route.meta && route.meta.title
    );
    console.log(this.FooterRoutes); // Log to check the filtered routes
  },
};
</script>
