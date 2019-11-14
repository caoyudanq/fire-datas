<template>
  <div>
    <baidu-map class='map' :center='center' :zoom='zoom' @ready='handler' :mapStyle="mapStyle"></baidu-map>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3,
      mapStyle: {
        styleJson: [
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#003f5eff',
              'hue': '#003f5e',
              'weight': '0.1',
              'lightness': -1,
              'saturation': -1
            }
          },
          {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': {
              'color': '#055791ff'
            }
          },
          {
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#00477fff',
              'hue': '#00477f'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'all',
            'stylers': {
              'color': '#2b555eff',
              'hue': '#2b555e'
            }
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry',
            'stylers': {
              'color': '#b9d8f5ff',
              'hue': '#b9d8f5'
            }
          }
        ]
      }
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100%;
  height: 600px;
}
</style>
