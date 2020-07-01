<template lang="pug">
  div.immobili-page
    PageHeader(:data="data")
    section.section.mt-0
      .container
        .filters.mb-4
          .filters__filter
            label.menu-label Tipologia Annuncio
            .buttons.has-addons(@click="setTipologiaImmobile('')")
              nuxt-link.button(:to="{ path: 'immobili' }" :class="{'is-active': tipologiaAnnuncio === ''}") Tutti
              nuxt-link.button(:to="{ path: 'immobili', query: { tipologia_annuncio: 'vendita' }}" :class="{'is-active': tipologiaAnnuncio === 'vendita'}") Vendita
              nuxt-link.button(:to="{ path: 'immobili', query: { tipologia_annuncio: 'affitto' }}" :class="{'is-active': tipologiaAnnuncio === 'affitto'}") Affitto
          .filters__filter
            label.menu-label Tipologia Immobile
            .buttons.has-addons
              .button(@click="setTipologiaImmobile('residenziale')" :class="{'is-active': tipologiaImmobile === 'residenziale'}") Residenziale
              .button(@click="setTipologiaImmobile('non residenziale')" :class="{'is-active': tipologiaImmobile === 'non residenziale'}") Non residenziale
        .content.mt-4(v-if="!$fetchState.pending")
          ImmobileCardList(:immobili="immobili")
        div.loadingComponent(v-else)
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Prismic from 'prismic-javascript'

import PageHeader from '~/components/common/PageHeader.vue'
import ImmobileCardList from '~/components/immobili/ImmobileCardList.vue'

import seo from '~/utils/seo.ts'

@Component({
  components: {
    PageHeader, ImmobileCardList
  },
  head() {
    const { data, lang } = this.$data
    return seo(data, lang, this.$route.path)
  },
  watch: {
    '$route.query': '$fetch'
  }
})
export default class ImmobiliPage extends Vue {

  data: any = {}
  immobili: any = []
  immobiliData: any = []
  pages: number = 0
  lang: string = 'it'
  tipologiaImmobile: string = ''

  get tipologiaAnnuncio(): string {
    return this.$route.query.tipologia_annuncio ? this.$route.query.tipologia_annuncio.toString() : ''
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
      let queryParam: string = 'document.type'
      let queryValue: string = 'immobile'
      const query = this.$route.query
      if (query.tipologia_annuncio) {
        queryParam = 'my.immobile.tipologia_annuncio'
        queryValue = query.tipologia_annuncio.toString()
      }
      const { total_pages, results } = await this.$prismic.api.query(Prismic.Predicates.at(queryParam, queryValue), { orderings: '[my.post.date desc]' })
      this.immobiliData = results
      this.immobili = results
      this.filterByTipologiaImmobile()
      this.pages = total_pages
    } catch (e) {
      console.error(e)
    }
  }

  setTipologiaImmobile(tipologia) {
    this.tipologiaImmobile === tipologia ? this.tipologiaImmobile = '' : this.tipologiaImmobile = tipologia
    this.filterByTipologiaImmobile()
  }

  filterByTipologiaImmobile() {
    if (this.tipologiaImmobile.length) {
      this.immobili = this.immobiliData.filter(i => i.data.tipologia_immobile === this.tipologiaImmobile)
    } else {
      this.immobili = this.immobiliData
    }
  }

}
</script>

<style lang="scss">
.filters {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  &__filter {
    .buttons {
      margin-top: -1rem;
    }
    label {
      text-transform: uppercase;
      font-size: .9rem;
      text-transform: uppercase;
    }
  }
}
</style>
