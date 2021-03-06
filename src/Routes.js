import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { StyleRoot } from 'radium'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/Main'
import MailListView from './components/MailListView'
import GeneralView from './components/General'
import ProjectsView from './components/Projects'
import Container from './components/Container.js'
import ProjectDetail from './components/ProjectDetail'
import TripsView from './components/Trips'
import TripDetail from './components/TripDetail'


require('normalize.css/normalize.css');
require('antd/dist/antd.css')
require('styles/App.css')

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
      <Route path="/" component={App} />
      <Route path="/mailbox" component={MailListView}>
        <IndexRoute component={GeneralView}/>
        <Route path="/project" component={ProjectsView} />
        <Route path="/projectDetail" component={ProjectDetail} />
        <Route path="/trip" component={TripsView}/>
        <Route path="/tripDetail" component={TripDetail} />
      </Route>
{/*        <Route path="/enterAppointment/:params" component={EnterAppointmentView}
          params="s=siteId&j=jobId&a=appointmentId"/>
*/}
    </StyleRoot>
  </MuiThemeProvider>
)

export default Routes
