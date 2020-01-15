<template>
  <div id="time">{{ this.date }}</div>
</template>

<script>
export default {
  data() {
    return {
      date: ''
    }
  },
  created() {
    this.getTime()
  },
  // mounted: function() {
  //   console.log('实力挂载')
  //   var _this = this //  声明一个变量指向Vue实例this，保证作用域一致
  //   this.timer = setInterval(function() {
  //     // 设置定时器，每秒执行一次function函数，
  //     // 函数是获取当前时间并给date变量赋值(每秒赋值一次)
  //     _this.date = new Date() // 修改数据date
  //   }, 1000)
  // },
  methods: {
    getTime() {
      console.log('实力创建')
      var _this = this //  声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function() {
        // 设置定时器，每秒执行一次function函数，
        // 函数是获取当前时间并给date变量赋值(每秒赋值一次)
        var dt = new Date()
        var hour = dt
          .getHours()
          .toString()
          .padStart(2, '0')
        var minute = dt
          .getMinutes()
          .toString()
          .padStart(2, '0')
        var second = dt
          .getSeconds()
          .toString()
          .padStart(2, '0')
        _this.date = `${hour}:${minute}:${second}`
      }, 1000)
    }
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除定时器
    }
  }
}
</script>

<style lang="scss" scoped>
// #time {
//   display: block;
// }
</style>
