<template>
  <v-col cols="12">
    <v-row justify="center">
      <v-col cols="12" class="title-profile">
        <header justify="center" align="center" class="title">{{$t('Profile')}}</header>
      </v-col>

      <v-col cols="12" sm="4" md="4">
        <v-row justify="center" class="card-profile">
          <v-card class="imagen justify-center" justify-content-center>
            <v-img src="../assets/profile.png" />
            <v-card-title>User</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Points: {{ this.totalPoints }}</v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="buy">{{$t('BuyButton')}}</v-btn>
              <v-btn color="deep-purple lighten-2" text @click="change"
                >{{$t('Change')}}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-row>
        <v-row justify="center">
          <v-btn dark class="btns" @click="listAccounts">{{$t('AccountsButton')}}</v-btn>
          <v-btn dark class="btns" @click="listTransactions"
            >{{$t('Transactions')}}</v-btn
          >
          <!-- <v-btn dark class="btns">Level</v-btn>-->
        </v-row>
      </v-col>

      <v-col cols="12" sm="8" md="8" class="text-center form">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container id="scroll-target" class="overflow-y-auto con">
            <v-row>
              <strong class="formtitle">{{$t('My Data')}}</strong>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  name="FirstName"
                  v-model="firstName"
                  type="text"
                  :readonly="!enabled"
                  :rules="[rules.required]"
                >
                  <template v-slot:label>{{ $t('FirstN') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  type="text"
                  v-model="secondName"
                  :readonly="!enabled"
                >
                  <template v-slot:label>{{ $t('SecondN') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  type="text"
                  v-model="firstLastname"
                  :readonly="!enabled"
                  :rules="[rules.required]"
                ><template v-slot:label>{{ $t('FirstL') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  type="text"
                  v-model="secondLastname"
                  :readonly="!enabled"
                ><template v-slot:label>{{ $t('SecondL') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  type="text"
                  v-model="cedula"
                  v-mask="['######', '#######', '########']"
                  :readonly="!enabled"
                ><template v-slot:label>{{ $t('id') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  type="text"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  readonly
                ><template v-slot:label>{{ $t('Email') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <!--<v-row>
              <v-col cols="6">
                <v-select
                  outlined
                  name="Country"
                  item-value="id"
                  item-text="name"
                  :readonly="!enabled"
                  v-model="country"
                  :items="countries"
                  @change="getStates()"
                ><template v-slot:label>{{ $t('Country') }}</template>
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  outlined
                  name="State"
                  item-value="id"
                  item-text="name"
                  v-model="state"
                  :items="states"
                  :readonly="!enabled"
                ><template v-slot:label>{{ $t('State') }}</template>
                </v-select>
              </v-col>
            </v-row>-->
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  v-model="address"
                  type="text"
                  :readonly="!enabled"
                ><template v-slot:label>{{ $t('Address') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      outlined
                      v-model="date"
                      append-icon="fa-calendar-day"
                      @click:append="menu = !menu"
                      v-on="on"
                      :rules="[rules.required]"
                      :disabled="!enabled"
                    ><template v-slot:label>{{ $t('Date') }}</template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  v-model="password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  :readonly="!enabled"
                ><template v-slot:label>{{ $t('Pass') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  v-model="repeatPassword"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  :rules="[passwordConfirmationRule]"
                  :readonly="!enabled"
                  v-if="enabled"
                ><template v-slot:label>{{ $t('RPass') }}</template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-between" aling="center">
              <v-col xs="12" justify="center" align="center">
                <v-btn
                  large
                  block
                  dark
                  class="btn"
                  :disabled="!btnmod"
                  @click="enabledbtns"
                  v-if="!enabled"
                  >{{$t('Modify')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn
                  large
                  block
                  class="btn"
                  dark
                  :disabled="!btnaction"
                  @click="modificar"
                  v-if="enabled"
                  >{{$t('Save')}}</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  large
                  dark
                  block
                  class="btn"
                  :disabled="!btnaction"
                  @click="action"
                  v-if="enabled"
                  >{{$t('CancelButton')}}</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>

    <v-dialog v-model="continueDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ continueDialogTittle }}</v-card-title>
        <v-card-text>{{ continueDialogTittle }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mask } from 'vue-the-mask'
import { APICaller } from '../services/index'
export default {
  name: 'Profile',
  props: {},
  directives: { mask },
  data: () => ({
    valid: true,

    person: {},
    user: {},
    userStorage: {},

    firstName: '',
    secondName: '',
    firstLastname: '',
    secondLastname: '',
    cedula: '',
    email: '',
    password: '',
    show1: false,
    repeatPassword: '',
    show2: false,
    country: '',
    countries: [],
    state: '',
    states: [],
    address: '',
    menu: false,
    enabled: false,
    btnaction: false,
    btnmod: true,
    offsetTop: 0,

    totalPoints: 0,

    role: 'CLIENT',
    roleId: 0,

    status: 'ACTIVE',
    statusType: 'USER',
    statusId: 0,

    plan: 'BASIC',
    planId: 0,

    continueDialog: false,
    continueDialogTittle: '',
    continueDialogMessage: '',

    date: new Date().toISOString().substr(0, 10),
    lazy: false,

    rules: {
      required: (value) => !!value || 'Required.',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail'
      },
      cedula: (value) => value.length < 6 && 'Invalid cedula (min 6 characters)'
    }
  }),

  beforeMount() {
    this.userStorage = JSON.parse(sessionStorage.getItem('user'))
    this.getProfile()
    this.getPerson()
    //this.getCountries()
    this.getTotalPoints()
  },

  methods: {
    buy() {
      this.$router.push('/buy-points')
    },
    change() {
      this.$router.push('/change-points')
    },
    listAccounts() {
      this.$router.push('/list-accounts')
    },
    listTransactions() {
      this.$router.push('/list-transactions')
    },
    passwordMinRule() {
      return this.password === this.repeatPassword || 'Password must match'
    },
    passwordConfirmationRule() {
      return this.password === this.repeatPassword || 'Password must match'
    },

    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    enabledbtns() {
      ;(this.btnaction = true), (this.enabled = true), (this.btnmod = false)
    },
    action() {
      ;(this.btnaction = false), (this.enabled = false), (this.btnmod = true)
    },

    getTotalPoints() {
      const action = {
        type: 'GET_TOTAL_POINTS',
        payload: {
          user: {
            id: this.userStorage.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.totalPoints = response
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    getPerson() {
      const action = {
        type: 'GET_PERSON',
        payload: {
          user: {
            id: this.userStorage.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.person = response

          this.firstName = this.person.firstName
          this.secondName = this.person.secondName
          this.firstLastname = this.person.firstLastname
          this.secondLastname = this.person.secondLastname
          this.cedula = this.person.cedula

          if (this.person.place) {
            this.getAddress()
          }
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    getProfile() {
      const action = {
        type: 'GET_PROFILE',
        payload: {
          user: {
            id: this.userStorage.user.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.user = response

          this.email = this.user.email
          this.password = this.user.password
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    getCountries() {
      const action = {
        type: 'GET_PLACES',
        payload: {
          place: {
            placeType: 'COUNTRY'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.countries = response
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    getStates() {
      const action = {
        type: 'GET_PLACES_ID',
        payload: {
          place: {
            id: this.country,
            placeType: 'STATE'
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.states = response
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    getCountry(id) {
      const action = {
        type: 'GET_PLACE',
        payload: {
          place: {
            id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.country = response
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    getState(id) {
      const action = {
        type: 'GET_PLACE',
        payload: {
          place: {
            id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.state = response
          this.getCountry(response.place)
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    getAddress() {
      const action = {
        type: 'GET_PLACE',
        payload: {
          place: {
            id: this.person.place.id
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          if (response) {
            this.address = response.name
            this.getState(response.place)
          }
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          }
        }
      })
    },

    validate() {
      this.valid = this.$refs.form.validate()
    },

    updateAddress() {
      const action = {
        type: 'UPDATE_PLACE',
        payload: {
          place: {
            id: this.person,
            name: this.address,
            father: null
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          this.continueDialogTittle = 'Successful Update'
          this.continueDialogMessage = 'Your profile was updated correctly.'
          this.continueDialog = true
          this.action()
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          } else if (error.message === 'Request failed with status code 401') {
            this.continueDialogTittle = 'Validation Error'
            this.continueDialogTittle =
              'The data entered is not correct, try again.'
            this.continueDialog = true
          }
        }
      })
    },

    updatePerson() {
      const action = {
        type: 'UPDATE_PERSON',
        payload: {
          person: {
            id: this.person.id,
            firstName: this.firstName,
            secondName: this.secondName,
            firstLastname: this.firstLastname,
            secondLastname: this.secondLastname,
            personalId: this.cedula,
            dateOfBirth: this.date
          }
        }
      }

      APICaller(action, (response, error) => {
        if (!error) {
          if (this.person.place) {
            this.updateAddress()
          } else {
            this.continueDialogTittle = 'Successful Update'
            this.continueDialogMessage = 'Your profile was updated correctly.'
            this.continueDialog = true
            this.action()
          }
        } else {
          if (error.message === 'Network Error') {
            this.continueDialogTittle = 'Network Error'
            this.continueDialogTittle =
              'At this time it is not possible to establish a connection, please try later.'
            this.continueDialog = true
          } else if (error.message === 'Request failed with status code 401') {
            this.continueDialogTittle = 'Validation Error'
            this.continueDialogTittle =
              'The data entered is not correct, try again.'
            this.continueDialog = true
          }
        }
      })
    },

    modificar() {
      this.validate()

      if (this.valid) {
        const action = {
          type: 'UPDATE_PROFILE',
          payload: {
            user: {
              id: this.userStorage.user.id,
              password: this.password
            }
          }
        }

        APICaller(action, (response, error) => {
          if (!error) {
            this.updatePerson()
          } else {
            if (error.message === 'Network Error') {
              this.continueDialogTittle = 'Network Error'
              this.continueDialogTittle =
                'At this time it is not possible to establish a connection, please try later.'
              this.continueDialog = true
            } else if (
              error.message === 'Request failed with status code 401'
            ) {
              this.continueDialogTittle = 'Validation Error'
              this.continueDialogTittle =
                'The data entered is not correct, try again.'
              this.continueDialog = true
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
