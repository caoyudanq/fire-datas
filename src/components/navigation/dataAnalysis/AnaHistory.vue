<!-- 数据分析组件 -->
<template>
  <div id="wrap">
    <el-row :gutter="20">
      <el-col :span="8">
        <div id="select">
          <el-select
            v-model="pieDistinguishResultData"
            @change="drawPieDistinguishResult"
            placeholder="近一年"
            size="mini"
            style="width: 30%"
          >
            <el-option
              v-for="(item, index) in time"
              :key="index"
              :label="item.range"
              :value="item.code"
            ></el-option>
          </el-select>报警次数：
          <span id="count">{{ pieDistinguishResultTotal }}</span>
        </div>
        <div class="grid-content bg-purple" ref="pieDistinguishResult" id="chart"></div>
      </el-col>
      <el-col :span="8">
        <div id="select">
          <el-select
            v-model="barAlarmCountResultData"
            @change="drawBarAlarmCount"
            placeholder="近一年"
            size="mini"
            style="width: 30%"
          >
            <el-option
              v-for="(item, index) in time"
              :key="index"
              :label="item.range"
              :value="item.code"
            ></el-option>
          </el-select>报警次数：
          <span id="count">{{ barAlarmCountResultTotal }}</span>
        </div>
        <div class="grid-content bg-purple" ref="barAlarmCountResult" id="chart1"></div>
      </el-col>
      <el-col :span="8">
        <div id="select">
          <el-select
            v-model="barAlarmCountByUnitResultData"
            @change="drawBarAlarmCountByUnit"
            placeholder="近一年"
            size="mini"
            style="width: 30%"
          >
            <el-option
              v-for="(item, index) in time"
              :key="index"
              :label="item.range"
              :value="item.code"
            ></el-option>
          </el-select>报警次数：
          <span id="count">{{ barAlarmCountByUnitResultTotal }}</span>
        </div>
        <div class="grid-content bg-purple" ref="barAlarmCountByUnitResult" id="chart2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: '',
      pieDistinguishResultData: '', // 饼图报警分析结果
      barAlarmCountResultData: '', // 柱状图按时间
      barAlarmCountByUnitResultData: '', // 柱状图按单位
      pieDistinguishResult: [],
      barAlarmCountResult: [],
      barAlarmCountByUnitResult: [],
      pieDistinguishResultTotal: '',
      barAlarmCountResultTotal: '',
      barAlarmCountByUnitResultTotal: '',
      time: [
        {
          range: '近一年',
          code: '近一年'
        },
        {
          range: '近半年',
          code: '近半年'
        },
        {
          range: '近一月',
          code: '近一月'
        }
      ],
      xAxis: [],
      xAxis_unit: []
    }
  },

  methods: {
    drawPieDistinguishResult() {
      var myChart = this.$echarts.init(this.$refs.pieDistinguishResult)
      myChart.showLoading()
      this.$http
        .post('/distinguishResult', {
          timeCode: this.pieDistinguishResultData
        })
        .then(res => {
          if (res.data) {
            let total = 0
            Object.values(res.data).forEach(val => {
              total = total + val
            })
            this.pieDistinguishResultTotal = total
            this.pieDistinguishResult = []
            this.pieDistinguishResult.push({
              name: '真实报警',
              value: res.data.realAlarmCount
            })
            this.pieDistinguishResult.push({
              name: '误报',
              value: res.data.falseAlarmCount
            })
            this.pieDistinguishResult.push({
              name: '自测',
              value: res.data.selfTestCount
            })
            var option = {
              title: {
                text: '系统报警分析',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 40,
                bottom: 20,
                data: ['真实报警', '误报', '自测']
              },
              series: [
                {
                  name: '识别结果',
                  type: 'pie',
                  radius: '40%',
                  center: ['50%', '50%'],
                  data: this.pieDistinguishResult,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
            myChart.hideLoading()
            myChart.setOption(option)
          } else {
            console.log('11111111111')
          }
        })
    },
    drawBarAlarmCount() {
      var myChart = this.$echarts.init(this.$refs.barAlarmCountResult)
      myChart.showLoading()
      if (
        this.barAlarmCountResultData === '近一年' ||
        this.barAlarmCountResultData === ''
      ) {
        this.xAxis = this.COMMON.get12MonthArray()
        // console.log('xAxis = ' + this.xAxis)
      } else if (this.barAlarmCountResultData === '近半年') {
        this.xAxis = this.COMMON.get6MonthArray()
        // console.log('xAxis = ' + this.xAxis)
      } else {
        this.xAxis = this.COMMON.get1MonthArray()
        // console.log('xAxis = ' + this.xAxis)
      }
      this.$http
        .post('/barAlarmCount', {
          timeCode: this.barAlarmCountResultData
        })
        .then(res => {
          if (res.data) {
            this.barAlarmCountResult = res.data
            var total = 0
            this.barAlarmCountResult.forEach(function(val, index, array) {
              total += val
            })
            this.barAlarmCountResultTotal = total
            var option = {
              title: {
                text: '报警次数统计图',
                left: 'center'
              },
              tooltip: {},
              legend: {
                data: ['次数'],
                top: '40px',
                right: '10px'
              },
              xAxis: {
                data: this.xAxis
              },
              yAxis: {},
              series: [
                {
                  name: '次数',
                  type: 'bar',
                  data: this.barAlarmCountResult
                }
              ]
            }
            myChart.hideLoading()
            myChart.setOption(option)
          } else {
            console.log('11111111111')
          }
        })
    },
    drawBarAlarmCountByUnit() {
      this.xAxis_unit = []
      this.barAlarmCountByUnitResult = []
      var myChart = this.$echarts.init(this.$refs.barAlarmCountByUnitResult)
      myChart.showLoading()
      this.$http
        .post('/barAlarmCountByUnit', {
          timeCode: this.barAlarmCountByUnitResultData
        })
        .then(res => {
          if (res.data) {
            var result = res.data
            console.log(result)
            this.xAxis_unit = Object.keys(result)
            this.barAlarmCountByUnitResult = Object.values(result)
            let total = 0
            this.barAlarmCountByUnitResult.forEach(val => {
              total = total + val
            })
            this.barAlarmCountByUnitResultTotal = total

            console.log('单位：')
            console.log(this.xAxis_unit)
            console.log('纵坐标：')
            console.log(this.barAlarmCountByUnitResult)
            var option = {
              title: {
                text: '单位报警次数统计图',
                left: 'center'
              },
              tooltip: {},
              legend: {
                data: ['次数'],
                top: '40px',
                right: '10px'
              },
              xAxis: {
                data: this.xAxis_unit
              },
              yAxis: {},
              dataZoom: [
                {
                  id: 'dataZoomX',
                  type: 'slider',
                  showDetail: false,
                  textStyle: {
                    color: '#777777',
                    fontWight: 'bolder'
                  },
                  xAxisIndex: [0],
                  filterModel: 'filter'
                },
                {
                  id: 'dataZoomY',
                  type: 'slider',
                  yAxisIndex: [0],
                  filterModel: 'empty'
                }
              ],
              series: [
                {
                  name: '次数',
                  type: 'bar',
                  data: this.barAlarmCountByUnitResult
                }
              ]
            }
            myChart.hideLoading()
            myChart.setOption(option)
          } else {
            console.log('11111111111')
          }
        })
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$http
        .all(
          this.drawPieDistinguishResult(),
          this.drawBarAlarmCount(),
          this.drawBarAlarmCountByUnit()
        )
        .catch(err => {
          console.log(err)
        })
    })
  }
}
</script>
<style lang="scss" scoped>
#wrap {
  padding-right: 10px;
}
#select {
  height: 40px;
  color: #ffffff;
  font-size: 15px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 400px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
