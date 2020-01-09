<template>
  <div id="container">
    <el-table
    :data="tableData"
    stripe=true
    id="table"
    max-height="700"
  >
    <el-table-column
      v-for="{ prop, label} in dataHeaders"
      :prop="prop"
      :label="label"
      :key="prop"
      :width=width>
    </el-table-column>
  </el-table>
  </div>
</template>

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
          prop: 'buildingName', label: '探测器名称'
        },
        {
          prop: 'result', label: '现场确认结果'
        },
        {
          prop: 'alarmTime', label: '报警时间'
        },
        {
          prop: 'classifyResult', label: '识别结果'
        }
      ],
      tableData: [],
      historyData: []
    }
  },
  props: ['pageIndex', 'dataType', 'section', 'total'],
  methods: {
    getHistoryDataBySection() {
      this.$http.get('/api/' + this.section + this.pageIndex)
        .then(res => {
          console.log('按单位获取历史日志')
          console.log(res.data)
          if (res.data.error === 0) {
            this.tableData = res.data.data
          } else {
            console.log('按单位获取历史日志失败')
            this.$emit('changeView')
          }
        })
    },
    getHistoryData() {
      this.$http.post('/queryAlarmLog', {
        curPage: this.pageIndex,
        pageSize: 10
      })
        .then(res => {
          console.log(res)
          this.historyData = res.data.data.alarmLogVos
          this.historyData.forEach(function(item) {
            var dt = new Date(item.alarmTime)
            // 获取年月日
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
          })
          this.tableData = this.historyData
          this.pageSize = res.data.data.pageSize
          var pageNum = res.data.data.pageNum
          if (this.total !== pageNum) {
            console.log('总页数改变, total = ' + pageNum)
            this.$emit('changeTotal', pageNum)
          }
        }).catch(err => {
          console.log('报警日志查询失败')
          console.log(err)
        })
    },
    getHistoryDataBySection1() {
      this.$http.post('queryAlarmLog', {
        curPage: this.pageIndex,
        pageSize: this.pageSize,
        unit: this.section
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 2000) {
            this.tableData = res.data.msg
            this.total = res.data.msg.pageNum
          } else {
            this.$Message.error('按单位查询失败')
            this.$emit('changeView')
          }
        }).catch(err => {
          console.log('按单位查询失败')
          console.log(err)
        })
    }
  },
  created() {
    console.log('historyData被创建了')
    console.log('pageIndex=' + this.pageIndex)
    if (this.dataType === 'firedatas') {
      this.getHistoryData()
      this.$emit(this.total)
    } else {
      this.getHistoryDataBySection()
      this.$emit(this.total)
    }
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      console.log('new:' + newVal + 'old:' + oldVal)
      console.log('请求的数据类型为：' + this.dataType)
      if (this.dataType === 'firedatas') {
        console.log('最新请求的数据是第' + this.pageIndex + '页')
        this.getHistoryData()
      } else {
        this.getHistoryDataBySection()
      }
    },
    dataType: function(newVal1, oldVal1) {
      console.log('new:' + newVal1)
      console.log('old:' + oldVal1)
      if (this.dataType === 'firedatas') {
        this.getHistoryData()
      } else {
        this.getHistoryDataBySection()
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
#table {
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
</style>
