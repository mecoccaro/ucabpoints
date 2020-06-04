<template>
  <v-container class="locale-changer">
    <v-row>
      <v-app-bar app color="navbar" dark>
        <v-app-bar-nav-icon
          color="white"
          @click="drawer = true"
        ></v-app-bar-nav-icon>
        <v-img
          src="../assets/Isotipowhite.png"
          max-width="40"
          max-height="40"
        />
        <v-col cols="4">
          <v-img
            src="../assets/Logotipowhite.png"
            max-width="130"
            max-height="130"
          />
        </v-col>
        <v-col align="right">
          <v-spacer></v-spacer>
          <v-menu left bottom class="navbar">
            <template v-slot:activator="{ on }">
              <v-btn color="white" icon v-on="on" >
                <changeLang />
              </v-btn>
            </template>
          </v-menu>
          <v-btn color="white" icon @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-col>
      </v-app-bar>
    </v-row>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      clipped
      color="white"
    >
      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="12" align="center" justify="center">
              <v-avatar>
                <v-btn fab color="grey" @click="submit('/profile')">
                  <v-icon color="white">mdi-account-circle</v-icon>
                </v-btn>
              </v-avatar>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="submit(item.push)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(item.title) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-1">
          <v-list-item-content>
            <v-row align="center" justify="center">
              <v-img
                src="../assets/Isotipo.png"
                max-height="50"
                max-width="50"
              ></v-img>
            </v-row>
          </v-list-item-content>
        </div>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import changeLang from './changeLang'
import { APICaller } from '../services/index'

export default {
  name: 'Navbar',
  data: () => ({
    drawer: false,
    idiomas: [
      { title: 'Spanish', sh: 'es' },
      { title: 'English', sh: 'en' }
    ],
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', push: '/home' },
      {
        title: 'Account',
        icon: ' mdi-plus-circle-outline',
        push: '/register-account'
      },
      {
        title: 'Buy',
        icon: ' mdi-numeric-9-plus-box-multiple-outline',
        push: '/buy-points'
      },
      { title: 'Points', icon: ' mdi-cash-usd', push: '/change-points' },
      {
        title: 'Account List',
        icon: ' mdi-format-list-bulleted',
        push: '/list-accounts'
      },
      {
        title: 'Transaction List',
        icon: ' mdi-format-list-bulleted',
        push: '/list-transactions'
      }
    ]
  }),
  components: { changeLang },

  methods: {
    submit(push) {
      this.$router.push(push)
    },

    logout() {
      const action = {
        type: 'LOGOUT',
        payload: {}
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
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style>
