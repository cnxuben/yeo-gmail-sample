import regExpTemplate from '../const/regExpTemplate'

export default {
  decodeUrlSafeBase64: (rawStr) => {
    return atob(rawStr.replace(/\-/g, '+').replace(/\_/g, '/'))
  },
  getSubstringByRegExp: (templateMode, rawStr) => {
    const template = regExpTemplate[templateMode]
    const matchStart = template.startMode.exec(rawStr)
    const matchEnd = template.endMode.exec(rawStr)
    if (!matchStart || !matchEnd) {
      console.log('nothing match')
      return ''
    }
    if (templateMode === 'trelloInvite') {
      const startIndex = matchStart.index + 3
      const endIndex = matchEnd.index + matchEnd[0].length - 3
      const name = rawStr.substring(startIndex, endIndex)
      return name
    }

    const startIndex = matchStart.index + matchStart[0].length + 1
    const endIndex = matchEnd.index + matchEnd[0].length - 2
    // console.log('start letter: ', rawStr[startIndex])
    // console.log('ending letter: ', rawStr[endIndex])
    const name = rawStr.substring(startIndex, endIndex)
    // console.log('======: ', name)
    return name
  }
}
