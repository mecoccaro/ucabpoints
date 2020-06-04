<template>
  <v-container fluid class="container-account-verify">
    <v-row>
      <Navbar />
    </v-row>
    <v-row justify="center" align="center" class="content-account-verify">
      <v-col xs="12" md="5">
        <VerifyAccount />
      </v-col>
    </v-row>
    <v-row>
      <Footer />
    </v-row>
  </v-container>
</template>

<script>
import VerifyAccount from '../components/Account/VerifyAccount'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default {
  name: 'VerifyAccountView',
  components: {
    VerifyAccount,
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
