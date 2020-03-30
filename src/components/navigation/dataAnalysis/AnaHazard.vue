<!-- 数据分析组件 -->
<template>
  <div id="wrap">
    <el-row :gutter="20">
      <el-col :span="8">
        <div id="select">
          <el-select
            v-model="pieDistinguishResultData"
            @change="drawAnaPieDistinguishResult"
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
          </el-select>
        </div>
        <div class="grid-content bg-purple" ref="anaPieDistinguishResult" id="chart"></div>
      </el-col>
      <el-col :span="8">
        <div id="select">
          <el-select
            v-model="barAlarmCountResultData"
            @change="drawAnaBarAlarmCount"
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
          </el-select>
        </div>
        <div class="grid-content bg-purple" ref="anaBarAlarmCountResult" id="chart1"></div>
      </el-col>
      <el-col :span="8">
        <div id="select">
          <el-select
            v-model="barAlarmCountByUnitResultData"
            @change="drawAnaBarAlarmCountByUnit"
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
          </el-select>
        </div>
        <div class="grid-content bg-purple" ref="anaBarAlarmCountByUnitResult" id="chart2"></div>
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
    drawAnaPieDistinguishResult() {
      var myChart = this.$echarts.init(this.$refs.anaPieDistinguishResult)
      myChart.showLoading()
      this.$http
        .post('/anaDistinguishResult', {
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
              name: '掉线',
              value: res.data.drawOff
            })
            this.pieDistinguishResult.push({
              name: '故障',
              value: res.data.deviceFault
            })
            var option = {
              title: {
                text: '隐患设备分析',
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
                top: 30,
                bottom: 20,
                data: ['掉线', '故障']
              },
              series: [
                {
                  name: '结果分布',
                  type: 'pie',
                  radius: '40%',
                  center: ['50%', '50%'],
                  data: this.pieDistinguishResult,
                  label: {
                    show: true,
                    formatter: '{b}:{c}'
                  },
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
    drawAnaBarAlarmCount() {
      var myChart = this.$echarts.init(this.$refs.anaBarAlarmCountResult)
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
        .post('/anaBarAlarmCount', {
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
    drawAnaBarAlarmCountByUnit() {
      this.xAxis_unit = []
      this.barAlarmCountByUnitResult = []
      var myChart = this.$echarts.init(this.$refs.anaBarAlarmCountByUnitResult)
      myChart.showLoading()
      this.$http
        .post('/anaBarAlarmCountByUnit', {
          timeCode: this.barAlarmCountByUnitResultData
        })
        .then(res => {
          if (res.data) {
            var result = res.data
            console.log(this.result)
            this.barAlarmCountByUnitResult = Object.values(result)
            let total = 0
            this.barAlarmCountByUnitResult.forEach(val => {
              total = total + val
            })
            this.barAlarmCountByUnitResultTotal = total
            this.xAxis_unit = Object.keys(result)
            this.barAlarmCountByUnitResult = Object.values(result)
            console.log(this.xAxis_unit)
            console.log(this.barAlarmCountByUnitResultData)
            var option = {
              title: {
                text: '单位报警次数统计图',
                left: 'center'
              },
              grid: {
                containLabel: false,
                bottom: '40%'
              },
              tooltip: {},
              legend: {
                data: ['次数'],
                top: '40px',
                right: '10px'
              },
              xAxis: {
                type: 'category',
                axisLabel: {
                  interval: 0,
                  rotate: 90
                },
                data: this.xAxis_unit
              },
              yAxis: {},
              dataZoom: [
                {
                  id: 'dataZoomX',
                  type: 'slider',
                  xAxisIndex: [0],
                  filterModel: 'filter',
                  maxSpan: 45,
                  maxValueSpan: 12
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
          this.drawAnaPieDistinguishResult(),
          this.drawAnaBarAlarmCount(),
          this.drawAnaBarAlarmCountByUnit()
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
