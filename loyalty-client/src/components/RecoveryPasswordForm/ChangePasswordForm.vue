<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  id="Password"
                  name="Password"
                  v-model="password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'fa-eye' : 'fa-eye-slash'"
                  @click:append="show1 = !show1"
                  :rules="[rules.required]"
                >
                  <template v-slot:label>{{ $t('Pass') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  id="RepeatPassword"
                  name="RepeatPassword"
                  v-model="repeatPassword"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'fa-eye' : 'fa-eye-slash'"
                  @click:append="show2 = !show2"
                  :rules="[rules.required, passwordConfirmationRule]"
                >
                  <template v-slot:label>{{ $t('RPass') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn large block class="base-button" dark @click="submit">{{
          $t('Submit')
        }}</v-btn>
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

export default {
  name: 'ChangePasswordForm',
  props: {},
  data: () => ({
    valid: true,
    userId: 0,
    password: '',
    show1: false,
    repeatPassword: '',
    show2: false,

    errorTittle: '',
    errorMessage: '',
    dialog: false,

    rules: {
      required: (value) => !!value || 'Required'
    }
  }),

  methods: {
    passwordConfirmationRule() {
      return this.password === this.repeatPassword || 'Password must match'
    },

    validate() {
      this.valid = this.$refs.form.validate()
    },

    submit() {
      this.validate()

      if (this.valid) {
        const action = {
          type: 'CHANGE_PASSWORD',
          payload: {
            user: { id: this.$route.params.userId, password: this.password }
          }
        }

        APICaller(action, (response, error) => {
          if (!error) {
            this.$router.push('/')
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
    }
  }
}
</script>
