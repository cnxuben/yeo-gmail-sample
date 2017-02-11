import A from '../const/actionTypes'
import actions from '.'
import store from '../store'

export default {
  listenGmailLogin: () => {
    return (dispatch, getState) => {
      console.log('in listenGmailLogin: ', window.gapi)
      window.gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
        console.log('isSignedIn ? ', isSignedIn)
        if (isSignedIn) {
          console.log('********')
          const route = store.getState().routeParams.route
          if (route === '') {
            dispatch(actions.routeTo('mailbox'))
          } else {
            dispatch(actions.routeTo(
              route,
              store.getState().routeParams
            ))
          }

        }

      })
    }
  },
  tryLogin: () => {
    return (dispatch, getState) => {
      window.gapi.auth2.getAuthInstance().signIn()
      .then((authResult) => {
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
  }
  // logout: () => {
  //   return (dispatch, getState) => {
  //     dispatch({
  //       type: A.LOGOUT,
  //     })
  //     firebase.auth().signOut()
  //   }
  // },
}
