<template lang="pug">
  .container
    article.post
      .content
        section.section.post__header.has-text-centered
          prismic-rich-text(:field="data.title")
          div.has-text-secondary.has-text-weight-semibold {{ data.date }}
        .post__image
          JImage(v-if="data.image && data.image.url" ratio="16/9" :image="data.image" imgClasses="image-cover")
        section.section.post__content
          prismic-rich-text(v-if="data.content" :field="data.content")
        Slice(v-for="(slice, index) in data.body",
          :data="slice",
          :key="index")
      section.section.post__footer.has-text-centered
        JLink(:linkUrl="{uid:'blog'}" linkClasses="arrow") Tutti i post
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Slice from '~/components/sections/Slice.vue'

import seo from '~/utils/seo.ts'

@Component({
  components: {
    Slice
  },
  head() {
    const { data, lang } = this.$data
    return seo(data, lang, this.$route.path)
  }
})
export default class BlogPostPage extends Vue {

  data: any = {}
  lang: string = 'en'

  async asyncData({ app, params, error }): Promise<any> {
    try {
      const { data, lang } = await app.$prismic.api.getByUID('post', params.id)
      return { data, lang: lang.substr(0, 2) }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404, message: 'Post Not Found' })
    }
  }

}
</script>

<style lang="scss" scoped>
  .post {
    &__image {
      figure {
        box-shadow: 0px 10px 50px $primary-dark;
      }
    }
  }
</style>
