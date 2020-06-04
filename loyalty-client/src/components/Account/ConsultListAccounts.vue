<template>
  <v-col cols="12">
    <v-card>
      <v-card-title>
        {{$t('Account List')}}
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
        :items="accountsItems"
        :items-per-page="5"
        class="elevation-1 list-table"
      >
        <template slot="headerCell" slot-scope="props">
          <span>{{$t(props.headers.text)}}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="verify(item)" v-if="item.status === 'NEW'">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)" v-if="item.primary === 'F'">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="continueDialog" max-width="400">
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
import { APICaller } from '../../services/index'

export default {
  name: 'ConsultListAccounts',
  props: {},
  data: () => ({
    search: '',

    accounts: [],
    accountsItems: [],
    accountSelected: {},

    statusId: 0,

    headers: [
      {
        text: 'Account Number',
        align: 'start',
        sortable: false,
        value: 'accountNumber'
      },
      {
        text: 'Routing Number',
        sortable: false,
        value: 'routingNumber'
      },
      {
        text: 'Account Type',
        sortable: false,
        value: 'accountType'
      },
      {
        text: 'Primary',
        sortable: false,
        value: 'primary'
      },
      {
        text: 'Status',
        sortable: false,
        value: 'status'
      },
      { text: 'Actions', value: 'actions', sortable: false }
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
    verify(item) {
      this.$router.push(`/verify-account/${item.id}/${item.accountStripe}`)
    },
    deleteItem(item) {
      this.accountSelected = item
      this.continueDialogTittle = 'Delete Account.'
      this.continueDialogMessage = 'Are you sure to delete this account?'
      this.continueDialog = true
    },
    cont() {
      const action = {
        type: 'DELETE_ACCOUNT',
        payload: {
          account: {
            id: this.accountSelected.id,
            customerStripe: this.user.user.customerStripe,
            accountStripe: this.user.user.accountStripe,
            externalAccountStripe: this.accountSelected.externalAccountStripe,
            customerSourceStripe: this.accountSelected.customerSourceStripe
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.dialogTittle = 'Delete Correctly'
          this.dialogMessage = 'The account was deleted.'
          this.dialog = true
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
            name: 'VERIFIED',
            type: 'ACCOUNT'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.statusId = response.id
          this.getLastAccountsStatus()
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

    async pushAccount(account) {
      let accountStatus

      const action = {
        type: 'GET_LAST_ACCOUNTS_STATUS',
        payload: {
          account: {
            id: account.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          accountStatus = {
            ...account,
            status: response.status.id == this.statusId ? 'VERIFIED' : 'NEW'
          }

          this.accountsItems.push(accountStatus)
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

    async getLastAccountsStatus() {
      let account

      for (let i = 0; i < this.accounts.length; i++) {
        account = this.accounts[i]
        await this.pushAccount(account)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
</style>
