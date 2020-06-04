<template>
  <v-col cols="12" class="account-content">
    <v-row>
      <v-col cols="12">
        <header justify="center" align="center" class="title">
          {{ $t('Register Account') }}
        </header>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" class="account-input">
                <v-text-field
                  outlined
                  name="AccountNumber"
                  v-model="accountNumber"
                  v-mask="['############']"
                  type="text"
                  :rules="[rules.required]"
                >
                  <template v-slot:label>{{ $t('Account Number') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="account-input">
                <v-text-field
                  outlined
                  name="RoutingNumber"
                  v-model="routingNumber"
                  v-mask="['#########']"
                  type="text"
                  :rules="[rules.required]"
                >
                  <template v-slot:label>{{ $t('Routing Number') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <header>{{ $t('Account Type') }}</header>
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="type">
                  <v-radio key="type-indiv" value="individual"
                    ><template v-slot:label>{{
                      $t('Individual')
                    }}</template></v-radio
                  >
                  <v-radio key="type-comp" label="Company" value="company"
                    ><template v-slot:label>{{
                      $t('Company')
                    }}</template></v-radio
                  >
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="space-between" align="center">
      <v-col cols="5">
        <v-btn large block class="base-button" dark @click="submit">{{
          $t('RegisterButton')
        }}</v-btn>
      </v-col>
      <v-col cols="5">
        <v-btn large block color="grey darken-2" dark @click="cancel">{{
          $t('CancelButton')
        }}</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">{{ dialogTittle }}</v-card-title>
        <v-card-text>{{ dialogMessage }}</v-card-text>
        <v-card-actions justify="space-around">
          <v-btn color="green darken-1" text @click="verify">{{
            $t('Verify')
          }}</v-btn>
          <v-btn color="green darken-1" text @click="cont">{{
            $t('Not Now')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ errorDialogTittle }}</v-card-title>
        <v-card-text>{{ errorDialogMessage }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mask } from 'vue-the-mask'
import { APICaller } from '../../services/index'

export default {
  name: 'RegisterAccount',
  props: {},
  directives: { mask },
  data: () => ({
    valid: true,
    accountNumber: '',
    routingNumber: '',
    type: 'individual',

    accountPrimary: 'T',
    user: {},
    statusId: 0,
    statusTransactionId: 0,
    person: {},

    accountId: 0,
    accountStripeId: '',
    amounts: {},

    dialogTittle: '',
    dialogMessage: '',
    dialog: false,

    errorDialogTittle: '',
    errorDialogMessage: '',
    errorDialog: false,

    rules: {
      required: (value) => !!value || 'Required'
    }
  }),

  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getPrimaryAccount()
    this.getRandomAmounts()
    this.getStatus()
    this.getStatusTransaction()
    this.getPerson()
  },

  methods: {
    validate() {
      this.valid = this.$refs.form.validate()
    },
    cancel() {
      this.$router.go(-1)
    },
    verify() {
      this.$router.push(
        `/verify-account/${this.accountId}/${this.accountStripeId}`
      )
    },
    cont() {
      this.$router.push('/home')
    },

    getStatus() {
      const action = {
        type: 'GET_STATUS',
        payload: {
          status: {
            name: 'NEW',
            type: 'ACCOUNT'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.statusId = response.id
        } else {
          if (error.message === 'Network Error') {
            this.errorTittle = 'Network Error'
            this.errorMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getStatusTransaction() {
      const action = {
        type: 'GET_STATUS',
        payload: {
          status: {
            name: 'SUCCEEDED',
            type: 'TRANSACTION'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.statusTransactionId = response.id
        } else {
          if (error.message === 'Network Error') {
            this.errorTittle = 'Network Error'
            this.errorMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getPrimaryAccount() {
      const action = {
        type: 'GET_PRIMARY_ACCOUNT',
        payload: {
          user: {
            id: this.user.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          !response ? (this.accountPrimary = 'T') : (this.accountPrimary = 'F')
        } else {
          if (error.message === 'Network Error') {
            this.errorDialogTittle = 'Network Error'
            this.errorDialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.errorDialog = true
          }
        }
      })
    },

    getRandomAmounts() {
      const action = {
        type: 'GET_RANDOM_AMOUNTS',
        payload: {}
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.amounts = response
        } else {
          if (error.message === 'Network Error') {
            this.errorDialogTittle = 'Network Error'
            this.errorDialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.errorDialog = true
          }
        }
      })
    },

    getPerson() {
      const action = {
        type: 'GET_PERSON',
        payload: {
          user: {
            id: this.user.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.person = response
        } else {
          if (error.message === 'Network Error') {
            this.errorTittle = 'Network Error'
            this.errorMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    createVerifyTransactions() {
      const action = {
        type: 'CREATE_VERIFY_TRANSACTION',
        payload: {
          transaction: {
            accountId: this.accountId,
            type: 'VERIFY_ACCOUNT',
            points: null,
            status: this.statusTransactionId,
            dateCreation: new Date(),
            lastDateUpdate: new Date(),
            dateApprove: new Date()
          },
          amounts: {
            amount1: this.amounts.amount1 / 100,
            observation1: 'amount1',
            amount2: this.amounts.amount2 / 100,
            observation2: 'amount2'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.$Progress.finish()
          this.dialogTittle = 'Account created'
          this.dialogMessage = 'The account created correctly, please verify.'
          this.dialog = true
          //this.$router.push('/home')
        } else {
          this.$Progress.fail()
          if (error.message === 'Network Error') {
            this.errorDialogTittle = 'Network Error'
            this.errorDialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.errorDialog = true
          } else if (error.message === 'Request failed with status code 401') {
            this.errorDialogTittle = 'Validation Error'
            this.errorDialogMessage =
              'The data entered is not correct, try again.'
            this.errorDialog = true
          }
        }
      })
    },

    insertStatusAccount() {
      const action = {
        type: 'INSERT_STATUS_ACCOUNT',
        payload: {
          status: {
            status: this.statusId,
            account: this.accountId
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.createVerifyTransactions()
        } else {
          this.$Progress.fail()
          if (error.message === 'Network Error') {
            this.errorDialogTittle = 'Network Error'
            this.errorDialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.errorDialog = true
          }
        }
      })
    },

    registerAccount(validRoutingNumber) {
      this.validate()

      if (this.valid && validRoutingNumber) {
        this.$Progress.start()

        const action = {
          type: 'REGISTER_ACCOUNT',
          payload: {
            account: {
              accountNumber: this.accountNumber,
              routingNumber: this.routingNumber,
              type: this.type,
              accountPrimary: this.accountPrimary,
              user: this.user.user.id,
              userName: this.person.firstName + ' ' + this.person.firstLastname,
              customerStripe: this.user.user.customerStripe,
              accountStripe: this.user.user.accountStripe
            }
          }
        }

        APICaller(action, (response, error) => {
          if (!error) {
            this.accountId = response.id
            this.accountStripeId = response.customerSourceStripe
            this.insertStatusAccount()
          } else {
            this.$Progress.fail()
            if (error.message === 'Network Error') {
              this.errorDialogTittle = 'Network Error'
              this.errorDialogMessage =
                'At this time it is not possible to establish a connection, please try later.'
              this.errorDialog = true
            } else if (
              error.message === 'Request failed with status code 401'
            ) {
              this.errorDialogTittle = 'Validation Error'
              this.errorDialogMessage =
                'The data entered is not correct, try again.'
              this.errorDialog = true
            } else if (
              error.message === 'Request failed with status code 500'
            ) {
              this.errorDialogTittle = 'Invalid Data/Internal Error'
              this.errorDialogMessage =
                'The data entered is not correct (Maybe the account number and routing number already exist) or there are problems with the connection, try again.'
              this.errorDialog = true
            }
          }
        })
      }
    },

    submit() {
      const action = {
        type: 'VALIDATE_ROUTING_NUMBER',
        payload: {
          routingNumber: this.routingNumber
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          if (response) {
            this.registerAccount(response)
          } else {
            this.errorDialogTittle = 'Invalid Routing Number'
            this.errorDialogMessage =
              'The routing number is invalid, please try again.'
            this.errorDialog = true
          }
        } else {
          if (error.message === 'Network Error') {
            this.errorDialogTittle = 'Network Error'
            this.errorDialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.errorDialog = true
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
</style>
