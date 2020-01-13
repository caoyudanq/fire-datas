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
    <hazard-data :pageIndex="this.pageIndex"
    @changeTotal="changeTotal">
    </hazard-data>
    <div id="pageIndex" class="block">
      <el-pagination layout="prev, pager, next"
      :total="total"
      @current-change="HandleCurrentPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import hazardData from '@/components/navigation/HazardData.vue'
export default {
  name: '',
  data() {
    return {
      total: 100,
      pageIndex: 1,
      dataType: 'firedatas',
      input: '',
      result: ''
    }
  },
  components: {
    hazardData
  },
  methods: {
    HandleCurrentPage(val) {
      this.pageIndex = val
      console.log('点击后pageIndex：' + this.pageIndex)
    },
    changeTotal(val) {
      console.log('隐患日志total更新,val = ' + val)
      this.total = val
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
    }
  }
}
</script>

<style lang="scss" scoped>
#history {
  padding: 0 10px 10px 0;
  #search {
    line-height: 100px;
    color: aliceblue;
  }
}
#search {
  color: aliceblue;
  background-color: rgb(30, 34, 34);
  width: 100%;
  height: 100px;
}
</style>
