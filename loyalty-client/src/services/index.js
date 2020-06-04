import * as APIController from './APIController'

export const APICaller = async (action, callback) => {
  switch (action.type) {
    case 'LOGIN':
      APIController.login(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'LOGOUT':
      APIController.logout((res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'REGISTER':
      APIController.registerCustomerStripe(action.payload, (res, err) => {
        if (!err) {
          const customerStripe = res.id
          APIController.registerAccountStripe(action.payload, function (
            res,
            err
          ) {
            if (!err) {
              const accountStripe = res.id
              APIController.register(
                action.payload,
                customerStripe,
                accountStripe,
                function (res, err) {
                  if (!err) {
                    APIController.login(action.payload.user, function (
                      res,
                      err
                    ) {
                      if (!err) {
                        callback(res, null)
                      } else {
                        callback(null, err)
                      }
                    })
                  } else {
                    callback(null, err)
                  }
                }
              )
            } else {
              callback(null, err)
            }
          })
        } else {
          callback(null, err)
        }
      })
      break

    case 'RECOVERY_PASSWORD':
      APIController.recoveryPassword(action.payload.user.email, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'FIREBASE_LOGIN':
      APIController.firebaseLogin(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'FIREBASE_REGISTER':
      APIController.registerCustomerStripe(action.payload, (res, err) => {
        if (!err) {
          const customerStripe = res.id
          APIController.registerAccountStripe(action.payload, function (
            res,
            err
          ) {
            if (!err) {
              const accountStripe = res.id
              APIController.firebaseRegister(
                action.payload,
                customerStripe,
                accountStripe,
                function (res, err) {
                  if (!err) {
                    APIController.firebaseLogin(action.payload.user, function (
                      res,
                      err
                    ) {
                      if (!err) {
                        callback(res, null)
                      } else {
                        callback(null, err)
                      }
                    })
                  } else {
                    callback(null, err)
                  }
                }
              )
            } else {
              callback(null, err)
            }
          })
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_PLACE':
      APIController.getPlace(action.payload.place, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_PLACES':
      APIController.getPlaces(action.payload.place, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_PLACES_ID':
      APIController.getPlacesId(action.payload.place, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_ROLE':
      APIController.getRole(action.payload.role, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_PLAN':
      APIController.getPlan(action.payload.plan, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_STATUS':
      APIController.getStatus(action.payload.status, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'CHANGE_PASSWORD':
      APIController.changePassword(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'VALIDATE_ROUTING_NUMBER':
      APIController.validateRoutingNumber(
        action.payload.routingNumber,
        (res, err) => {
          if (!err) {
            callback(res, null)
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'GET_PERSON':
      APIController.getPerson(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'REGISTER_ACCOUNT':
      APIController.registerBankAccountStripe(
        action.payload.account,
        (res, err) => {
          if (!err) {
            const accountStripe = res
            APIController.registerAccount(
              action.payload.account,
              accountStripe,
              function (res, err) {
                if (!err) {
                  callback(res, null)
                } else {
                  callback(null, err)
                }
              }
            )
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'CREATE_VERIFY_TRANSACTION':
      APIController.createTransaction(
        action.payload.transaction,
        action.payload.amounts.amount1,
        action.payload.amounts.observation1,
        null,
        (res, err) => {
          if (!err) {
            APIController.insertStatusTransaction(
              {
                status: action.payload.transaction.status,
                transaction: res.id
              },
              (res, err) => {
                if (!err) {
                  APIController.createTransaction(
                    action.payload.transaction,
                    action.payload.amounts.amount2,
                    action.payload.amounts.observation2,
                    null,
                    (res, err) => {
                      if (!err) {
                        APIController.insertStatusTransaction(
                          {
                            status: action.payload.transaction.status,
                            transaction: res.id
                          },
                          (res, err) => {
                            if (!err) {
                              callback(res, null)
                            } else {
                              callback(null, err)
                            }
                          }
                        )
                      } else {
                        callback(null, err)
                      }
                    }
                  )
                } else {
                  callback(null, err)
                }
              }
            )
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'GET_RANDOM_AMOUNTS':
      APIController.getRandomAmounts((res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_PRIMARY_ACCOUNT':
      APIController.getPrimaryAccount(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'INSERT_STATUS_ACCOUNT':
      APIController.insertStatusAccount(action.payload.status, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'DELETE_ACCOUNT':
      APIController.deleteAccountStripe(action.payload.account, (res, err) => {
        if (!err) {
          APIController.deleteAccountStatus(
            action.payload.account,
            (res, err) => {
              if (!err) {
                APIController.deleteAccount(
                  action.payload.account,
                  (res, err) => {
                    if (!err) {
                      callback(res, null)
                    } else {
                      callback(null, err)
                    }
                  }
                )
              } else {
                callback(null, err)
              }
            }
          )
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_TRANSACTIONS_TYPE_ACCOUNT':
      APIController.getTransactionsByTypeAccount(
        action.payload.account,
        (res, err) => {
          if (!err) {
            callback(res, null)
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'GET_TRANSACTIONS_ACOUNT':
      APIController.getTransactionsByAccount(
        action.payload.account,
        (res, err) => {
          if (!err) {
            callback(res, null)
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'VERIFY_ACCOUNT':
      APIController.verifyAccount(action.payload.account, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_ACCOUNTS':
      APIController.getAccountsUser(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_LAST_ACCOUNTS_STATUS':
      APIController.getLastAccountStatus(action.payload.account, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_LAST_TRANSACTION_STATUS':
      APIController.getLastTransactionStatus(
        action.payload.transaction,
        (res, err) => {
          if (!err) {
            callback(res, null)
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'GET_ACCOUNTS_STATUS':
      APIController.getAccountsUserStatus(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_DOLLAR_POINTS':
      APIController.getDollarPoints((res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_TOTAL_POINTS':
      APIController.getTotalPointsUser(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'GET_LAST_COMMISSION':
      APIController.getLastCommission((res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'INSERT_STATUS_TRANSACTION':
      APIController.insertStatusTransaction(
        action.payload.status,
        (res, err) => {
          if (!err) {
            callback(res, null)
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'INSERT_AMOUNT':
      APIController.insertAmount(action.payload.amount, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'BUY_POINTS':
      APIController.buyPointsStripe(
        action.payload.amount,
        action.payload.customerStripe,
        action.payload.accountStripe,
        (res, err) => {
          if (!err) {
            const transactionStripe = res
            APIController.createTaskCharge(transactionStripe, (res, err) => {
              if (!err) {
                APIController.createTransaction(
                  action.payload.transaction,
                  action.payload.amountTotal,
                  null,
                  transactionStripe.id,
                  (res, err) => {
                    if (!err) {
                      callback(res, null)
                    } else {
                      callback(null, err)
                    }
                  }
                )
              } else {
                callback(null, err)
              }
            })
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'EMAIL_RECEIVE':
      APIController.emailReceive(action.payload.email, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'SEND_FILE':
      APIController.fileSend(action.payload, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'CHANGE_POINTS':
      APIController.changePointsStripe(
        action.payload.amount,
        action.payload.accountStripe,
        (res, err) => {
          if (!err) {
            const transactionStripe = res
            APIController.createTransaction(
              action.payload.transaction,
              action.payload.amountTotal,
              null,
              transactionStripe,
              (res, err) => {
                if (!err) {
                  callback(res, null)
                } else {
                  callback(null, err)
                }
              }
            )
          } else {
            callback(null, err)
          }
        }
      )
      break
    case 'GET_PROFILE':
      APIController.getProfile(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'UPDATE_PROFILE':
      APIController.updateProfile(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'UPDATE_PERSON':
      APIController.updatePerson(action.payload.person, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    case 'UPDATE_PLACE':
      APIController.updatePlace(action.payload.place, (res, err) => {
        if (!err) {
          callback(res, null)
        } else {
          callback(null, err)
        }
      })
      break
    default:
      break
  }
}
