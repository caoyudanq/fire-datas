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
    <history-data :pageIndex="this.pageIndex"
    :dataType="this.dataType"
    :section="this.input"
    @changeView="changeView">
    </history-data>
    <div id="pageIndex" class="block">
      <el-pagination layout="prev, pager, next"
      :total="total"
      :current-page="this.pageIndex"
      @current-change="HandleCurrentPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import historyData from '@/components/navigation/HistoryData.vue'
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
  props: {},
  components: {
    historyData
  },
  created: {
  },
  methods: {
    HandleCurrentPage(val) {
      this.pageIndex = val
    },
    getCross() {
      this.$http.get('https://dss1.bdstatic.com/kvoZeXSm1A5BphGlnYG/newmusic/2000nian.png?v=md5')
        .then(res => {
          console.log(res.data)
        })
    },
    search() {
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
    }
  }
}
</script>

<style lang="scss" scoped>
#history {
  padding: 0 10px 10px 0;
  height: 100%;
  #search {
    line-height: 100px;
    color: aliceblue;
    background-color: rgb(30, 34, 34);
    width: 100%;
    height: 100px;
  }
  #pageIndex {
    height: 60px;
  }
}
</style>
