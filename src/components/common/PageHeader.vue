<template lang="pug">
    section.hero.is-medium.is-dark(:class="{ 'has-gradient has-gradient-left-to-right' : !noOverlay }"
      v-if="data.show_header"
      :title="data.image.alt")
      JImage.hero-image(v-if="data.image && data.image.url" :image="data.image" imgClasses="image-cover image-cover--full")
      .hero-body
        .container
          .content.has-text-centered
            h1.title(v-if="data.title") {{ $prismic.asText(data.title) }}
            h1.title(v-if="data.custom_title") {{ data.custom_title }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'page-header'
})
export default class PageHeaderComponent extends Vue {

  @Prop()
  data!: any

  @Prop()
  noOverlay!: boolean

}
</script>
