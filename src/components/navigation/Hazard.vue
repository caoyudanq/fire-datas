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
    <history-data :pageIndex="this.pageIndex"></history-data>
    <div id="pageIndex" class="block">
      <el-pagination layout="prev, pager, next"
      :total="total"
      @current-change="HandleCurrentPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import historyData from '@/components/navigation/HazardData.vue'
export default {
  name: '',
  data() {
    return {
      total: 100,
      pageIndex: 1
    }
  },
  props: {},
  components: {
    historyData
  },
  created: {
  },
  methods: {
    HandleCurrentPage(val) {
      this.pageIndex = val
      console.log('点击后pageIndex：' + this.pageIndex)
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
