<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
        <header justify="center" align="center" class="title">
          {{$t('Points')}}
        </header>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row justify="space-between" align="center">
              <v-col xs="12" md="12" class="account-input">
                <v-text-field
                  outlined
                  label="Total Points"
                  name="TotalPoints"
                  v-model="totalPointsRest"
                  v-mask="['##########']"
                  type="text"
                  readonly
                >
                  <template v-slot:label>{{ $t('Total Points') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-between" align="center">
              <v-col xs="12" md="5" class="account-input">
                <v-text-field
                  outlined
                  name="Points"
                  v-model="points"
                  v-mask="['##########']"
                  type="text"
                  :rules="[rules.required, pointsRule]"
                  @change="getDollars()"
                >
                  <template v-slot:label>{{ $t('OnePoint') }}</template>
                </v-text-field>
              </v-col>
              <v-col xs="12" md="5" class="account-input">
                <v-text-field
                  outlined
                  name="Dollars"
                  v-model="dollars"
                  type="number"
                  prepend-inner-icon="fa-dollar-sign"
                  :rules="[rules.required]"
                  readonly
                >
                  <template v-slot:label>{{ $t('Dollars') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  outlined
                  name="BankAccount"
                  item-value="id"
                  v-model="account"
                  :items="accounts"
                  :rules="[rules.required]"
                  readonly
                ><template v-slot:label>{{ $t('Bank Account') }}</template>
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->
                    {{ data.item.accountNumber }} -
                    {{ data.item.routingNumber }}
                  </template>
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    {{ data.item.accountNumber }} -
                    {{ data.item.routingNumber }}
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="space-between" align="center">
      <v-col cols="5">
        <v-btn large block class="base-button" dark @click="submit"
          >{{$t('Change')}}</v-btn
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
  name: 'ChangePoints',
  props: {},
  directives: { mask },
  data: () => ({
    valid: true,
    totalPoints: 0,
    totalPointsRest: 0,
    points: '',
    dollars: 0,

    account: '',
    accounts: [],

    dollarPoints: 0,
    commission: {},

    user: '',
    statusId: 0,
    transactionId: 0,

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
    this.getAccounts()
    this.getPrimaryAccount()
    this.getDollarPoints()
    this.getTotalPoints()
    this.getStatus()
    this.getLastCommission()
  },

  methods: {
    pointsRule() {
      return this.points <= this.totalPoints || 'You are passed the point limit'
    },

    getStatus() {
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
          this.statusId = response.id
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getDollars() {
      this.dollars = Number(
        (this.points / Number(this.dollarPoints)).toFixed(2)
      )
      this.totalPointsRest = this.totalPoints - this.points
    },

    getAccounts() {
      const action = {
        type: 'GET_ACCOUNTS',
        payload: {
          user: {
            id: this.user.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.accounts = response
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
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
          this.account = response
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getDollarPoints() {
      const action = {
        type: 'GET_DOLLAR_POINTS',
        payload: {}
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.dollarPoints = response.anAIsSoManyB
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getTotalPoints() {
      const action = {
        type: 'GET_TOTAL_POINTS',
        payload: {
          user: {
            id: this.user.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.totalPoints = response
          this.totalPointsRest = response
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    getLastCommission() {
      const action = {
        type: 'GET_LAST_COMMISSION',
        payload: {}
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.commission = response
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    cont() {
      this.$router.push('/home')
    },

    validate() {
      this.valid = this.$refs.form.validate()
    },
    cancel() {
      this.$router.go(-1)
    },

    insertStatusTransaction() {
      const action = {
        type: 'INSERT_STATUS_TRANSACTION',
        payload: {
          status: {
            status: this.statusId,
            transaction: this.transactionId
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.continueDialogTittle = 'Changed points.'
          this.continueDialogMessage = 'The points where changed correctly.'
          this.continueDialog = true
          //this.$router.push('/home')
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    insertAmount() {
      const action = {
        type: 'INSERT_AMOUNT',
        payload: {
          amount: {
            points: this.points,
            addedAmount: this.dollars,
            serviceCommission:
              this.dollars * (Number(this.commission.serviceTransfer) / 100),
            processCommission: Number(this.commission.processor),
            transaction: this.transactionId
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.insertStatusTransaction()
        } else {
          if (error.message === 'Network Error') {
            this.dialogTittle = 'Network Error'
            this.dialogMessage =
              'At this time it is not possible to establish a connection, please try later.'
            this.dialog = true
          }
        }
      })
    },

    submit() {
      this.validate()

      if (this.valid) {
        const action = {
          type: 'CHANGE_POINTS',
          payload: {
            transaction: {
              accountId: this.account.id,
              type: 'CHANGE_POINTS',
              points: this.points,
              dateCreation: new Date(),
              lastDateUpdate: new Date(),
              dateApprove: new Date()
            },
            amount: this.dollars,
            amountTotal:
              this.dollars -
              (this.dollars * (Number(this.commission.serviceTransfer) / 100) +
                Number(this.commission.processor)),
            accountStripe: this.user.user.accountStripe
          }
        }

        APICaller(action, (response, error) => {
          if (!error) {
            this.transactionId = response.id
            this.insertAmount()
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
              this.dialogTittle = 'Invalid Data/Internal Error'
              this.dialogMessage =
                'The data entered is not correct (Maybe the amount is very big) or there are problems with the connection, try again.'
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
