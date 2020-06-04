import axios from 'axios'

export const login = (user, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/auth/login`, {
      email: user.email,
      password: user.password
    })
    .then(function (response) {
      document.cookie = 'access_token=' + response.data.cookie
      sessionStorage.setItem('user', JSON.stringify(response.data))
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const logout = (callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/auth/logout`)
    .then(function (response) {
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
      sessionStorage.clear()
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const register = (payload, customerStripe, accountStripe, callback) => {
  let userId, placeId, userStatusId, userPlanId
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/place`, {
      name: payload.place.name,
      placeType: payload.place.placeType,
      place: payload.place.father
    })
    .then(function (response) {
      placeId = response.data.id
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/loyalty-user`, {
          email: payload.user.email,
          password: payload.user.password,
          role: payload.user.roleId,
          customerStripe,
          accountStripe
        })
        .then(function (response) {
          userId = response.data.id
          axios
            .post(`${process.env.VUE_APP_BACKEND_URL}/user-status`, {
              user: userId,
              status: payload.user.statusId,
              dateCreation: new Date()
            })
            .then(function (response) {
              userStatusId = response.data.id
              axios
                .post(`${process.env.VUE_APP_BACKEND_URL}/user-plan`, {
                  user: userId,
                  plan: payload.user.planId,
                  dateCreation: new Date()
                })
                .then(function (response) {
                  userPlanId = response.data.id
                  axios
                    .post(`${process.env.VUE_APP_BACKEND_URL}/person`, {
                      firstName: payload.person.firstName,
                      secondName: payload.person.secondName,
                      firstLastname: payload.person.firstLastname,
                      secondLastname: payload.person.secondLastname,
                      personalId: payload.person.personalId,
                      dateOfBirth: payload.person.dateOfBirth,
                      user: userId,
                      place: placeId
                    })
                    .then(function () {
                      axios
                        .post(
                          `${process.env.VUE_APP_BACKEND_URL}/email/welcome`,
                          {
                            email: payload.email.email,
                            name: payload.email.name
                          }
                        )
                        .then(function (response) {
                          callback(response.data, null)
                        })
                        .catch(function (error) {
                          callback(null, error)
                        })
                    })
                    .catch(function (error) {
                      axios
                        .delete(
                          `${process.env.VUE_APP_BACKEND_URL}/user-plan/${userPlanId}`
                        )
                        .then(function () {
                          axios
                            .delete(
                              `${process.env.VUE_APP_BACKEND_URL}/user-status/${userStatusId}`
                            )
                            .then(function () {
                              axios
                                .delete(
                                  `${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${userId}`
                                )
                                .then(function () {
                                  axios
                                    .delete(
                                      `${process.env.VUE_APP_BACKEND_URL}/place/${placeId}`
                                    )
                                    .catch(function (error) {
                                      callback(null, error)
                                    })
                                })
                                .catch(function (error) {
                                  callback(null, error)
                                })
                            })
                            .catch(function (error) {
                              callback(null, error)
                            })
                        })
                        .catch(function (error) {
                          callback(null, error)
                        })
                      callback(null, error)
                    })
                })
                .catch(function (error) {
                  axios
                    .delete(
                      `${process.env.VUE_APP_BACKEND_URL}/user-status/${userStatusId}`
                    )
                    .then(function () {
                      axios
                        .delete(
                          `${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${userId}`
                        )
                        .then(function () {
                          axios
                            .delete(
                              `${process.env.VUE_APP_BACKEND_URL}/place/${placeId}`
                            )
                            .catch(function (error) {
                              callback(null, error)
                            })
                        })
                        .catch(function (error) {
                          callback(null, error)
                        })
                    })
                    .catch(function (error) {
                      callback(null, error)
                    })
                  callback(null, error)
                })
            })
            .catch(function (error) {
              axios
                .delete(
                  `${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${userId}`
                )
                .then(function () {
                  axios
                    .delete(
                      `${process.env.VUE_APP_BACKEND_URL}/place/${placeId}`
                    )
                    .catch(function (error) {
                      callback(null, error)
                    })
                })
                .catch(function (error) {
                  callback(null, error)
                })

              callback(null, error)
            })
        })
        .catch(function (error) {
          axios
            .delete(`${process.env.VUE_APP_BACKEND_URL}/place/${placeId}`)
            .catch(function (error) {
              callback(null, error)
            })
          callback(null, error)
        })
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const recoveryPassword = (email, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/email/recover/${email}`, {})
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const firebaseLogin = (user, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/auth/firebaselogin`, {
      email: user.email
    })
    .then(function (response) {
      document.cookie = 'access_token=' + response.data.cookie
      sessionStorage.setItem('user', JSON.stringify(response.data))
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}
export const firebaseRegister = (
  payload,
  customerStripe,
  accountStripe,
  callback
) => {
  let userId, userStatusId, userPlanId
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/loyalty-user`, {
      email: payload.user.email,
      role: payload.user.roleId,
      picture: payload.user.picture,
      customerStripe,
      accountStripe
    })
    .then(function (response) {
      userId = response.data.id
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/user-status`, {
          user: userId,
          status: payload.user.statusId,
          dateCreation: new Date()
        })
        .then(function (response) {
          userStatusId = response.data.id
          axios
            .post(`${process.env.VUE_APP_BACKEND_URL}/user-plan`, {
              user: userId,
              plan: payload.user.planId,
              dateCreation: new Date()
            })
            .then(function (response) {
              userPlanId = response.data.id
              axios
                .post(`${process.env.VUE_APP_BACKEND_URL}/person`, {
                  firstName: payload.person.firstName,
                  firstLastname: payload.person.firstLastname,
                  user: userId
                })
                .then(function () {
                  axios
                    .post(`${process.env.VUE_APP_BACKEND_URL}/email/welcome`, {
                      email: payload.email.email,
                      name: payload.email.name
                    })
                    .then(function (response) {
                      callback(response.data, null)
                    })
                    .catch(function (error) {
                      callback(null, error)
                    })
                })
                .catch(function (error) {
                  axios
                    .delete(
                      `${process.env.VUE_APP_BACKEND_URL}/user-plan/${userPlanId}`
                    )
                    .then(function () {
                      axios
                        .delete(
                          `${process.env.VUE_APP_BACKEND_URL}/user-status/${userStatusId}`
                        )
                        .then(function () {
                          axios
                            .delete(
                              `${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${userId}`
                            )
                            .catch(function (error) {
                              callback(null, error)
                            })
                        })
                        .catch(function (error) {
                          callback(null, error)
                        })
                    })
                    .catch(function (error) {
                      callback(null, error)
                    })
                  callback(null, error)
                })
            })
            .catch(function (error) {
              axios
                .delete(
                  `${process.env.VUE_APP_BACKEND_URL}/user-status/${userStatusId}`
                )
                .then(function () {
                  axios
                    .delete(
                      `${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${userId}`
                    )
                    .catch(function (error) {
                      callback(null, error)
                    })
                })
                .catch(function (error) {
                  callback(null, error)
                })

              callback(null, error)
            })
        })
        .catch(function (error) {
          axios
            .delete(`${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${userId}`)
            .catch(function (error) {
              callback(null, error)
            })

          callback(null, error)
        })
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getPlace = (place, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/place/${place.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getPlaces = (place, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/place/type/${place.placeType}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getPlacesId = (place, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/place/idtype/${place.id}/${place.placeType}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getRole = (role, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/role/name/${role.name}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getPlan = (plan, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/plan/name/${plan.name}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getStatus = (status, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/status/name-type/${status.name}/${status.type}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const changePassword = (user, callback) => {
  axios
    .put(`${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${user.id}`, {
      password: user.password
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const registerAccount = (account, accountStripe, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/account`, {
      accountNumber: account.accountNumber,
      routingNumber: account.routingNumber,
      accountType: account.type.toUpperCase(),
      primary: account.accountPrimary,
      user: account.user,
      customerSourceStripe: accountStripe.customerSource.id,
      externalAccountStripe: accountStripe.externalAccount.id
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const validateRoutingNumber = (routingNumber, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/stripe/routing-number/${routingNumber}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const createTransaction = (
  transaction,
  amount,
  observation,
  transactionStripe,
  callback
) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/transaction`, {
      totalAmount: amount,
      points: transaction.points,
      transactionType: transaction.type,
      dateCreation: transaction.dateCreation,
      lastDateUpdate: transaction.lastDateUpdate,
      dateApprove: transaction.dateApprove,
      account: transaction.accountId,
      observation,
      transactionStripe
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const insertStatusAccount = (status, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/account-status`, {
      dateCreation: new Date(),
      account: status.account,
      status: status.status
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const insertStatusTransaction = (status, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/transaction-status`, {
      dateCreation: new Date(),
      transaction: status.transaction,
      status: status.status
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const insertAmount = (amount, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/amount`, {
      points: amount.points,
      addedAmount: amount.addedAmount,
      serviceCommission: amount.serviceCommission,
      processCommission: amount.processCommission,
      transaction: amount.transaction
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getRandomAmounts = (callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/stripe/amounts`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getPrimaryAccount = (user, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/account/primary/${user.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getTransactionsByTypeAccount = (account, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/transaction/type-account/${account.type}/${account.accountId}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getTransactionsByAccount = (account, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/transaction/account/${account.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const verifyAccount = (account, callback) => {
  axios
    .put(`${process.env.VUE_APP_BACKEND_URL}/stripe/verify-bank-account`, {
      bankAccount: account.bankAccount,
      customer: account.customer
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getAccountsUser = (user, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/account/all-user/${user.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getAccountsUserStatus = (user, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/account/all-userstatus/${user.id}/${user.status}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getLastAccountStatus = (account, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/account-status/last/${account.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getLastTransactionStatus = (transaction, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/transaction-status/last/${transaction.id}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getDollarPoints = (callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/conversion`)
    .then(function (response) {
      callback(response.data[0], null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getPerson = (user, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/person/user/${user.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getLastCommission = (callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/commission/last/commission`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getTotalPointsUser = (user, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/transaction/total-points-user/${user.id}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}
export const deleteAccountStatus = (account, callback) => {
  axios
    .delete(
      `${process.env.VUE_APP_BACKEND_URL}/account-status/account/${account.id}`
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const deleteAccount = (account, callback) => {
  axios
    .delete(`${process.env.VUE_APP_BACKEND_URL}/account/${account.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const deleteAccountStripe = (account, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/stripe/delete-bank-account`, {
      customerStripe: account.customerStripe,
      accountStripe: account.accountStripe,
      bankAccount: account.bankAccount
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const getProfile = (user, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${user.id}`)
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const registerCustomerStripe = (payload, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/stripe/create-customer`, {
      name: payload.person.firstName + ' ' + payload.person.firstLastname,
      email: payload.user.email
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const registerAccountStripe = (payload, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/stripe/create-account`, {
      type: 'custom',
      country: 'US',
      email: payload.user.email,
      business_type: 'individual',
      individual: {
        first_name: payload.person.firstName,
        last_name: payload.person.firstLastname,
        email: payload.user.email
      },
      requested_capabilities: ['transfers'],
      business_profile: {
        url: payload.person.firstName.toLowerCase().trim() + '.com'
      },
      tos_acceptance: {
        ip: '192.168.0.1',
        date: Math.round(new Date().getTime() / 1000)
      }
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const registerBankAccountStripe = (account, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/stripe/assign-bank-account`, {
      bankAccount: {
        bank_account: {
          country: 'US',
          currency: 'usd',
          account_holder_name: account.userName,
          account_holder_type: account.type,
          routing_number: account.routingNumber,
          account_number: account.accountNumber
        }
      },
      user: {
        customerStripe: account.customerStripe,
        accountStripe: account.accountStripe
      }
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const buyPointsStripe = (amount, customer, source, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/stripe/charge`, {
      amount,
      customer,
      source
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const fileSend = (payload, callback) => {
  axios
    .post(
      `${process.env.VUE_APP_BACKEND_URL}/email/receive/${payload.userId}`,
      payload.formData
    )
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const emailReceive = (email, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/email/receive`, {
      email: email.userEmail,
      points: email.points,
      service_charge: email.commission,
      total: email.total
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const createTaskCharge = (chargeResult, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/tasks/charge`, {
      name: `ChargeCronJob-${chargeResult.id}`,
      chargeId: chargeResult.id
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const changePointsStripe = (amount, account, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/stripe/transfer`, {
      amount,
      account
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const updateProfile = (user, callback) => {
  axios
    .put(`${process.env.VUE_APP_BACKEND_URL}/loyalty-user/${user.id}`, {
      password: user.password
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const updatePerson = (person, callback) => {
  axios
    .put(`${process.env.VUE_APP_BACKEND_URL}/person/${person.id}`, {
      firstName: person.firstName,
      secondName: person.secondName,
      firstLastname: person.firstLastname,
      secondLastname: person.secondLastname,
      personalId: person.personalId,
      dateOfBirth: person.dateOfBirth
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const updatePlace = (place, callback) => {
  axios
    .put(`${process.env.VUE_APP_BACKEND_URL}/place/${place.id}`, {
      name: place.name,
      place: place.father
    })
    .then(function (response) {
      callback(response.data, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}
