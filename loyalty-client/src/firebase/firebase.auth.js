import * as firebase from 'firebase/app'
import 'firebase/auth'

export const googleAuth = (callback) => {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const user = result.user

      callback(user, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}

export const facebookAuth = (callback) => {
  const provider = new firebase.auth.FacebookAuthProvider()

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const user = result.user

      callback(user, null)
    })
    .catch(function (error) {
      callback(null, error)
    })
}
