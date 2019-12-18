<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    :class="{ sample: true, active }"
    :status="this.status"
    :sectionInfo="this.sectionInfo"
    @draw="draw"
    :active="active"
    @click.native="click"
  >
    <div class="imgContainer">
      <img :src="iconUrl" :id="imgSize" />
    </div>
    <bm-info-window
      :position="{ lng: this.position.lng, lat: this.position.lat }"
      :show="infoWindow.show"
      @close="infoWindowClose"
      @open="infoWindowOpen"
    >
      <p class="infoTitle">
        {{ infoWindow.infoTitle }}
      </p>
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
        <p>
          {{ infoWindow.alarmlogs }}
          {{ unitInfo.presetTimeHiddenCount }}
        </p>
      </div>
    </bm-info-window>
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
      }
    }
  },
  props: ['position', 'status', 'unitInfo'],
  components: {},
  created() {
    console.log('图标创建')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.infoTitle {
  font-size: 20px;
  font-weight: bold;
}
.infoContent {
  font-size: 12px;
  font-weight: 400;
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
