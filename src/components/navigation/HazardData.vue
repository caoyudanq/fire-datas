<template>
  <el-table :data="tableData" height="400px" style="width: 100%">
    <el-table-column
      v-for="{ prop, label } in dataHeaders"
      :prop="prop"
      :label="label"
      :key="label"
      :show-overflow-tooltip="true"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      dataHeaders: [
        {
          prop: 'unit',
          label: '单位名称',
          width: '20px'
        },
        {
          prop: 'deviceName',
          label: '探测器名称',
          width: '20px'
        },
        {
          prop: 'failType',
          label: '故障类型',
          width: '20px'
        },
        {
          prop: 'alarmTime',
          label: '报警时间',
          width: '20px'
        },
        {
          prop: 'resetStatus',
          label: '是否复位',
          width: '20px'
        },
        {
          prop: 'resetTime',
          label: '复位时间',
          width: '20px'
        },
        {
          prop: 'confirmResult',
          label: '是否确认',
          width: '20px'
        },
        {
          prop: 'classifyResult',
          label: '识别结果',
          width: '20px'
        }
      ],
      tableData: [],
      hiddenData: []
    }
  },
  props: ['pageIndex', 'dataType', 'section', 'total', 'pageSize'],
  methods: {
    getHistoryData() {
      this.$http
        .post('/queryHiddenLog', {
          curPage: this.pageIndex,
          pageSize: 10
        })
        .then(res => {
          this.hiddenData = res.data.hiddenLogVos
          this.hiddenData.forEach(function(item) {
            item.resetTime = this.COMMON.getTime(item.resetTime)
            item.alarmTime = this.COMMON.getTime(item.alarmTime)
          }, this)
          this.tableData = this.hiddenData
          var pageNum = res.data.pageNum
          var pageSize = res.data.pageSize
          if (this.total !== pageNum || this.pageSize !== pageSize) {
            console.log('总页数改变, total = ' + pageNum)
            this.$emit('changeTotal', pageNum, pageSize)
          }
          console.log(this.tableData)
        })
    }
  },
  created() {
    this.getHistoryData()
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      // console.log('new:' + newVal)
      // console.log('old:' + oldVal)
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

<style lang="scss" scoped></style>
