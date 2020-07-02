<template lang="pug">
  section.gallery(:class="`gallery--${primary.type} ${primary.section_classes}`")
    .container-fluid
      .gallery__title.content(v-if="primary.title_show")
        prismic-rich-text(:field="primary.title")
      .gallery__images.swiper-container(:id="primary.gallery_id")
        .swiper-wrapper
          .swiper-slide(v-for="(item, index) in items", :key="index")
            figure.image-cover(:class="{ 'has-overlay': item.caption }")
              picture
                prismic-image(:field="item.image")
            .gallery__images__caption(v-if="item.caption")
              prismic-rich-text(:field="item.caption")
        .swiper-button-prev(:id="`prev-${primary.gallery_id}`")
        .swiper-button-next(:id="`next-${primary.gallery_id}`")
        .swiper-pagination(:id="`pagination-${primary.gallery_id}`")
        //- .swiper-scrollbar
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

import { Slice } from '~/types/Slice'

@Component({
  name: 'image-gallery'
})
export default class ImageGalleryComponent extends Vue {

  private _swiper: any

  mounted(): void {
    // Default Type: 'slider'
    let swiperOptions: any = {
      loop: true,
      pagination: {
        el: '#pagination-' + this.primary.gallery_id,
        type: 'bullets', // or fraction, progressbar
        clickable: true
      },
      navigation: {
        nextEl: '#next-' + this.primary.gallery_id,
        prevEl: '#prev-' + this.primary.gallery_id
      },
      effect: 'slide',
      speed: 500,
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 5000
      }
    }
    // // Type: 'carousel
    if (this.galleryType === 'carousel') {
      swiperOptions = {
        slidesPerView: 'auto',
        slidesToScroll: 'auto',
        direction: 'horizontal',
        spaceBetween: 20,
        mousewheel: {
          forceToAxis: true,
          invert: true
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false
        },
        preloadImages: false,
        lazy: {
          loadPrevNext: true
        },
        watchSlidesVisibility: true,
        freeMode: true,
        pagination: {
          el: '#pagination-' + this.primary.gallery_id,
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '#next-' + this.primary.gallery_id,
          prevEl: '#prev-' + this.primary.gallery_id
        }
      }
    }

    if (this.galleryType !== 'grid') {
      const el = document.getElementById(this.primary.gallery_id)
      this._swiper = new Swiper(el, swiperOptions)
    } else {
      console.log('Type is grid, use lightbox instead.')
    }
  }

  // destroyed(): void {
  //   this._swiper.destroy(true, true)
  //   this._swiper = null
  // }

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

  get galleryType(): any {
    return this.data.primary.type
  }

  get isGrid(): any {
    return this.data.primary.type === 'grid'
  }

}
</script>

<style lang="scss">
.gallery {
  &__images {
    max-height: 90vh;
    position: relative;
    &__caption {
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 1;
      background-color: rgba($primary,.6);
      p {
        font-size: 1.75rem;
        @media only screen and (min-width: 768px){
          font-size: 2.5rem;
        }
        @media only screen and (min-width: 1024px){
          font-size: 4rem;
        }
        line-height: 1.5;
        color: $white;
      }
      text-transform: uppercase;
      font-weight: 700;
      text-align: right;
      @media only screen and (min-width: 1024px){
        max-width: 60%;
      }
      padding: .5rem 1rem .5rem 2rem;
    }
    .swiper-slide:nth-of-type(odd) .gallery__images__caption  {
      left: auto;
      right: 0;
      text-align: left;
    }
  }
  &--slider {
    figure {
      padding-bottom: 50%;
    }
  }
  .swiper-lazy-preloader {
    opacity: 0.5;
  }
}
.has-overlay {
  &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba($black, 0.25);
      z-index: 1;
  }
}
</style>
