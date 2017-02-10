import A from '../const/actionTypes'
import actions from '.'
import store from '../store'
import { push } from 'react-router-redux'

export default {
  listenGmailLogin: () => {
    return (dispatch, getState) => {
      console.log('in listenGmailLogin: ', window.gapi)
      window.gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
        // route to /mailbox
        console.log('isSignedIn ? ', isSignedIn)
        if (isSignedIn) {
          console.log('********')
          dispatch(push('/mailbox'))
          // const route = store.getState().routeParams.route
          // if (route === '') {
          //   dispatch(actions.routeTo(''))
          // }
        }

      })
      // firebase.auth().onAuthStateChanged((authData) => {
      //   const route = store.getState().routeParams.route
      //   if (authData) {
      //     dispatch({
      //       type: A.LOGIN,
      //       uid: authData.uid,
      //       username: authData.displayName, // authData.github.displayName || authData.github.username
      //     })
      //     dispatch(actions.syncDispatcher(authData))
      //     // TODO: notifications will need index generated before the client can read them
      //     // dispatch(actions.startListeningToNotifications(authData.uid))

      //     if (route === '') {
      //       dispatch(actions.routeTo('viewAppointments'))
      //     } else {
      //       dispatch(actions.routeTo(
      //         route,
      //         store.getState().routeParams
      //       ))
      //     }
      //   } else {
      //     if (route !== '') {
      //       dispatch(actions.routeTo(''))
      //     }
      //   }
      // })
    }
  },
  tryLogin: () => {
    return (dispatch, getState) => {
      // dispatch({
      //   type: A.ATTEMPTING_LOGIN,
      // })
      console.log('tryLogin called: ', window.gapi)
      window.gapi.auth2.getAuthInstance().signIn()
      .then((authResult) => {
        console.log('authResult: ', authResult)
        if (authResult && !authResult.error) {
        }
      })
      // .catch(
      //   (error) => {
      //     dispatch({
      //       type: A.DISPLAY_ERROR,
      //       error: 'Login failed! ' + error
      //     })
      //     dispatch({
      //       type: A.LOGOUT
      //     })
      //   }
      // )
    }
  },
  // logout: () => {
  //   return (dispatch, getState) => {
  //     dispatch({
  //       type: A.LOGOUT,
  //     })
  //     firebase.auth().signOut()
  //   }
  // },
}
