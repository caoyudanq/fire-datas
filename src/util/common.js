// const URL = '/api'
// const URL = 'http://445cd02a.ngrok.io/'
const URL = 'http://222.20.78.79:8083/api'
const SUCCESS = '2000'
const NOUSER = '4001'
const NOUSERNAME = '4002'
const PASSWRONG = '4003'
function getTime(timeStamp) {
  if (timeStamp === 0) {
    return 0
  }
  var millisecond = 1000 * timeStamp
  var dt = new Date(millisecond)
  var year = dt.getFullYear()
  var month = (dt.getMonth() + 1).toString().padStart(2, '0')
  var day = dt.getDate().toString().padStart(2, '0')
  var hour = dt.getHours().toString().padStart(2, '0')
  var minute = dt.getMinutes().toString().padStart(2, '0')
  var second = dt.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
export default {
  URL,
  SUCCESS,
  NOUSER,
  NOUSERNAME,
  PASSWRONG,
  getTime
}
