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
    <div id="unitImage">
      <div id="imgContainer">
        <img :src="iconUrl" :id="imgSize" />
      </div>
      <el-tag type="info" color="#08304A" size="mini" :hit="true" effect="dark" style="color=">
        <span>{{ unitInfo.unitName }}</span>
      </el-tag>
    </div>
    <bm-info-window
      :position="{ lng: this.position.lng, lat: this.position.lat }"
      :show="infoWindow.show"
      @close="infoWindowClose"
      @open="infoWindowOpen"
    >
      <p id="infoTitle">{{ infoWindow.infoTitle }}</p>
      <div id="infoContent">
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
    <div id="alarmLogsDetailContains">
      <el-dialog
        title="最新报警记录"
        :center="true"
        :visible.sync="dialogTableVisibleAlarm"
        :modal-append-to-body="false"
        width="80%"
      >
        <el-table :data="alarmLogs" style="width: 100%">
          <el-table-column
            v-for="{ property, label} in infoAlarmLogs"
            :key="property"
            :property="property"
            :label="label"
          ></el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <div id="hiddenLogsDetailContains">
      <el-dialog
        title="最新隐患记录"
        :center="true"
        :visible.sync="dialogTableVisibleHidden"
        :modal-append-to-body="false"
        width="80%"
      >
        <el-table :data="hiddenLogs" style="width: 100%">
          <el-table-column
            :key="property"
            v-for="{property, label} in infoHiddenLogs"
            :property="property"
            :label="label"
          ></el-table-column>
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
      infoAlarmLogs: [
        {
          property: 'alarmTime',
          label: '报警时间'
        },
        {
          property: 'buildingName',
          label: '探测器名称'
        },
        {
          property: 'result',
          label: '现场确认结果'
        },
        {
          property: 'classifyResult',
          label: '识别结果'
        }
      ],
      infoHiddenLogs: [
        {
          property: 'alarmTime',
          label: '隐患报警时间'
        },
        {
          property: 'deviceName',
          label: '探测器名称'
        },
        {
          property: 'alarmFrequency',
          label: '报警次数'
        },
        {
          property: 'failType',
          label: '故障类型'
        },
        {
          property: 'resetStatus',
          label: '复位状态'
        },
        {
          property: 'resetTime',
          label: '复位时间'
        },
        {
          property: 'confirmResult',
          label: '现场确认结果'
        },
        {
          property: 'classifyResult',
          label: '识别结果'
        }
      ],
      alarmLogs: [],
      hiddenLogs: [],
      dialogTableVisibleAlarm: false,
      dialogTableVisibleHidden: false,
      dialogFormVisible: false
    }
  },
  props: ['position', 'status', 'unitInfo'],
  created() {
    console.log('unitInfo=')
    // console.log(this.unitInfo)
    this.unitInfo.alarmLogs.forEach(function(item) {
      item.alarmTime = this.COMMON.getTime(item.alarmTime)
    }, this)
    this.alarmLogs = this.unitInfo.alarmLogs
    this.unitInfo.hiddenLogs.forEach(function(item) {
      item.alarmTime = this.COMMON.getTime(item.alarmTime)
      item.resetTime = this.COMMON.getTime(item.resetTime)
    }, this)
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
#infoTitle {
  font-size: 20px;
  font-weight: bold;
}
#infoContent,
#alarmLogsDetailContains,
#hiddenLogsDetailContains {
  font-size: 12px;
  font-weight: 400;
}
.sample {
  height: 64px;
  width: 64px;
  position: absolute;
}
#unitImage {
  #imgContainer {
    height: 64px;
    width: 64px;
    margin: 0, auto;
  }
}
#littleImg {
  margin: 16px 8px 0px 8px;
}
#bigImg {
  margin: 0;
}
</style>
