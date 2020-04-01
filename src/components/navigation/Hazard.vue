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
      <el-table :data="tableData" height="400px" style="width: 100%">
        <el-table-column
          v-for="{ prop, label } in dataHeaders"
          :prop="prop"
          :label="label"
          :key="label"
          :show-overflow-tooltip="true"
        ></el-table-column>
      </el-table>
    </div>
    <!-- <hazard-data
      :pageIndex="this.pageIndex"
      :dataType="this.dataType"
      :section="this.input"
      @changeTotal="changeTotal"
      @changeView="changeView"
      @getTotal="getTotal"
    ></hazard-data>-->
    <div id="pageIndex" class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="this.pageIndex"
        :page-size="pageSize"
        @current-change="HandleCurrentPage"
        style="padding-left: 0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      total: 100,
      input: '',
      result: '',
      pageSize: 10,
      pageIndex: 1,
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
  created() {
    this.getHistoryData()
  },
  methods: {
    HandleCurrentPage(val) {
      this.pageIndex = val
      console.log('点击后pageIndex：' + this.pageIndex)
    },
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
          this.pageSize = res.data.pageSize
          this.total = pageNum * this.pageSize
          console.log(this.tableData)
        })
    },
    getHistoryDataBySection() {
      this.$http
        .post('/queryHiddenLogBySearch', {
          section: this.input,
          pageIndex: this.pageIndex
        })
        .then(res => {
          console.log('按单位获取历史日志')
          console.log(res.data)
          if (res.data.code === 2000) {
            this.hiddenData = res.data.hiddenLogVos
            this.hiddenData.forEach(function(item) {
              item.alarmTime = this.COMMON.getTime(item.alarmTime)
            }, this)
            this.tableData = this.hiddenData
            this.pageSize = res.data.pageSize
            var pageNum = res.data.pageNum
            this.total = pageNum * this.pageSize
          } else {
            this.$message.error('按单位查询失败')
            this.changeView()
          }
        })
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
    search() {
      console.log('点击search')
      this.HandleCurrentPage(1)
      if (this.input !== '') {
        this.getHistoryDataBySection()
      } else {
        this.getHistoryData()
      }
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
  padding: 0 10px 0 0;
  #search {
    line-height: 60px;
    color: aliceblue;
    color: aliceblue;
    background-color: rgb(30, 34, 34);
    width: 100%;
    height: 60px;
  }
}
</style>
