<template lang="pug">
  section.section(:id="primary.section_id" :class="primary.section_classes")
    .container
      .content
        prismic-rich-text(:field="primary.content")
      .swiper-container#carousel(v-if="primary.display_as_carousel")
        .swiper-wrapper
          .swiper-slide(v-for="(item, index) in items" :key="index")
            .box
              article.media.media-centered
                .media-image(v-if="item.data.image")
                  JImage(ratio="16/9" :image="item.data.image" :widths="[350, 450, 550, 650, 750]" imgClasses="image-cover")
                .media-content.content
                  prismic-rich-text(v-if="item.data.title" :field="item.data.title")
                  prismic-rich-text(v-if="item.data.content" :field="item.data.content")
                  JLink(:linkToResolve="item", linkClasses="button") {{ strings.discoverMore }}
        .swiper-button-prev#prev
        .swiper-button-next#next
        .swiper-pagination
      .columns(v-else="")
        .column(v-for="(item, index) in items" :key="index" :class="`is-${12 / primary.columns_per_row}`")
          .box
            article.media
              .media-left(v-if="item.data.image.url")
                JImage(ratio="1/1" :image="item.data.image" :widths="[350, 450, 550, 650, 750]" imgClasses="image is-128x128")
              .media-content.content
                prismic-rich-text(v-if="item.data.title" :field="item.data.title")
                prismic-rich-text(v-if="item.data.content" :field="item.data.content")
                JLink(:linkToResolve="item", linkClasses="button") {{ strings.discoverMore }}
        JLink(:linkUrl="primary.button_link" linkClasses="link arrow") {{ primary.button_text }}

</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

import { Slice } from '~/types/Slice'

const stringsModule = namespace('strings')

@Component({
  name: 'content-type-loop'
})
export default class ContentTypeLoopComponent extends Vue {

  private _swiper: any

  mounted(): void {
    if (this.primary.display_as_carousel) {
      const swiperOptions: any = {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: this.primary.columns_per_row || 4,
            spaceBetween: 40
          }
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '#next',
          prevEl: '#prev'
        }
      }
      const el = document.getElementById('carousel')
      this._swiper = new Swiper(el, swiperOptions)
    }
  }

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

  @stringsModule.Getter('data')
  readonly strings: any

}
</script>
