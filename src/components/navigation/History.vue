<template>
  <div id="history">
    <div id="search">
      <span>单位名称：</span>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable
        style="width:300px"
        @keyup.enter.native="search">
        </el-input>
        <el-button @click="search">搜索</el-button>
        <span>{{ this.result }}</span>
    </div>
    <div id="data">
      <history-data
      :pageIndex="this.pageIndex"
      :dataType="this.dataType"
      :section="this.input"
      @changeTotal="changeTotal"
      @changeView="changeView"
      @getTotal="getTotal">
      </history-data>
    </div>

    <div id="pageIndex" class="block">
      <el-pagination layout="prev, pager, next"
      :total="this.total"
      :pageSize="this.pageSize"
      :current-page="this.pageIndex"
      :page-size="this.pageSize"
      @current-change="HandleCurrentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import historyData from '@/components/navigation/HistoryData.vue'
export default {
  data() {
    return {
      total: 100,
      pageSize: 10,
      pageIndex: 1,
      dataType: 'firedatas',
      input: '',
      result: ''
    }
  },
  components: {
    historyData
  },
  methods: {
    HandleCurrentPage(val) {
      this.pageIndex = val
      console.log('pageIndex=' + this.pageIndex)
    },
    search() {
      if (this.result !== null) {
        this.result = null
      }
      console.log('点击search')
      this.HandleCurrentPage(1)
      if (this.input !== '') {
        this.dataType = 'firedatasBySection'
      } else {
        this.dataType = 'firedatas'
      }
    },
    changeView() {
      console.log('changeView执行了')
      this.result = '没有查到数据'
    },
    getTotal(val) {
      this.total = val
    },
    changeTotal(total, pageSize) {
      console.log('total更新,total = ' + total + 'pageSize=' + pageSize)
      this.total = total
      this.pageSize = pageSize
    }
  }
}
</script>

<style lang="scss" scoped>
#history {
  padding: 0 10px 0px 0;
  #search {
    line-height: 100px;
    color: aliceblue;
    background-color: rgb(30, 34, 34);
    width: 100%;
    height: 100px;
  }
  #data {
    width: 100%;
  }
  #pageIndex {
    height: 32px;
    width: 100%
  }
}
</style>
