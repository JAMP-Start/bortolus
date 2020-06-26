<template lang="pug">
  section.section(:id="primary.section_id" :class="primary.section_classes")
    .container
      .columns.is-multiline
        div.column.is-4-desktop.is-6-tablet.is-1(v-for="(item, index) in items", :key="index")
          .box
            article.media.media-centered
              .media-image(v-if="item.image.url")
                JImage(ratio="4/3" :image="item.image" :widths="[350, 450, 550, 650, 750]" imgClasses="image-cover")
              .media-left.media-icon(v-if="item.icon.url")
                JImage(ratio="1/1" :image="item.icon" :widths="[128]" imgClasses="image is-128x128")
              .media-content.content
                prismic-rich-text(:field="item.title")
                prismic-rich-text(:field="item.content")
                JLink(:linkUrl="item.link", linkClasses="button") {{ item.link_text }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import { Slice } from '~/types/Slice'

@Component({
  name: 'box-grid'
})
export default class BoxGridComponent extends Vue {

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

}
</script>
