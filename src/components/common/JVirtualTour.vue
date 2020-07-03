<template lang="pug">
  iframe#virtualtour(width="100%" height="100%" :src="`${data.embed_url}/embed?chrome=min`" frameborder="0" style="border:none;" allowvr="yes" allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel="")
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
