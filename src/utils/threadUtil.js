import strUtil from './strUtil'
import moment from 'moment'

export default {
  extractThreadInfo: (respThread) => {
    if (!respThread) {
      // console.log('invalid thread: ', respThread)
      return
    }

    let thread = {}
    let emails = []
    let members = []

    // add new fields
    const subjectIndex = respThread.messages[0].payload.headers.findIndex((header) => {
      return 'Subject' === header.name
    })
    thread.subject = respThread.messages[0].payload.headers[subjectIndex].value
    thread.msgCount = respThread.messages.length
    // pst timestamp of the last msg
    const lastUpdatedAtIndex = respThread.messages[thread.msgCount - 1].payload
      .headers.findIndex((header) => {
        return 'Received' === header.name
      })
    thread.lastUpdatedAt = respThread.messages[thread.msgCount - 1].payload
      .headers[lastUpdatedAtIndex].value.split(';')[1].trim()
    thread.formatUpdateTime = moment(thread.lastUpdatedAt).format('MMM DD')
    thread.labels = respThread.messages[thread.msgCount - 1].labelIds
    thread.membersNum = respThread.messages.map((msg) => {
      msg.payload.headers.forEach((header) => {
        if ('From' === header.name) {
          const email = formatFromAddr(header.value)
          const name = formatFromName(header.value)
          if (members.indexOf(name) < 0) {
            emails.push(email)
            members.push(name)
          }
        }
      })

      thread.members = members
      thread.emails = emails
      return members.length
    })[0]

    // add tag obj to thread
    const tag = addTagToThread(respThread, thread.emails[0])
    if (tag) {
      thread.tag = tag
    }

    return thread
  }
}

function formatFromAddr(rawdata) {
  if (typeof rawdata !== 'string') {
    return rawdata
  }
  var indexOfBracket = rawdata.indexOf('<')
  return indexOfBracket > 0 ? rawdata.substring(indexOfBracket + 1, rawdata.length - 1) : rawdata
}

function formatFromName(rawdata) {
  if (typeof rawdata !== 'string') {
    return rawdata
  }
  var indexOfBracket = rawdata.indexOf('<')
  var indexOfQuote = rawdata.indexOf('"')
  if (!(indexOfQuote < 0)) {
    return rawdata.substring(indexOfQuote + 1, indexOfBracket - 2)
  }

  return indexOfBracket > 0 ? rawdata.substring(0, indexOfBracket - 1) : rawdata
}

function addTagToThread(respThread, sender) {
  // hard code here
  // regard email from the email following as project
  //  do-not-reply@trello.com
  //  invitation-do-not-reply@trello.com
  if (sender !== 'do-not-reply@trello.com' &&
      sender !== 'invitation-do-not-reply@trello.com') {
    // console.log('sender is not do-not-reply@trello.com')
    return null
  }

  const tag = {}
  tag.type = 'project'
  // parts[0].body.data maybe undefined here, two cases:
  // case1: payload.parts[0] for no attachment
  //        in this case, payload.parts[0].body.data has encrypted data
  // case2: payload.parts.parts[0] which has a 0.1 partId for msg with 1 or more attchments
  //        in this case, payload.parts[0].body.data has no data, meaning undefined
  const encryptedContent = respThread.messages[0].payload.parts[0].body.data
  const content = strUtil.decodeUrlSafeBase64(encryptedContent)
  const projectName = getProjectName(content)
  tag.name = projectName

  return tag
}

function getProjectName(emailContent) {
  // only two action modes are taken into consideration
  // mode 1:  create a board on trello
  // mode 2:  comment on a card on some board
  let name = ''
  name = strUtil.getSubstringByRegExp('trelloCardOnBoard', emailContent)
  if (name) {
    return name
  }

  name = strUtil.getSubstringByRegExp('trelloBoard', emailContent)
  return name ? name : ''
}
