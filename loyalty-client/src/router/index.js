import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import RecoveryPassword from '../views/RecoveryPassword.vue'
import ChangePassword from '../views/ChangePasswordView.vue'
import Home from '../views/HomeView.vue'
import Profile from '../views/ProfileView.vue'

import RegisterAccountView from '../views/RegisterAccountView.vue'
import VerifyAccountView from '../views/VerifyAccountView.vue'
import BuyPointsView from '../views/BuyPointsView.vue'
import ChangePointsView from '../views/ChangePointsView.vue'
import ListAccountsView from '../views/ListAccountsView.vue'
import ListTransactionsView from '../views/ListTransactionsView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/recovery',
    name: 'RecoveryPassword',
    component: RecoveryPassword
  },
  {
    path: '/changepass/:userId',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/home',
    name: 'HomeView',
    component: Home
  },
  {   
     path: '/profile',
     name: 'ProfileView',
     component: Profile
  },
  {

    path: '/register-account',
    name: 'RegisterAccountView',
    component: RegisterAccountView
  },
  {
    path: '/verify-account/:accountId/:accountStripe',
    name: 'VerifyAccountView',
    component: VerifyAccountView
  },
  {
    path: '/buy-points',
    name: 'BuyPointsView',
    component: BuyPointsView
  },
  {
    path: '/change-points',
    name: 'ChangePointsView',
    component: ChangePointsView
  },
  {
    path: '/list-accounts',
    name: 'ListAccountsView',
    component: ListAccountsView
  },
  {
    path: '/list-transactions',
    name: 'ListAccountsView',
    component: ListTransactionsView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeResolve((to, from, next) => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const isAuthenticated = user ? true : false

  if (
    to.name !== 'Login' &&
    to.name !== 'Register' &&
    to.name !== 'RecoveryPassword' &&
    to.name !== 'ChangePassword' &&
    !isAuthenticated
  )
    next({ name: 'Login' })
  else next()
})

export default router

