<template>
  <v-container fluid class="container-account">
    <v-row>
      <Navbar />
    </v-row>
    <v-row justify="center" align="center">
      <v-col xs="12" md="7">
        <RegisterAccount />
      </v-col>
    </v-row>
    <v-row>
      <Footer />
    </v-row>
  </v-container>
</template>

<script>
import RegisterAccount from '../components/Account/RegisterAccount'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default {
  name: 'RegisterAccountView',
  components: {
    RegisterAccount,
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
