<template>
  <v-container fluid class="container-points">
    <v-row>
      <Navbar />
    </v-row>
    <v-row justify="center" align="center" class="content-points">
      <v-col xs="12" md="7">
        <BuyPoints />
      </v-col>
    </v-row>
    <v-row>
      <Footer />
    </v-row>
  </v-container>
</template>

<script>
import Footer from '../components/Footer'
import BuyPoints from '../components/Points/BuyPoints'
import Navbar from '../components/Navbar'

export default {
  name: 'BuyPointsView',
  components: {
    Footer,
    Navbar,
    BuyPoints
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
