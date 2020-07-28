<template lang="pug">
  div.immobili-page
    PageHeader(:data="data")
    section.section.mt-0
      .container
        .is-flex(style="justify-content:space-between; align-items: center; flex-wrap: wrap;")
          .content
            h1 I nostri immobili
          .filters
            .filters__filter
              label.menu-label {{ strings.filterTipologiaAnnuncio }}
              .select
                select(v-model="tipologiaAnnuncio")
                  option(value="") Tutti
                  option(value="vendita") Vendita
                  option(value="affitto") Affitto
            .filters__filter
              label.menu-label {{ strings.filterTipologiaImmobile }}
              .select
                select(v-model="tipologiaImmobile")
                  option(value="") Tutti
                  option(value="residenziale") Residenziale
                  option(value="non residenziale") Non residenziale
        .content.mt-4(v-if="!$fetchState.pending")
          ImmobileCardList(:immobili="immobili")
        div.loadingComponent(v-else)
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import Prismic from 'prismic-javascript'

import PageHeader from '~/components/common/PageHeader.vue'
import ImmobileCardList from '~/components/immobili/ImmobileCardList.vue'

import seo from '~/utils/seo.ts'

const stringsModule = namespace('strings')

@Component({
  components: {
    PageHeader, ImmobileCardList
  },
  head() {
    const { data } = this.$data
    return seo(data, this.$route.path)
  },
  watch: {
    tipologiaAnnuncio: '$fetch',
    tipologiaImmobile: '$fetch'
  }
})
export default class ImmobiliPage extends Vue {

  data: any = {}
  immobili: any = []
  immobiliData: any = []
  pages: number = 0
  lang: string = 'it'
  tipologiaAnnuncio: string = ''
  tipologiaImmobile: string = ''

  mounted() {
    this.$route.query.tipologia_annuncio ? this.tipologiaAnnuncio = this.$route.query.tipologia_annuncio.toString() : this.tipologiaAnnuncio = ''
  }

  async asyncData({ app, error }): Promise<any> {
    try {
      const { data, lang } = await app.$prismic.api.getSingle('immobili')
      return { data, lang }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404, message: 'Page not found.' })
    }
  }

  async fetch(): Promise<any> {
    try {
      const params = [Prismic.Predicates.at('document.type', 'immobile')]
      if (this.tipologiaAnnuncio.length) {
        params.push(Prismic.Predicates.at('my.immobile.tipologia_annuncio', this.tipologiaAnnuncio))
      }
      if (this.tipologiaImmobile.length) {
        params.push(Prismic.Predicates.at('my.immobile.tipologia_immobile', this.tipologiaImmobile))
      }
      const { total_pages, results } = await this.$prismic.api.query(params, { orderings: '[my.post.date desc]' })
      this.immobiliData = results
      this.immobili = results
      this.pages = total_pages
    } catch (e) {
      console.error(e)
    }
  }

  @stringsModule.Getter('data')
  readonly strings: any

}
</script>

<style lang="scss">
.immobili-page{
  min-height: calc(100vh - 96px);
}
.filters {
  width: 100%;
  max-width: 400px;
  display: inline-flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-bottom: 2.5em;
  &__filter {
    select {
      border: 2px solid $black;
      &:focus {
        border-color: $primary;
        outline: none;
      }
    }
    .buttons {
      margin-top: .5rem;
      margin-bottom: 1rem;
      .button { flex: 0 0 auto; margin-top: 0; }
    }
    label {
      display: block;
      text-transform: uppercase;
      font-size: .9rem;
      text-transform: uppercase;
    }
  }
}
</style>
