<template>
  <div id="container">
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      :dragging="true"
      :mapStyle="mapStyle"
      :scroll-wheel-zoom="true"
      :mapClick="false"
      style=""
      @ready="handler"
    >
      <myOverlay
        v-for="(item, index) in unitInfos"
        :key="index"
        :position="{ lng: item.location.lng, lat: item.location.lat }"
        :status="item.status"
        :unitInfo="{
          unitName: item.unitName,
          presetTimeAlarmCount: item.presetTimeAlarmCount,
          presetTimeHiddenCount: item.presetTimeHiddenCount,
          alarmLogs: item.alarmLogs,
          hiddenLogs: item.hiddenLogs
        }"
      ></myOverlay>
    </baidu-map>
  </div>
</template>

<script>
import myOverlay from '../../components/map/MyOverlay'
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 15,
      active: false,
      unitInfos: [],
      now: 0,
      mapStyle: {
        styleJson: [
          {
            featureType: 'land',
            elementType: 'geometry',
            stylers: {
              color: '#0e2833ff'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry',
            stylers: {
              color: '#263641ff'
            }
          },
          {
            featureType: 'highway',
            elementType: 'all',
            stylers: {
              lightness: -42,
              saturation: -91
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              lightness: -77,
              saturation: -94
            }
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              color: '#313d45cf'
            }
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: {
              color: '#18313cff'
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#181818'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry',
            stylers: {
              lightness: -52
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#313131'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#8b8787'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry',
            stylers: {
              lightness: -75,
              saturation: -91
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry',
            stylers: {
              lightness: -65
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: {
              lightness: -40
            }
          }
        ]
      }
    }
  },
  created() {
    console.log('Map.vue被创建了')
    this.now = Date.parse(new Date()) / 1000
    console.log(typeof this.now)
    console.log('now=' + this.now)
    this.getCitysData()
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 118.619
      this.center.lat = 28.714
      this.zoom = 13
    },
    getCitysData() {
      this.$http
        .post('/main', {
          now: this.now
        })
        .then(res => {
          console.log(res)
          this.unitInfos = res.data.data
        })
        .catch(err => {
          this.$message.error('获取单位信息失败')
          console.log('获取单位信息失败')
          console.log(err)
        })
    }
  },
  components: {
    myOverlay
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  padding: 0;
}
// /deep/.BMap_cpyCtrl {
// display: none !important;
// }
// /deep/.anchorBL {
// display: none !important;
// }
</style>
