<template lang="pug">
  .video__wrapper--centered(v-if="data.embed_url.indexOf('youtube') > 0")
    prismic-embed(:field="data")
  iframe#virtualtour(v-else width="100%" height="100%" :src="`${data.embed_url}/embed?chrome=min`" frameborder="0" style="border:none;" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel="")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'JVirtualTour'
})
export default class JVirtualTour extends Vue {

  @Prop({ type: Object, default() { return {} } })
  data!: object
}
</script>
<style lang="scss">
.video__wrapper--centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  max-width: 1024px;
  div {
    position: relative;
    overflow: hidden;
    padding-bottom: 56.25%;
    width: 100%;
    height: 0;

    iframe,
    object,
    embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
