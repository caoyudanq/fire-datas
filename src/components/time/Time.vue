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
  methods: {
    getTime() {
      // console.log('实力创建')
      var _this = this //  声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function() {
        // 设置定时器，每秒执行一次function函数，
        // 函数是获取当前时间并给date变量赋值(每秒赋值一次)
        var dt = new Date()
        var year = dt.getFullYear()
        var month = (dt.getMonth() + 1).toString().padStart(2, '0')
        var day = dt
          .getDate()
          .toString()
          .padStart(2, '0')
        var date = dt.getDay().toString()
        var cn = ['一', '二', '三', '四', '五', '六', '日']
        if (date === '1') {
          date = cn[0]
        } else if (date === '2') {
          date = cn[1]
        } else if (date === '3') {
          date = cn[2]
        } else if (date === '4') {
          date = cn[3]
        } else if (date === '5') {
          date = cn[4]
        } else if (date === '6') {
          date = cn[5]
        } else {
          date = cn[6]
        }
        var yearTime = `${year}年${month}月${day}日   星期${date}`
        _this.date = yearTime // 修改数据date
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

<style lang="scss" scoped></style>
