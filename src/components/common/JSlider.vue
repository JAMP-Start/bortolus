<template lang="pug">
  .slider.swiper-container(:id="`slider-${id}`" :class="classes")
    .swiper-wrapper
      .swiper-slide(v-for="(item, index) in images", :key="index")
        JImage(v-if="ratio" :ratio="ratio" :image="item.image" imgClasses="image-cover")
        img(v-else :src="item.image.url")
    .swiper-button-prev(:id="`prev-${id}`")
    .swiper-button-next(:id="`next-${id}`")
    .swiper-pagination(:id="`pagination-${id}`")
    //- .swiper-scrollbar
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
    const swiperOptions: any = {
      loop: true,
      pagination: {
        el: '#pagination-' + this.id,
        type: 'bullets', // or fraction, progressbar
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

  // destroyed(): void {
  //   this._swiper.destroy(true, true)
  //   this._swiper = null
  // }

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
    &.is-large {
      height: 500px;
    }
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
