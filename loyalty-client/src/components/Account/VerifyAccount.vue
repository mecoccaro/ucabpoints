<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
        <header justify="center" align="center" class="title">
         {{$t('Verify Account')}}
        </header>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row justify="space-between" align="center">
              <v-col xs="12" md="5" class="account-input">
                <v-text-field
                  outlined

                  name="Amount1"
                  v-model="amount1"
                  v-mask="['#.##']"
                  type="text"
                  :rules="[rules.required]"
                >
                  <template v-slot:label>{{ $t('Amount') }} 1</template>
                </v-text-field>
              </v-col>
              <v-col xs="12" md="5" class="account-input">
                <v-text-field
                  outlined
                  name="Amount2"
                  v-model="amount2"
                  v-mask="['#.##']"
                  type="text"
                  :rules="[rules.required]"
                >
                  <template v-slot:label>{{ $t('Amount') }} 2</template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="space-between" align="center">
      <v-col cols="5">
        <v-btn large block class="base-button" dark @click="submit"
          >{{$t('Verify')}}</v-btn
        >
      </v-col>
      <v-col cols="5">
        <v-btn large block color="grey darken-2" dark @click="cancel"
          >{{$t('CancelButton')}}</v-btn
        >
      </v-col>
    </v-row>

    <v-dialog v-model="continueDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">{{ continueDialogTittle }}</v-card-title>
        <v-card-text>{{ continueDialogMessage }}</v-card-text>
        <v-card-actions justify="space-around">
          <v-btn color="green darken-1" text @click="cont">{{$t('Continue')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ dialogTittle }}</v-card-title>
        <v-card-text>{{ dialogMessage }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mask } from 'vue-the-mask'
import { APICaller } from '../../services/index'

export default {
  name: 'VerifyAccount',
  props: {},
  directives: { mask },
  data: () => ({
    valid: true,
    amount1: '',
    amount2: '',

    realAmmount1: 0,
    realAmmount2: 0,

    accountId: 0,
    accountStripe: '',

    user: {},
    statusId: 0,

    dialogTittle: '',
    dialogMessage: '',
    dialog: false,

    continueDialogTittle: '',
    continueDialogMessage: '',
    continueDialog: false,

    rules: {
      required: (value) => !!value || 'Required'
    }
  }),

  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.accountId = this.$route.params.accountId
    this.accountStripe = this.$route.params.accountStripe
    this.getStatus()
    this.getRealAmounts()
  },

  methods: {
    validate() {
      this.valid = this.$refs.form.validate()
    },
    cancel() {
      this.$router.go(-1)
    },
    cont() {
      this.$router.push('/home')
    },

    getStatus() {
      const action = {
        type: 'GET_STATUS',
        payload: {
          status: {
            name: 'VERIFIED',
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

    saveRealAmounts(transactions) {
      let transaction
      for (let i = 0; i < transactions.length; i++) {
        transaction = transactions[i]
        transaction.observation === 'amount1'
          ? (this.realAmmount1 = transaction.totalAmount)
          : (this.realAmmount2 = transaction.totalAmount)
      }
    },

    getRealAmounts() {
      const action = {
        type: 'GET_TRANSACTIONS_TYPE_ACCOUNT',
        payload: {
          account: {
            accountId: this.accountId,
            type: 'VERIFY_ACCOUNT'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.saveRealAmounts(response)
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          } else if (error.message === 'Request failed with status code 401') {
            this.dialogTittle = 'Validation Error'
            this.dialogMessage = 'The data entered is not correct, try again.'
            this.dialog = true
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
          this.continueDialogTittle = 'Account verified.'
          this.continueDialogMessage = 'The account verified correctly.'
          this.continueDialog = true
          //this.$router.push('/home')
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

    submit() {
      this.validate()
      let correct = false

      if (
        Number(this.realAmmount1) == Number(this.amount1) &&
        Number(this.realAmmount2) == Number(this.amount2)
      ) {
        correct = true
      } else {
        this.dialogTittle = 'Incorrect Amounts.'
        this.dialogMessage = 'Try again.'
        this.dialog = true
      }

      if (this.valid && correct) {
        const action = {
          type: 'VERIFY_ACCOUNT',
          payload: {
            account: {
              bankAccount: this.accountStripe,
              customer: this.user.user.customerStripe
            }
          }
        }

        APICaller(action, (response, error) => {
          if (!error) {
            this.insertStatusAccount()
          } else {
            if (error.message === 'Network Error') {
              this.dialogTittle = 'Network Error'
              this.dialogMessage =
                'At this time it is not possible to establish a connection, please try later.'
              this.dialog = true
            } else if (
              error.message === 'Request failed with status code 401'
            ) {
              this.dialogTittle = 'Validation Error'
              this.dialogMessage = 'The data entered is not correct, try again.'
              this.dialog = true
            } else if (
              error.message === 'Request failed with status code 500'
            ) {
              this.dialogTittle = 'Error'
              this.dialogMessage = 'The account is already been verified'
              this.dialog = true
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
</style>
