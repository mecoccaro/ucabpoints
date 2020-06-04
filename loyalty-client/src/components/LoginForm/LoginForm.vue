<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
        <v-btn large block class="google-button" dark @click="googleLogin"
          >Google</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn large block class="facebook-button" dark @click="facebookLogin"
          >Facebook</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  name="Email"
                  v-model="email"
                  type="text"
                  :rules="[rules.required, rules.email]"
                >
                  <template v-slot:label>{{ $t('Email') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  id="Password"
                  name="Password"
                  v-model="password"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                  @click:append="show = !show"
                  :rules="[rules.required]"
                >
                  <template v-slot:label>{{ $t('Pass') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="space-between" align="center">
      <v-col justify="center" align="center">
        <v-btn text block small @click="recoveryPassword">
          {{ $t('Forgot') }}
        </v-btn>
      </v-col>
      <v-col justify="center" align="center">
        <v-btn text block small @click="register">{{ $t('Register') }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn large block class="base-button" dark @click="submit">
          {{ $t('Sign') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ errorTittle }}</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { APICaller } from '../../services/index'
import { googleAuth, facebookAuth } from '../../firebase/firebase.auth.js'

export default {
  name: 'LoginForm',
  props: {},
  data: () => ({
    valid: true,
    email: '',
    password: '',
    show: false,
    forgotPassword: 'Forgot your password?',
    registerForm: 'You have not account? Register',

    errorTittle: '',
    errorMessage: '',
    dialog: false,

    rules: {
      required: (value) => !!value || 'Required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail'
      }
    }
  }),

  methods: {
    validate() {
      this.valid = this.$refs.form.validate()
    },
    register() {
      this.$router.push('/register')
    },
    recoveryPassword() {
      this.$router.push('/recovery')
    },
    submit() {
      this.validate()

      if (this.valid) {
        const action = {
          type: 'LOGIN',
          payload: {
            user: { email: this.email, password: this.password }
          }
        }

        APICaller(action, (response, error) => {
          if (!error) {
            this.$router.push('/home')
          } else {
            if (error.message === 'Network Error') {
              this.errorTittle = 'Network Error'
              this.errorMessage =
                'At this time it is not possible to establish a connection, please try later.'
              this.dialog = true
            } else if (
              error.message === 'Request failed with status code 401'
            ) {
              this.errorTittle = 'Validation Error'
              this.errorMessage = 'The data entered is not correct, try again.'
              this.dialog = true
            }
          }
        })
      }
    },

    googleLogin() {
      googleAuth((user, error) => {
        if (!error) {
          const action = {
            type: 'FIREBASE_LOGIN',
            payload: {
              user: { email: user.email }
            }
          }

          APICaller(action, (response, error) => {
            if (!error) {
              this.$router.push('/home')
            } else {
              if (error.message === 'Network Error') {
                this.errorTittle = 'Network Error'
                this.errorMessage =
                  'At this time it is not possible to establish a connection, please try later.'
                this.dialog = true
              } else if (
                error.message === 'Request failed with status code 401'
              ) {
                this.errorTittle = 'Validation Error'
                this.errorMessage =
                  'The data entered is not correct, try again.'
                this.dialog = true
              }
            }
          })
        } else {
          if (error.code === 'auth/network-request-failed') {
            this.errorTittle = 'Network Error'
            this.errorMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          } else if (error.message === 'Request failed with status code 401') {
            this.errorTittle = 'Validation Error'
            this.errorMessage = 'The data entered is not correct, try again.'
            this.dialog = true
          }
        }
      })
    },

    facebookLogin() {
      facebookAuth((user, error) => {
        if (!error) {
          const action = {
            type: 'FIREBASE_LOGIN',
            payload: {
              user: { email: user.email }
            }
          }

          APICaller(action, (response, error) => {
            if (!error) {
              this.$router.push('/home')
            } else {
              if (error.message === 'Network Error') {
                this.errorTittle = 'Network Error'
                this.errorMessage =
                  'At this time it is not possible to establish a connection, please try later.'
                this.dialog = true
              } else if (
                error.message === 'Request failed with status code 401'
              ) {
                this.errorTittle = 'Validation Error'
                this.errorMessage =
                  'The data entered is not correct, try again.'
                this.dialog = true
              }
            }
          })
        } else {
          if (error.code === 'auth/network-request-failed') {
            this.errorTittle = 'Network Error'
            this.errorMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          } else if (error.message === 'Request failed with status code 401') {
            this.errorTittle = 'Validation Error'
            this.errorMessage = 'The data entered is not correct, try again.'
            this.dialog = true
          }
        }
      })
    }
  }
}
</script>
<i18n>
  {
  "en":{
  "Email": "Email",
  "Pass": "Password",
  "Register": "You doesn't have an account? Register",
  "Forgot":"Forgot your password?",
  "Sign": "Sign In"
  },
  "es":{
  "Email": "Correo",
  "Pass": "Contraseña",
  "Register": "¿Aun no tienes una cuenta? registrate",
  "Forgot":"¿Olvidaste tu contraseña?",
  "Sign": "Entrar"
  }
  }
</i18n>
