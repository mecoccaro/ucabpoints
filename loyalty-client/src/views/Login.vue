<template>
  <v-container fluid class="container-login">
    <v-row justify="space-between" align="center" class="content-login">
      <v-col xs="12" md="7">
        <LoginLogo />
      </v-col>
      <v-col xs="12" md="5" class="register-form">
        <change-lang align="right" class="localiza" />
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm/LoginForm'
import LoginLogo from '../components/LoginLogo/LoginLogo'
import changeLang from "../components/changeLang";

export default {
  name: 'Login',
  components: {
    LoginLogo,
    LoginForm,
    changeLang
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
