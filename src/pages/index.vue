<template lang="pug">
  .container-fluid#home
    Slice(v-for="(slice, index) in data.body",
      :data="slice",
      :key="index")
    section.section#contatti
      .container.content
        h2 {{ strings.formHeading || 'Contattaci'}}
        JForm(formType="contatti")
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import Prismic from 'prismic-javascript'

import Slice from '~/components/sections/Slice.vue'
import JForm from '~/components/common/JForm.vue'

import seo from '~/utils/seo.ts'

const stringsModule = namespace('strings')

@Component({
  components: {
    Slice, JForm
  },
  head() {
    const { data } = this.$data
    return seo(data, this.$route.path)
  }
})
export default class IndexPage extends Vue {

  data: any = {}

  async asyncData({ app, error }): Promise<any> {
    try {
      const { data, lang } = await app.$prismic.api.getByUID('page', 'home')
      const contentTypes: any = []
      data.body.map((slice, index) => {
        if (slice.slice_type === 'content_type_loop') {
          contentTypes.push({ slice: slice.primary, index })
        }
      })
      if (contentTypes.length) {
        const contentTypesPromises = contentTypes.map(async (contentType: any) => {
          try {
            const { results } = await app.$prismic.api.query(Prismic.Predicates.at('document.type', contentType.slice.content_type.toLowerCase()), { lang, pageSize: 6 })
            data.body[contentType.index].items = results
          } catch (e) {
            console.error(e)
            error({ statusCode: 404, message: 'Can not fetch Content Type' })
          }
        })
        await Promise.all(contentTypesPromises)
      }
      return { data, lang: lang.substr(0, 2) }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404, message: 'Homepage Not Found' })
    }
  }

  @stringsModule.Getter('data')
  readonly strings: any
}
</script>
