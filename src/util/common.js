const URL = 'http://localhost:8083'
// const URL = 'http://222.20.78.79:8083/api'
const SUCCESS = '2000'
const NOUSER = '4001'
const NOUSERNAME = '4002'
const PASSWRONG = '4003'
const ALERT = '2000'
const NOALERT = '4001'
const USEREXIST = '4001'
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
function get12MonthArray() {
  var array = []
  for (var i = 12; i > 0; i--) {
    var dd = new Date()
    dd = new Date(dd.setMonth(dd.getMonth() + 1 - i))
    var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
    array.push(dd.getFullYear() + '-' + m)
  }
  return array
}
function get6MonthArray() {
  var array = []
  for (var i = 6; i > 0; i--) {
    var dd = new Date()
    dd = new Date(dd.setMonth(dd.getMonth() + 1 - i))
    var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
    array.push(dd.getFullYear() + '-' + m)
  }
  return array
}
function get1MonthArray() {
  var array = []
  // if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12){
  //   dayNum = 31
  // }
  // else if(month === 2){
  //   if(year % 4 === 0 && year % 100 !== 0){ // 普通闰年
  //     dayNum = 29
  //   }
  //   else if(year % 100 === 0 && year % 400 === 0) {
  //     dayNum = 29
  //   }
  //   else {
  //     dayNum = 28
  //   }
  // }
  // else {
  //   dayNum = 30
  // }
  for (var i = 30; i > 0; i--) {
    var dd = new Date()
    dd = new Date(dd.setDate(dd.getDate() - i))
    var d = dd.getDate() + 1 < 10 ? '0' + (dd.getDate() + 1) : dd.getDate() + 1
    array.push((dd.getMonth() + 1) + '-' + d)
  }
  return array
}
export default {
  URL,
  SUCCESS,
  NOUSER,
  NOUSERNAME,
  PASSWRONG,
  ALERT,
  NOALERT,
  USEREXIST,
  getTime,
  get12MonthArray,
  get6MonthArray,
  get1MonthArray
}
