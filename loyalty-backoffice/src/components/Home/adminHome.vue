<template>
  <v-container justify="center" align="center" >
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-img
          src="../../assets/Isotipo @4x.png"
          class="admin-logo-image"
          max-width="300"
          max-height="300"
        />
        <v-img src="../../assets/Logotipo @4x.png" max-width="300" max-height="300" class="adminLogo"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'adminHome',
  data: () => ({})
}
</script>

<style lang="scss">
@import './src/styles/adminMain.scss';
</style>
