<template>
  <v-container fluid class="admin-container-home">
    <v-row>
      <Navbar />
    </v-row>
    <v-row justify="center">
      <Home />
    </v-row>
    <v-row>
      <Footer />
    </v-row>
  </v-container>
</template>

<script>
import Footer from "../components/Home/adminFooter";
import Home from "../components/Home/adminHome";
import Navbar from "../components/Home/adminNavbar";

export default {
  name: 'adminHomeView',
  components: {
    Footer,
    Home,
    Navbar
  }
}
</script>
