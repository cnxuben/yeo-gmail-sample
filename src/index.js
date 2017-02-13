import 'core-js/fn/object/assign';
import React from 'react';
import { render } from 'react-dom';
import {
  Router,
  browserHistory
} from 'react-router'
import store from './store'
import Routes from './Routes'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import actions from './actions'

// gmail api initialize
window.onload = function () {
  console.log('before loading')
  window.gapi.load('client:auth2', initClient)
}

function initClient() {
  // Client ID and API key from the Developer Console
  // var CLIENT_ID = '<YOUR_CLIENT_ID>';
  const CLIENT_ID = '901004186973-p4216pindisr1d4grkec30tklab59dmi.apps.googleusercontent.com'
  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'

  window.gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    console.log('initClient: ', window.gapi.auth2.getAuthInstance().isSignedIn.get())
    // Handle the initial sign-in state.
    // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    // Listen for sign-in state changes.
    store.dispatch(actions.listenGmailLogin())
    updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  })
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log('init already login')
    store.dispatch(actions.routeTo('mailbox'))
  }
}

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {Routes}
    </Router>
  </Provider>
  , document.getElementById('app'))
// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));
