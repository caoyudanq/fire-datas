<template>
  <div>
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
        v-for="(item, index) in citys"
        :key="index"
        :position="{lng: item.lng, lat: item.lat}"
      ></myOverlay>
    </baidu-map>
  </div>
</template>

<script>
import myOverlay from '../../components/map/MyOverlay'
export default {
  name: 'Map',
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 15,
      active: false,
      city: { lng: 116.404, lat: 39.915 },
      citys: [
        {
          name: '天安门',
          lng: 116.404,
          lat: 39.915
        },
        {
          name: '崇文门',
          lng: 116.416,
          lat: 39.9
        }
      ],
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
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  },
  components: {
    myOverlay
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100%;
  height: 600px;
  padding: 0;
}
</style>
