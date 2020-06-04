<template>
  <v-container justify="center" align="center" class="home-logo locale-changer">
    <v-row justify="center" align="center">
      <v-col cols="12" justify="center" align="center">
        <v-img
          src="../assets/Isotipo.png"
          class="home-logo-image"
          max-width="300"
          max-height="300"
        />
        <v-img src="../assets/Logotipo.png" max-width="300" max-height="300" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  name: 'Home',
  lang: 'en',
  data: () => ({})
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>

