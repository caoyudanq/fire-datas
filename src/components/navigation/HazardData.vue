<template>
  <el-table
    :data="tableData"
    height="600px"
    stripe=true
    style="width: 100%, max-height:600px"
    id="table"
  >
    <el-table-column
       v-for="{ prop, label} in dataHeaders"
      :prop="prop"
      :label="label"
      :key="prop"
      :width=width>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
#table {
  justify-content: space-between
}
</style>

<script>
export default {
  data() {
    return {
      width: 200,
      dataHeaders: [
        {
          prop: 'unit', label: '单位名称'
        },
        {
          prop: 'deviceName', label: '探测器名称'
        },
        {
          prop: 'failType', label: '故障类型'
        },
        {
          prop: 'alarmTime', label: '报警时间'
        },
        {
          prop: 'resetStatus', label: '是否复位'
        },
        {
          prop: 'resetTime', label: '复位时间'
        },
        {
          prop: 'confirmResult', label: '是否确认'
        },
        {
          prop: 'classifyResult', label: '识别结果'
        }
      ],
      tableData: [],
      hiddenData: []
    }
  },
  props: ['pageIndex', 'dataType', 'section', 'total'],
  methods: {
    getHistoryData() {
      this.$http.post('/queryHiddenLog', {
        curPage: this.pageIndex,
        pageSize: 10
      })
        .then(res => {
          this.hiddenData = res.data.data.hiddenLogVos
          this.hiddenData.forEach(function(item) {
            var dt = new Date(item.alarmTime)
            var y = dt.getFullYear()
            var m = (dt.getMonth() + 1).toString().padStart(2, '0')
            var d = dt
              .getDate()
              .toString()
              .padStart(2, '0')
            var hh = dt
              .getHours()
              .toString()
              .padStart(2, '0')
            var mm = dt
              .getMinutes()
              .toString()
              .padStart(2, '0')
            var ss = dt
              .getSeconds()
              .toString()
              .padStart(2, '0')
            item.alarmTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
            var dt1 = new Date(item.resetTime)
            // 获取年月日
            var y1 = dt1.getFullYear()
            var m1 = (dt1.getMonth() + 1).toString().padStart(2, '0')
            var d1 = dt1
              .getDate()
              .toString()
              .padStart(2, '0')
            var hh1 = dt1
              .getHours()
              .toString()
              .padStart(2, '0')
            var mm1 = dt1
              .getMinutes()
              .toString()
              .padStart(2, '0')
            var ss1 = dt1
              .getSeconds()
              .toString()
              .padStart(2, '0')
            item.resetTime = `${y1}-${m1}-${d1} ${hh1}:${mm1}:${ss1}`
          })
          this.tableData = this.hiddenData
          var pageNum = res.data.data.pageNum
          if (this.total !== pageNum) {
            console.log('总页数改变, total = ' + pageNum)
            this.$emit('changeTotal', pageNum)
          }
          console.log(this.tableData)
        })
    }
  },
  created() {
    console.log('historyData被创建了')
    console.log('pageIndex=' + this.pageIndex)
    console.log('myPageIndex=' + this.myPageIndex)
    this.getHistoryData()
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      console.log('new:' + newVal)
      console.log('old:' + oldVal)
      this.myPageIndex = newVal
      this.getHistoryData()
    }
  },
  computed: {
    myPageIndex: function() {
      return this.pageIndex
    }
  }
}
</script>
