<template>
  <div id="history">
    <div id="search">
      <span>单位名称：</span>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable
        style="width:300px"
        @change="change"
        size="small"
      ></el-input>
      <el-button @click="search" size="small">搜索</el-button>
      <span>{{ this.result }}</span>
    </div>
    <div id="data">
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

    <div id="pageIndex" class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="this.total"
        :current-page="this.pageIndex"
        :page-size="this.pageSize"
        @current-change="HandleCurrentPage"
        style="padding-left: 0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 100,
      pageSize: 10,
      pageIndex: 1,
      input: '',
      result: '',
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
  created() {
    this.getHistoryData()
  },
  methods: {
    HandleCurrentPage(val) {
      this.pageIndex = val
      console.log('pageIndex=' + this.pageIndex)
    },
    search() {
      console.log('点击search')
      this.HandleCurrentPage(1)
      if (this.input !== '') {
        this.getHistoryDataBySection()
      } else {
        this.getHistoryData()
      }
    },
    change() {
      this.HandleCurrentPage(1)
      if (this.input !== '') {
        this.getHistoryDataBySection()
      } else {
        this.getHistoryData()
      }
    },
    changeView() {
      console.log('changeView执行了')
      this.result = '没有查到数据'
    },
    getHistoryDataBySection() {
      this.$http
        .post('/queryAlarmLogBySearch', {
          section: this.input,
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
            // this.tableData = res.data.alarmLogVos
            this.pageSize = res.data.pageSize
            var pageNum = res.data.pageNum
            this.total = pageNum * this.pageSize
          } else {
            this.$message.error('按单位查询失败')
            this.changeView()
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
          this.pageSize = res.data.pageSize
          var pageNum = res.data.pageNum
          this.total = pageNum * this.pageSize
        })
        .catch(err => {
          console.log('报警日志查询失败')
          console.log(err)
        })
    }
  },
  watch: {
    pageIndex: function(newVal, oldVal) {
      if (this.input !== '') {
        console.log('最新请求的数据是第' + this.pageIndex + '页, 直接搜索')
        this.getHistoryDataBySection()
      } else {
        console.log('最新请求的数据是第' + this.pageIndex + '页, 按单位搜索')
        this.getHistoryData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#history {
  padding: 0 10px 0px 0;
  #search {
    line-height: 60px;
    color: aliceblue;
    background-color: rgb(30, 34, 34);
    width: 100%;
    height: 60px;
  }
}
</style>
