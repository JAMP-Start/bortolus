<template lang="pug">
  section.section(:id="primary.section_id" :class="primary.section_classes")
    .container.content
      JLink(:linkUrl="{uid:'immobili'}")
        prismic-rich-text(:field="primary.content")
      .swiper-container#carousel(v-if="primary.display_as_carousel")
        .swiper-wrapper
          .swiper-slide(v-for="(item, index) in items" :key="index")
            ImmobileCard(:data="item")
        .swiper-button-prev#carousel-prev
        .swiper-button-next#carousel-next
        .swiper-pagination#carousel-pagination
        .has-text-centered
          JLink.button.is-primary(:linkUrl="{uid:'immobili'}" linkClasses="link arrow") Scopri tutti gli immobili
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

import ImmobileCard from '~/components/immobili/ImmobileCard.vue'
import { Slice } from '~/types/Slice'

@Component({
  name: 'content-type-loop',
  components: {
    ImmobileCard
  }
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
          el: '#carousel-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '#carousel-next',
          prevEl: '#carousel-prev'
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

}
</script>
