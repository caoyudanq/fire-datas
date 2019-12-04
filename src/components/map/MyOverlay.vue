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
  :show="infoWindow.show"
  @close="infoWindowClose"
  @open="infoWindowOpen">
    <p v-text="infoWindow.infoTitle" class="infoTitle"></p>
    <div class="infoContent">
    <p v-text="infoWindow.sectionName"></p>
    <p v-text="infoWindow.sectionLoction"></p>
    <p v-text="infoWindow.buildingName"></p>
    <p v-text="infoWindow.telephone"></p>
    </div>
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
        infoTitle: '单位信息',
        sectionName: '单位名称：',
        buildingName: '建筑物名称：',
        sectionLoction: '单位地址：',
        telephone: '电话：'

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
      this.infoWindow.show = true
      this.active = true
    },
    handleMouseLeave () {
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
