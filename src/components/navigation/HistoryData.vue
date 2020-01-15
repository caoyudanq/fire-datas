<template>
  <div id="container">
    <el-table
    :data="tableData"
    max-height="600"
    >
      <el-table-column
        v-for="{prop, label} in dataHeaders"
        :prop="prop"
        :label="label"
        :key="prop"
        :width="width">
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
  props: ['pageIndex', 'dataType', 'section', 'total', 'pageSize'],
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
            item.alarmTime = this.COMMON.getTime(item.alarmTime)
          }, this)
          this.tableData = this.historyData
          var pageSize = res.data.data.pageSize
          var pageNum = res.data.data.pageNum
          var pageTotals = pageNum * pageSize
          if (this.total !== pageTotals || this.pageSize !== pageSize) {
            console.log('总页数改变, total = ' + pageTotals)
            this.$emit('changeTotal', pageTotals, pageSize)
          }
        }).catch(err => {
          console.log('报警日志查询失败')
          console.log(err)
        })
    },
    getHistoryDataBySection1() {
      this.$http.post('/queryAlarmLog', {
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
            this.$message.error('按单位查询失败')
            this.$emit('changeView')
          }
        }).catch(err => {
          console.log('按单位查询失败')
          console.log(err)
        })
    }
  },
  created() {
    // console.log('historyData被创建了')
    // console.log('pageIndex=' + this.pageIndex)
    if (this.dataType === 'firedatas') {
      this.getHistoryData()
    } else {
      this.getHistoryDataBySection()
    }
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      // console.log('new:' + newVal + 'old:' + oldVal)
      // console.log('请求的数据类型为：' + this.dataType)
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
  }
}
</script>

<style lang="scss" scoped>
</style>
