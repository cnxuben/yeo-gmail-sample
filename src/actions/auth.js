import actions from '.'

export default {
  listenGmailLogin: () => {
    return (dispatch, getState) => {
      console.log('in listenGmailLogin: ', window.gapi)
      window.gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
        console.log('isSignedIn ? ', isSignedIn)
        if (isSignedIn) {
          const route = getState().routeParams.route
          console.log('****** route is: ', route)
          if (route === '') {
            dispatch(actions.routeTo('mailbox'))
          } else {
            dispatch(actions.routeTo(
              route,
              getState().routeParams
            ))
          }

        }

      })
    }
  },
  tryLogin: () => {
    return () => {
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
