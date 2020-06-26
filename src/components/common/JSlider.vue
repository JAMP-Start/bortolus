<template lang="pug">
  .slider.swiper-container(:id="`slider-${id}`")
    .swiper-wrapper
      .swiper-slide(v-for="(item, index) in images", :key="index")
        img(:src="item.image.url")
        //- JImage(v-if="item.image && item.image.url" :image="item.image" imgClasses="image")
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
      autoplay: {
        delay: 5000
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

}
</script>

<style lang="scss" scoped>
  .slider {
    height: 500px;
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
