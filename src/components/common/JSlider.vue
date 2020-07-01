<template lang="pug">
  .slider.swiper-container(:id="`slider-${id}`" :class="classes")
    .swiper-wrapper
      .swiper-slide(v-for="(item, index) in images", :key="index")
        JImage(v-if="ratio" :ratio="ratio" :image="item.image" imgClasses="image-cover")
        img(v-else :src="item.image.url")
    .swiper-button-prev(v-if="images.length > 1" :id="`prev-${id}`")
    .swiper-button-next(v-if="images.length > 1" :id="`next-${id}`")
    .swiper-pagination(v-if="images.length > 1" :id="`pagination-${id}`")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

@Component({
  name: 'JSlider'
})
export default class JSliderComponent extends Vue {

  private _swiper: any

  mounted(): void {
    if (this.images.length > 1) {
      const swiperOptions: any = {
        loop: true,
        pagination: {
          el: '#pagination-' + this.id,
          type: 'fraction', // or bullets, progressbar
          clickable: true
        },
        navigation: {
          nextEl: '#next-' + this.id,
          prevEl: '#prev-' + this.id
        },
        effect: 'slide',
        speed: 500,
        autoplay: false,
        keyboard: {
          enabled: true,
          onlyInViewport: false
        }
      }
      const el = document.getElementById('slider-' + this.id)
      this._swiper = new Swiper(el, swiperOptions)
    }
  }

  destroyed() {
    this._swiper = null
  }

  @Prop()
  id!: string

  @Prop()
  images!: any

  @Prop()
  classes!: string

  @Prop()
  ratio!: string

}
</script>

<style lang="scss" scoped>
  .slider {
    height: 100%;
    padding: 0!important;
    .swiper-slide {
      text-align: center;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 50%;
      }
    }
  }
</style>
