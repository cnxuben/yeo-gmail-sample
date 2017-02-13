require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'
import actions from '../actions'
import { connect } from 'react-redux'
import utf8 from 'utf8'
// const userId = 'singh.raghverndra@businessos.net'
const userId = 'me'

class MailListView extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      messageAndThreadIds: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.listMessages(userId, 'businessos', (results) => {
        this.setState({
          messageAndThreadIds: results
        })
      })
    }, 3000)
  }

  listMessages(userId, query, callback) {
    let getPageOfMessages = (request, result) => {
      request.execute(function(resp) {
        result = result.concat(resp.messages)
        let nextPageToken = resp.nextPageToken
        // Deliberately restricted multiple calls since it was an POC
        // In actual code hardcoded pageToken ('02715675988415759326')
        // should be removed.
        if (nextPageToken == '02715675988415759326') {
          request = window.gapi.client.gmail.users.messages.list({
            'userId': userId,
            'pageToken': nextPageToken,
            'q': query
          });
          getPageOfMessages(request, result)
        } else {
          callback(result)
        }
      })
    }
    let initialRequest = window.gapi.client.gmail.users.messages.list({
      'userId': userId,
      'q': query
    })
    getPageOfMessages(initialRequest, [])
  }

  getMessage(userId, messageId, format, callback) {
    var request = window.gapi.client.gmail.users.messages.get({
      'userId': userId,
      'id': messageId,
      'format': format
    });
    request.execute(callback)
  }

  decodeUrlSafeBase64(s) {
    return atob(s.replace(/\-/g, '+').replace(/\_/g, '/'))
  }

  render() {
    let messages = this.state.messageAndThreadIds.splice(1, 1)
    messages.length > 0 ? (
      messages.map((value) => {
        this.getMessage(userId, value.id, 'raw', (result) => {
          console.log(result) // log whole result object
          console.log(this.decodeUrlSafeBase64(result.raw)) // log whole message <HTML> data
          console.log(utf8.decode(this.decodeUrlSafeBase64(result.raw))) // log whole email data with utf8 encoding
        })
      })
    ) : null
    return (
      <div className="index" style={styles.container} >
        <h4>MailListView here</h4>
        {

        }
        <button onClick={this.props.listThreads} >try api here</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    threads: state.threads
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listThreads: () => dispatch(actions.listThreads())
  }
}

const styles = {
  container: {
    margin: 10
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailListView)
