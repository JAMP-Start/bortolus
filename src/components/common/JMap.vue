<template lang="pug">
  .map(:id="`map-${type}`" :ref="`map-${type}`")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

declare const google

@Component({
  name: 'JMap'
})
export default class JMapComponent extends Vue {

  @Prop({ type: Object, default() { return {} } })
  data!: object

  @Prop()
  type!: string

  map: any = {}

  mounted() {
    const element = this.$refs['map-' + this.type]
    console.log(element)
    const coords = new google.maps.LatLng(this.data['latitude'], this.data['longitude'])
    const mapOptions = {
      center: coords,
      zoom: 17,
      mapTypeControl: true,
      streetViewControl: false,
      // disableDefaultUI: true,
      styles: []
    }
    this.map = new google.maps.Map(element, mapOptions)

    const marker = new google.maps.Marker({
      position: coords,
      map: this.map
    })
    console.log(marker)

    if (this.type === 'streetview') {
      const streetview = this.map.getStreetView()
      streetview.setPosition(coords)
      streetview.setPov({
        heading: 165,
        pitch: 0
      })
      streetview.setVisible(true)
    }
  }
}
</script>

<style lang="scss">
  .map {
    height: 100%;
  }
</style>
