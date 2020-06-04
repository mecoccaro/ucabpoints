<template>
  <v-col cols="12">
    <v-card>
      <v-card-title>
        {{ $t('Transactions') }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
        >
          <template v-slot:label>{{ $t('Search') }}</template>
        </v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="transactionsItems"
        :items-per-page="5"
        class="elevation-1 list-table"
      >
        <!--<template v-slot:item.actions="{ item }">
          <v-icon small @click="download(item)">fa-download</v-icon>
        </template>-->
      </v-data-table>
    </v-card>

    <v-dialog v-model="continueDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ continueDialogTittle }}</v-card-title>
        <v-card-text>{{ continueDialogMessage }}</v-card-text>
        <v-card-actions justify="space-around">
          <v-btn color="green darken-1" text>{{ $t('Continue') }}</v-btn>
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
import { APICaller } from '../../services/index'

export default {
  name: 'ConsultListTransactions',
  props: {},
  data: () => ({
    search: '',

    accounts: [],
    transactions: [],
    transactionsItems: [],
    transactionSelected: {},

    statusId: 0,

    headers: [
      {
        text: 'Type',
        align: 'start',
        sortable: false,
        value: 'transactionType'
      },
      {
        text: 'Date Creation',
        sortable: false,
        value: 'dateCreation'
      },
      {
        text: 'Date Approve',
        sortable: false,
        value: 'dateApprove'
      },
      {
        text: 'Total Amount ($)',
        sortable: false,
        value: 'totalAmount'
      },
      {
        text: 'Points',
        sortable: false,
        value: 'points'
      },
      {
        text: 'Status',
        sortable: false,
        value: 'status'
      }
      //{ text: 'Actions', value: 'actions', sortable: false }
    ],

    dialogTittle: '',
    dialogMessage: '',
    dialog: false,

    continueDialogTittle: '',
    continueDialogMessage: '',
    continueDialog: false,

    rules: {}
  }),

  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getAccounts()
  },

  methods: {
    //download(item) {
    //},

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
          this.getStatus()
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
          this.getAccountsTransactions()
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

    async pushTransaction(transaction) {
      let transactionStatus

      const action = {
        type: 'GET_LAST_TRANSACTION_STATUS',
        payload: {
          transaction: {
            id: transaction.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          transactionStatus = {
            ...transaction,
            status:
              response.status.id == this.statusId ? 'SUCCEEDED' : 'PENDING'
          }

          this.transactionsItems.push(transactionStatus)
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

    async getTransactionsStatus() {
      let transaction

      for (let i = 0; i < this.transactions.length; i++) {
        transaction = this.transactions[i]
        await this.pushTransaction(transaction)
      }
    },

    getTransactions(account, final) {
      const action = {
        type: 'GET_TRANSACTIONS_ACOUNT',
        payload: {
          account: {
            id: account.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          for (let i = 0; i < response.length; i++) {
            this.transactions.push(response[i])
          }
          if (final) {
            this.getTransactionsStatus()
          }
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

    async getAccountsTransactions() {
      let account
      let final

      for (let i = 0; i < this.accounts.length; i++) {
        account = this.accounts[i]
        final = i + 1 === this.accounts.length ? true : false
        await this.getTransactions(account, final)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
</style>
