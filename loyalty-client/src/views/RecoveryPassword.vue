<template>
  <v-container fluid class="container-login">
    <v-row justify="space-between" align="center" class="content-login">
      <v-col xs="12" md="7">
        <LoginLogo />
      </v-col>
      <v-col xs="12" md="5" class="register-form">
        <changeLang align="right" class="localiza" />
        <RecoveryPasswordForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginLogo from '../components/LoginLogo/LoginLogo'
import RecoveryPasswordForm from '../components/RecoveryPasswordForm/RecoveryPasswordForm'
import changeLang from "../components/changeLang";

export default {
  name: 'RecoveryPassword',
  components: {
    LoginLogo,
    RecoveryPasswordForm,
    changeLang
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
