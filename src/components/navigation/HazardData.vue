<template>
  <el-table
    :data="tableData"
    height="600px"
    stripe=true
    style="width: 100%, max-height:600px"
    id="table"
  >
    <el-table-column prop="device" label="设备名称" :width=width>
    </el-table-column>
    <el-table-column prop="section" label="所属单位" :width=width>
    </el-table-column>
    <el-table-column prop="address" label="报警地址" :width=width>
    </el-table-column>
    <el-table-column prop="date" label="报警时间" :width=width>
    </el-table-column>
    <el-table-column prop="type" label="报警类型" :width=width>
    </el-table-column>
    <el-table-column prop="status" label="复位状态" :width=width>
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
      tableData: []
    }
  },
  props: ['pageIndex'],
  methods: {
    getHistoryData() {
      this.$http.get('/api/tableData' + this.myPageIndex)
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
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
