import regExpTemplate from '../const/regExpTemplate'

export default {
  decodeUrlSafeBase64: (rawStr) => {
    return atob(rawStr.replace(/\-/g, '+').replace(/\_/g, '/'))
  },
  getSubstringByRegExp: (templateMode, rawStr) => {
    // console.log('templateMode: ', templateMode)
    // console.log('rawStr: ', rawStr)
    const template = regExpTemplate[templateMode]
    const matchStart = template.startMode.exec(rawStr)
    const matchEnd = template.endMode.exec(rawStr)
    const startIndex = matchStart.index + matchStart[0].length + 1
    const endIndex = matchEnd.index + matchEnd[0].length - 2
    // console.log('start letter: ', rawStr[startIndex])
    // console.log('ending letter: ', rawStr[endIndex])
    const name = rawStr.substring(startIndex, endIndex)
    // console.log('======: ', name)
    return name
  }
}
