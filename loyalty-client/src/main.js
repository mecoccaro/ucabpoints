import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'

import VueProgressBar from 'vue-progressbar'

import * as firebase from 'firebase/app'

import { firebaseConfig } from './firebase/firebase.config'
import i18n from './plugins/i18n'

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(VueProgressBar, options)

new Vue({
  router,
  store,
  vuetify,
  VueI18n,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
