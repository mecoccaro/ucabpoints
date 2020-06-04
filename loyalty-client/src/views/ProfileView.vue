<template>
  <v-container fluid class="container-points">
    <v-row>
      <Navbar />
    </v-row>
    <v-row justify="center" align="center">
      <v-col xs="12" md="12">
        <Profile />
      </v-col>
    </v-row>
    <v-row>
      <Footer />
    </v-row>
  </v-container>
</template>
<script>
import Footer from '../components/Footer.vue'
import Profile from '../components/Profile.vue'
import Navbar from '../components/Navbar.vue'


export default {
  name: 'ProfileView',
  components: {
    Footer,
    Profile,
    Navbar
  }
}
</script>
