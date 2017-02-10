require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import actions from '../actions'
import { connect } from 'react-redux'

class MailListView extends React.Component {
  render() {
    return (
      <div className="index" style={styles.container} >
        <h4>MailListView here</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return { auth: state.auth, }
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const styles = {
  container: {
    margin: 10
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailListView)
