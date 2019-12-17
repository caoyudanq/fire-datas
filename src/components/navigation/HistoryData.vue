<template>
  <div id="container">
    <el-table
    :data="tableData"
    stripe=true
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 200,
      tableData: []
    }
  },
  props: ['pageIndex', 'dataType', 'section'],
  methods: {
    getHistoryData() {
      this.$http.get('/api/tableData' + this.pageIndex)
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
          console.log(this.tableData)
        })
    },
    getHistoryDataBySection() {
      this.$http.get('/api/' + this.section + this.pageIndex)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            console.log(res.data.data)
            this.tableData = res.data.data
          } else {
            this.$emit('changeView')
          }
        })
    }
  },
  created() {
    console.log('historyData被创建了')
    console.log('pageIndex=' + this.pageIndex)
    if (this.dataType === 'firedatas') {
      this.getHistoryData()
    } else {
      this.getHistoryDataBySection()
    }
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      console.log('new:' + newVal)
      console.log('old:' + oldVal)
      if (this.dataType === 'firedatas') {
        this.getHistoryData()
      } else {
        this.getHistoryDataBySection()
      }
    },
    dataType: function(newVal, oldVal) {
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
