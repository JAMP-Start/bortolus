<template lang="pug">
  figure(:style="`--aspect-ratio:${ratio};`" :class="imgClasses")
    picture
      img(v-if="nativeLazySupported"
        :srcset="generateSrcSet()"
        :alt="image.alt"
        :title="image.alt"
        :sizes="sizes"
        loading="lazy"
        :width="parseRatioForWH(ratio, 'width')"
        :height="parseRatioForWH(ratio, 'height')"
      )
      img(v-else
        :data-srcset="generateSrcSet()"
        :alt="image.alt"
        :src="preload"
        :title="image.alt"
        :data-sizes="sizes"
        class="lazy"
      )
    figcaption(v-if="caption") {{ alt }}
</template>

<script>
import { loadImages, getSrcSet, nativeLazySupported } from '~/prismic/imageTools'

export default {
  name: 'JImage',
  props: {
    ratio: { type: String, required: false, default: '' },
    image: { type: Object, required: true },
    sizes: { type: String, required: false, default: '' },
    widths: { type: Array, required: false, default: () => [320, 480, 560, 768, 960, 1024, 1280, 1440, 1600] },
    caption: { type: Boolean, required: false, default: false },
    imgClasses: { type: String, required: false, default: '' },
    preload: {
      type: String,
      required: false,
      default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }
  },
  data() {
    return {
      nativeLazySupported
    }
  },
  mounted() {
    loadImages()
  },
  methods: {
    parseRatioForWH(ratio, which) {
      return Number(ratio.split('/')[which === 'width' ? 0 : 1]) * 10
    },
    generateSrcSet() {
      return getSrcSet(this.image.url, this.widths)
    }
  }
}
</script>
