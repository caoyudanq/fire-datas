<template>
  <el-table
    :data="tableData"
    height="600px"
    stripe=true
    style="width: 100%,   max-height:600px"
    id="table"
  >
    <el-table-column prop="device" label="设备名称" :width=width>
    </el-table-column>
    <el-table-column prop="section" label="所属单位" :width=width>
    </el-table-column>
    <el-table-column prop="address" label="报警地址" :width=width>
    </el-table-column>
    <el-table-column prop="date" label="报警时间" :width=width>
    </el-table-column>
    <el-table-column prop="type" label="报警类型" :width=width>
    </el-table-column>
    <el-table-column prop="status" label="复位状态" :width=width>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
#table {
  justify-content: space-between
}
</style>

<script>
export default {
  methods: {
  },
  data() {
    return {
      width: 200,
      tableData: [
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          device: '住院楼地下室清洗室6H31D',
          section: '江山贝林医院',
          type: '火警',
          date: '2016-05-02',
          status: '未复位',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  }
}
</script>
