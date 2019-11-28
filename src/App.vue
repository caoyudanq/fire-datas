<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="block">
          <span>火警物联网</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            text-color="#fff"
            active-text-color="#ffd04b"
            background-color="#0f334b"
            router="true"
          >
            <el-menu-item index="history">
              <i class="el-icon-menu"></i>
              <span slot="title">历史日志</span>
            </el-menu-item>
            <el-menu-item index="analysis">
              <i class="el-icon-setting"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>
            <el-menu-item index="hazard">
              <i class="el-icon-document"></i>
              <span slot="title">隐患日志</span>
            </el-menu-item>
            <el-menu-item index="others" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">其他</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    const item = {}
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #0f334b;
  text-align: center;
  color: #fff;
  line-height: 60px;
}
.el-aside {
  background-color: #0f334b;
}
.el-main {
  background-color: #021019;
  padding: 10px 0px 0px 10px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  list-style: none;
  position: relative;
  color: #fff;
  margin: 0;
  padding-left: 0;
  border: 0px;
}
.el-menu-vertical-demo .el-menu {
  background-color: #0f334b !important;
}
.el-menu-item-group__title {
  line-height: normal;
  font-size: 12px;
  color: #909399;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
