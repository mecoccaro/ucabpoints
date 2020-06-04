<template>
  <v-container fluid class="container-login">
    <v-row justify="space-between" align="center" class="content-login">
      <v-col xs="12" md="7">
        <LoginLogo />
      </v-col>
      <v-col xs="12" md="5" class="register-form">
        <changeLang align="right" class="localiza" />
        <ChangePasswordForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChangePasswordForm from '../components/RecoveryPasswordForm/ChangePasswordForm'
import LoginLogo from '../components/LoginLogo/LoginLogo'
import changeLang from "../components/changeLang";

export default {
  name: 'ChangePasswordView',
  components: {
    LoginLogo,
    ChangePasswordForm,
    changeLang
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
