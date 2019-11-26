<template>
<bm-overlay
  ref="customOverlay"
  pane='labelPane'
  :class="{sample: true, active}"
  @draw='draw'
  :active="active">
  <div class="imgContainer"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave">
    <img :src="iconUrl" :id="imgSize">
  </div>
  <bm-info-window
  :position="{lng: this.position.lng, lat: this.position.lat}"
  title="火警信息"
  :show="infoWindow.show"
  @close="infoWindowClose"
  @open="infoWindowOpen">
    <p v-text="infoWindow.contents"></p>
  </bm-info-window>
</bm-overlay>
</template>

<script>
export default {
  data () {
    return {
      active: false,
      infoWindow: {
        show: false,
        contents: '设备编号'
      }
    }
  },
  props: ['position'],
  components: {
  },
  computed: {
    iconUrl: function () {
      return this.active ? require('../../assets/location-big.svg') : require('../../assets/location.svg')
    },
    imgSize: function () {
      return this.active ? 'bigImg' : 'littleImg'
    }
  },
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw ({ el, BMap, map, overlay }) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 64 + 'px'
      el.style.top = pixel.y + 'px'
    },
    handleMouseOver () {
      console.log('进入图标')
      this.infoWindow.show = true
      this.active = true
    },
    handleMouseLeave () {
      console.log('离开图标')
      this.infoWindow.show = false
      this.active = false
    },
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.sample {
  height: 64px;
  width: 64px;
  position: absolute;
}
.imgContainer{
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
