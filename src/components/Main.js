// require('normalize.css/normalize.css');
// require('styles/App.css');

import React from 'react';
import actions from '../actions'
import { connect } from 'react-redux'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index" style={styles.container} >
        <h4>Gmail API Quickstart</h4>
        <button
          id="authorize-button"
          onClick={this.props.tryLogin}
          >Authorize</button>
        {/*<button id="signout-button" style={{display: 'none'}}>Sign Out</button>*/}
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
const mapStateToProps = () => {
  // return { auth: state.auth, }
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: () => dispatch(actions.tryLogin())
  }
}

const styles = {
  container: {
    margin: 10
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
