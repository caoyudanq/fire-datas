<template>
<bm-overlay
  ref="customOverlay"
  pane='labelPane'
  :class="{sample: true, active}"
  @draw='draw'
  :active="active"
  @mouseover.native="handleMouseOver"
  @mouseleave.native="handleMouseLeave">
  <div class="imgContainer">
    <img :src="iconUrl" :id="imgSize">
  </div>
</bm-overlay>
</template>

<script>
export default {
  data () {
    return {
      active: false
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
      el.style.left = pixel.x - 32 + 'px'
      el.style.top = pixel.y - 64 + 'px'
    },
    handleMouseOver () {
      console.log('进入图标')
      this.active = true
    },
    handleMouseLeave () {
      console.log('离开图标')
      this.active = false
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
