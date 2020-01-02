<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    :class="{ sample: true, active }"
    :status="this.status"
    @draw="draw"
    :active="active"
    @click.native="click"
  >
    <div class="imgContainer">
      <img :src="iconUrl" :id="imgSize" />
    </div>
    <p id="unitName">{{ unitInfo.unitName }}</p>
    <bm-info-window
      :position="{ lng: this.position.lng, lat: this.position.lat }"
      :show="infoWindow.show"
      @close="infoWindowClose"
      @open="infoWindowOpen"
    >
      <p class="infoTitle">{{ infoWindow.infoTitle }}</p>
      <div class="infoContent">
        <p>
          {{ infoWindow.unitName }}
          {{ unitInfo.unitName }}
        </p>
        <p>
          {{ infoWindow.presetTimeAlarmCount }}
          {{ unitInfo.presetTimeAlarmCount }}
        </p>
        <p>
          {{ infoWindow.presetTimeHiddenCount }}
          {{ unitInfo.presetTimeHiddenCount }}
        </p>
        <div>
          <p>
            {{ infoWindow.alarmlogs }}
            <el-button type="text" @click="alarmlogsDetail">详情</el-button>
          </p>
        </div>
        <div>
          <p>
            {{ infoWindow.hiddenlogs }}
            <el-button type="text" @click="hiddenlogsDetail">详情</el-button>
          </p>
        </div>
      </div>
    </bm-info-window>
    <div id="alarmlogsDetailContains">
      <el-dialog title="最新报警记录" :visible.sync="dialogTableVisibleAlarm" :modal-append-to-body="false">
        <el-table :data="alarmLogs">
          <el-table-column property="alarmTime" label="报警时间" width="150"></el-table-column>
          <el-table-column property="buildingName" label="探测器名称" width="200"></el-table-column>
          <el-table-column property="result" label="现场确认结果" width></el-table-column>
          <el-table-column property="classifyResult" label="识别结果" width></el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <div id="alarmlogsDetailContains">
      <el-dialog title="最新隐患记录" :visible.sync="dialogTableVisibleHidden" :modal-append-to-body="false">
        <el-table :data="hiddenLogs">
          <el-table-column property="alarmTime" label="隐患报警时间" width="150"></el-table-column>
          <el-table-column property="deviceName" label="探测器名称" width="150"></el-table-column>
          <el-table-column property="alarmFrequency" label="报警次数" width="100"></el-table-column>
          <el-table-column property="failType" label="故障类型" width="80"></el-table-column>
          <el-table-column property="resetStatus" label="复位状态" width="100"></el-table-column>
          <el-table-column property="resetTime" label="复位时间" width="150"></el-table-column>
          <el-table-column property="confirmResult" label="现场确认结果" width="100"></el-table-column>
          <el-table-column property="classifyResult" label="识别结果" width="100"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      infoWindow: {
        show: false,
        infoTitle: '单位信息',
        unitName: '单位名称：',
        presetTimeAlarmCount: '30分钟内报警：',
        presetTimeHiddenCount: '30分钟内隐患：',
        alarmlogs: '最新报警记录：',
        hiddenlogs: '最新隐患记录：'
      },
      alarmLogs: [],
      hiddenLogs: [],
      dialogTableVisibleAlarm: false,
      dialogTableVisibleHidden: false,
      dialogFormVisible: false
    }
  },
  props: ['position', 'status', 'unitInfo'],
  components: {},
  created() {
    console.log('unitInfo=')
    console.log(this.unitInfo)
    this.unitInfo.alarmLogs.forEach(function(item) {
      var dt = new Date(item.alarmTime)
      // 获取年月日
      var y = dt.getFullYear()
      var m = (dt.getMonth() + 1).toString().padStart(2, '0')
      var d = dt
        .getDate()
        .toString()
        .padStart(2, '0')
      var hh = dt
        .getHours()
        .toString()
        .padStart(2, '0')
      var mm = dt
        .getMinutes()
        .toString()
        .padStart(2, '0')
      var ss = dt
        .getSeconds()
        .toString()
        .padStart(2, '0')
      item.alarmTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    })
    this.alarmLogs = this.unitInfo.alarmLogs
    this.unitInfo.hiddenLogs.forEach(function(item) {
      var dt = new Date(item.alarmTime)
      var y = dt.getFullYear()
      var m = (dt.getMonth() + 1).toString().padStart(2, '0')
      var d = dt
        .getDate()
        .toString()
        .padStart(2, '0')
      var hh = dt
        .getHours()
        .toString()
        .padStart(2, '0')
      var mm = dt
        .getMinutes()
        .toString()
        .padStart(2, '0')
      var ss = dt
        .getSeconds()
        .toString()
        .padStart(2, '0')
      item.alarmTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    })
    this.unitInfo.hiddenLogs.forEach(function(item) {
      var dt = new Date(item.resetTime)
      var y = dt.getFullYear()
      var m = (dt.getMonth() + 1).toString().padStart(2, '0')
      var d = dt
        .getDate()
        .toString()
        .padStart(2, '0')
      var hh = dt
        .getHours()
        .toString()
        .padStart(2, '0')
      var mm = dt
        .getMinutes()
        .toString()
        .padStart(2, '0')
      var ss = dt
        .getSeconds()
        .toString()
        .padStart(2, '0')
      item.resetTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    })
    this.hiddenLogs = this.unitInfo.hiddenLogs
  },
  computed: {
    iconUrl: function() {
      if (this.status === 1) {
        return this.active
          ? require('../../assets/location-big-red.svg')
          : require('../../assets/location-red.svg')
      } else if (this.status === 2) {
        return this.active
          ? require('../../assets/location-big-yellow.svg')
          : require('../../assets/location-yellow.svg')
      } else {
        return this.active
          ? require('../../assets/location-big-green.svg')
          : require('../../assets/location-green.svg')
      }
    },
    imgSize: function() {
      return this.active ? 'bigImg' : 'littleImg'
    }
  },
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw({ el, BMap, map, overlay }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 64 + 'px'
      el.style.top = pixel.y + 'px'
    },
    infoWindowClose(e) {
      this.infoWindow.show = false
      this.active = false
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true
    },
    click() {
      console.log('点击标志物')
      this.infoWindow.show = true
      this.active = true
    },
    hiddenlogsDetail() {
      this.dialogTableVisibleHidden = true
      console.log('隐患日志')
      this.infoWindow.show = false
    },
    alarmlogsDetail() {
      this.dialogTableVisibleAlarm = true
      this.infoWindow.show = false
      console.log('报警日志')
    }
  }
}
</script>

<style lang="scss" scoped>
#unitName {
  background-color: antiquewhite;
  font-size: 12px;
  margin: 0 0 0 20px;
  width: 120px;
}
.infoTitle {
  font-size: 20px;
  font-weight: bold;
}
.infoContent {
  font-size: 12px;
  font-weight: 400;
  #detail {
    margin: 0 0 0 10px;
  }
}
.sample {
  height: 64px;
  width: 64px;
  position: absolute;
}
.imgContainer {
  height: 64px;
  width: 64px;
}
#littleImg {
  margin: 16px 8px 0px 8px;
}
#bigImg {
  margin: 0;
}
</style>
