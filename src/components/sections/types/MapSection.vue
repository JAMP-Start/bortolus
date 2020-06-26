<template lang="pug">
  section.section
    .container
      code {{ primary }}
      .map(ref="map")
      div.map(v-if="primary.map_iframe" v-html="$prismic.asText(primary.map_iframe)")
      div.map
        iframe(src="https://www.google.com/maps/embed?pb=!4v1593189332405!6m8!1m7!1sQhBaJ-1zdl7Px7D6738QTg!2m2!1d45.95131233388958!2d12.66206161907608!3f131.07034414298477!4f0!5f0.7820865974627469" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Slice } from '~/types/Slice'

declare const google

@Component({
  name: 'map-section'
})
export default class MapSectionComponent extends Vue {

  @Prop({
    type: Object,
    default: (): Slice => {
      return {
        primary: {},
        items: []
      }
    }
  })
  readonly data!: Slice

  get primary(): any {
    return this.data.primary
  }

  get items(): any {
    return this.data.items
  }

  map: any = {}

  mounted() {
    const mapOptions = {
      center: new google.maps.LatLng(14.839873, 18.93956),
      zoom: 17,
      mapTypeControl: true,
      streetViewControl: true,
      // disableDefaultUI: true,
      styles: []
    }
    this.map = new google.maps.Map(this.$refs.map, mapOptions)
  }

}
</script>

<style lang="scss">
  .map {
    height: 500px;
  }
</style>
