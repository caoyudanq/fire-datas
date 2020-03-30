<template>
  <div id="container">
    <el-table :data="tableData" max-height="400" height="400px">
      <el-table-column
        v-for="{ prop, label } in dataHeaders"
        :prop="prop"
        :label="label"
        :key="prop"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: '',
      myTotal: '',
      dataHeaders: [
        {
          prop: 'unit',
          label: '单位名称'
        },
        {
          prop: 'buildingName',
          label: '探测器名称'
        },
        {
          prop: 'result',
          label: '现场确认结果'
        },
        {
          prop: 'alarmTime',
          label: '报警时间'
        },
        {
          prop: 'classifyResult',
          label: '识别结果'
        }
      ],
      tableData: [],
      historyData: []
    }
  },
  props: ['pageIndex', 'dataType', 'section', 'total', 'pageSize'],
  methods: {
    getHistoryDataBySection() {
      this.$http
        .post('/queryAlarmLogBySearch', {
          section: this.section,
          pageIndex: this.pageIndex
        })
        .then(res => {
          console.log('按单位获取历史日志')
          console.log(res.data)
          if (res.data.code === 2000) {
            this.historyData = res.data.alarmLogVos
            this.historyData.forEach(function(item) {
              item.alarmTime = this.COMMON.getTime(item.alarmTime)
            }, this)
            this.tableData = this.historyData
            this.tableData = res.data.alarmLogVos
            var pageSize = res.data.pageSize
            var pageNum = res.data.pageNum
            var pageTotals = pageNum * pageSize
            if (this.total !== pageTotals || this.pageSize !== pageSize) {
              console.log('总页数改变, total = ' + pageTotals)
              this.$emit('changeTotal', pageTotals, pageSize)
            }
          } else {
            this.$message.error('按单位查询失败')
            this.$emit('changeView')
          }
        })
    },
    getHistoryData() {
      this.$http
        .post('/queryAlarmLog', {
          curPage: this.pageIndex,
          pageSize: 10
        })
        .then(res => {
          console.log(res)
          this.historyData = res.data.alarmLogVos
          this.historyData.forEach(function(item) {
            item.alarmTime = this.COMMON.getTime(item.alarmTime)
          }, this)
          this.tableData = this.historyData
          var pageSize = res.data.pageSize
          var pageNum = res.data.pageNum
          var pageTotals = pageNum * pageSize
          if (this.total !== pageTotals || this.pageSize !== pageSize) {
            console.log('总页数改变, total = ' + pageTotals)
            this.$emit('changeTotal', pageTotals, pageSize)
          }
        })
        .catch(err => {
          console.log('报警日志查询失败')
          console.log(err)
        })
    }
  },
  created() {
    console.log('historyData被创建了')
    // console.log('pageIndex=' + this.pageIndex)
    if (this.dataType === 'firedatas') {
      this.getHistoryData()
    } else {
      console.log('区域搜索')
      this.getHistoryDataBySection()
    }
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      // console.log('new:' + newVal + 'old:' + oldVal)
      // console.log('请求的数据类型为：' + this.dataType)
      if (this.dataType === 'firedatas') {
        console.log('最新请求的数据是第' + this.pageIndex + '页, 直接搜索')
        this.getHistoryData()
      } else {
        console.log('最新请求的数据是第' + this.pageIndex + '页, 按单位搜索')
        this.getHistoryDataBySection()
      }
    },
    dataType: function(newVal1, oldVal1) {
      console.log('new:' + newVal1 + 'old:' + oldVal1)
      if (this.dataType === 'firedatas') {
        console.log('最新请求的数据是第' + this.pageIndex + '页, 直接搜索')
        this.getHistoryData()
      } else {
        console.log('最新请求的数据是第' + this.pageIndex + '页, 按单位搜索')
        this.getHistoryDataBySection()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
