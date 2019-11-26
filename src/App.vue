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
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            text-color="#fff"
            active-text-color="#ffd04b"
            background-color="#0f334b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-data-analysis"></i>
                <span>数据分析</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>历史记录</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view name="map"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    const item = {
    }
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
