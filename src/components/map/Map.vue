<template>
  <div id="container">
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      :dragging="true"
      :mapStyle="mapStyle"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
    <myOverlay
      v-for="(item, index) in unitInfos"
      :key="index"
      :position="{ lng: item.location.lng, lat: item.location.lat }"
      :status="item.status"
      :unitInfo="{ unitName: item.unitName,
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
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#021019'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#147a92'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#0b3d51'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'land',
            elementType: 'all',
            stylers: {
              color: '#08304b'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#08304b'
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry',
            stylers: {
              lightness: -70
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#857f7f'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry',
            stylers: {
              color: '#022338'
            }
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              color: '#062032'
            }
          },
          {
            featureType: 'boundary',
            elementType: 'all',
            stylers: {
              color: '#1e1c1c'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'geometry',
            stylers: {
              color: '#022338'
            }
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#2da0c6',
              visibility: 'on'
            }
          }
        ]
      }
    }
  },
  created() {
    console.log('Map.vue被创建了')
    this.now = Date.parse(new Date()) / 1000
    console.log(typeof (this.now))
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
      this.$http.post('/main', {
        now: this.now
      })
        .then(res => {
          console.log(res)
          this.unitInfos = res.data
        }).catch(err => {
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
</style>
