<template>
  <div id="history">
    <div id="search">
      <span>设备编号：</span>
      <span>
      <el-input
        type="text"
        placeholder="编号"
      ></el-input>
      </span>
    </div>
    <history-data></history-data>
    <div id="pageIndex" class="block">
      <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </div>
</template>

<script>
import historyData from '@/components/navigation/HistoryData.vue'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  components: {
    historyData
  },
  mounted() {},
  methods: {}
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
