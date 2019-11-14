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
    <img :src="iconUrl">
  </div>
</bm-overlay>
</template>

<script>
export default {
  data () {
    return {
      iconWidth: 48,
      iconHeight: 48,
      active: false
    }
  },
  props: ['position'],
  components: {
  },
  mounted () {

  },
  computed: {
    iconUrl: function () {
      return this.active ? require('../../assets/location.png') : require('../../assets/location-big.png')
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
      el.style.bottom = pixel.y + 64 + 'px'
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
  background: rgba(0,0,0,0.5);
  position: absolute;
}
.sample.active {
  background: rgba(0,0,0,0.75);
}
.imgContainer {
  height: 64px;
  width: 64px;
  vertical-align: middle;
}
img {
  border:1px solid #fff;
  position: absolute;
  bottom: 0px;
}
</style>
