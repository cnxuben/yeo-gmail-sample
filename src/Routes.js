import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { StyleRoot } from 'radium'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/Main'
import MailListView from './components/MailListView'
import Container from './components/Container.js'

/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > AppWrapper
 */
const Routes = (
  <MuiThemeProvider>
    <StyleRoot>
      {/*<Route path="/" compoment={Container}>*/}
      <IndexRoute component={App} />
      <Route path="/mailbox" component={MailListView} />
{/*        <Route path="/enterAppointment/:params" component={EnterAppointmentView}
          params="s=siteId&j=jobId&a=appointmentId"/>
*/}
      {/*</Route>*/}
    </StyleRoot>
  </MuiThemeProvider>
)

export default Routes
