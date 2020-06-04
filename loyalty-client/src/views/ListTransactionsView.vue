<template>
  <v-container fluid class="container-account">
    <v-row>
      <changeLang />
      <Navbar />
    </v-row>
    <v-row justify="center" align="center">
      <v-col xs="12" md="7">
        <ConsultListTransactions />
      </v-col>
    </v-row>
    <v-row>
      <Footer />
    </v-row>
  </v-container>
</template>

<script>
import Footer from '../components/Footer'
import ConsultListTransactions from '../components/Points/ConsultListTransactions'
import Navbar from '../components/Navbar'
import changeLang from '../components/changeLang'

export default {
  name: 'ListTransactionsView',
  data: () => ({
    idiomas: [
      { title: 'Spanish', sh: 'es' },
      { title: 'English', sh: 'en' }
    ]
  }),
  components: {
    Footer,
    ConsultListTransactions,
    Navbar,
    changeLang
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
