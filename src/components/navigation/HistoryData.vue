<template>
  <div id="container">
    <el-table
    :data="tableData"
    stripe=true
    id="table"
  >
    <el-table-column prop="unit" label="单位名称" :width=width>
    </el-table-column>
    <el-table-column prop="buildingName" label="探测器名称" :width=width>
    </el-table-column>
    <el-table-column prop="result" label="现场确认结果" :width=width>
    </el-table-column>
    <el-table-column prop="classifyResult" label="识别结果" :width=width>
    </el-table-column>
    <el-table-column prop="alarmTime" label="报警时间" :width=width>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 200,
      tableData: [],
      total: 0
    }
  },
  props: ['pageIndex', 'dataType', 'section'],
  methods: {
    // getHistoryData() {
    //   this.$http.get('/api/tableData' + this.pageIndex)
    //     .then(res => {
    //       if (res.data.errno === 0) {
    //         console.log('获取历史日志')
    //         console.log(res.data)
    //         this.tableData = res.data.data
    //       } else {
    //         console.log('获取历史日志失败')
    //         // this.$emit('changeView')
    //       }
    //     })
    // },
    // getHistoryDataBySection() {
    //   this.$http.get('/api/' + this.section + this.pageIndex)
    //     .then(res => {
    //       console.log('按单位获取历史日志')
    //       console.log(res.data)
    //       if (res.data.error === 0) {
    //         this.tableData = res.data.data
    //       } else {
    //         console.log('按单位获取历史日志失败')
    //         this.$emit('changeView')
    //       }
    //     })
    // },
    getHistoryData1() { // TO-DO时间戳转换
      this.$http.post('/queryAlarmLog', {
        curPage: 1,
        pageSize: 10
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data.alarmLogVos
          this.total = res.data.pageNum
          // if (res.data.code === 2000) {
          //   this.tableData = res.data.msg
          //   this.total = res.data.msg.pageNum
          // } else {
          //   this.$message.error('查询失败')
          //   // this.$emit('changeView')
          // }
        }).catch(err => {
          console.log('查询失败')
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
      this.getHistoryData1()
      this.$emit(this.total)
    } else {
      this.getHistoryDataBySection1()
      this.$emit(this.total)
    }
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      console.log('new:' + newVal)
      console.log('old:' + oldVal)
      if (this.dataType === 'firedatas') {
        this.getHistoryData1()
      } else {
        this.getHistoryDataBySection1()
      }
    },
    dataType: function(newVal1, oldVal1) {
      console.log('new:' + newVal1)
      console.log('old:' + oldVal1)
      if (this.dataType === 'firedatas') {
        this.getHistoryData1()
      } else {
        this.getHistoryDataBySection1()
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
