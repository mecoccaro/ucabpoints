import Vue from 'vue'
import Vuetify from 'vuetify/lib'

// import '@mdi/font/scss/materialdesignicons.scss'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa' // default - only for display purposes
  }
})
