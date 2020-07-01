<template lang="pug">
  div.immobili-page
    PageHeader(:data="data")
    section.section.mt-0
      .container
        //- .filters.mb-4
        //-   .filters__filter
        //-     label.menu-label Tipologia Annuncio
        //-     .buttons.has-addons(@click="setTipologiaImmobile('')")
        //-       nuxt-link.button(:to="{ name: 'immobili' }" :class="{'is-active is-black': tipologiaAnnuncio === ''}") Tutti
        //-       nuxt-link.button(:to="{ name: 'immobili', query: { tipologia_annuncio: 'vendita' }}" :class="{'is-active is-black': tipologiaAnnuncio === 'vendita'}") Vendita
        //-       nuxt-link.button(:to="{ name: 'immobili', query: { tipologia_annuncio: 'affitto' }}" :class="{'is-active is-black': tipologiaAnnuncio === 'affitto'}") Affitto
        //-   .filters__filter
        //-     label.menu-label Tipologia Immobile
        //-     .buttons.has-addons
        //-       .button(@click="setTipologiaImmobile('residenziale')" :class="{'is-active is-black': tipologiaImmobile === 'residenziale'}") Residenziale
        //-       .button(@click="setTipologiaImmobile('non residenziale')" :class="{'is-active is-black': tipologiaImmobile === 'non residenziale'}") Non residenziale
        .filters
          .filters__filter
            label.menu-label Tipologia Annuncio
            .select
              select(v-model="tipologiaAnnuncio" @change="tipologiaImmobile = ''")
                option(value="") Tutti
                option(value="vendita") Vendita
                option(value="affitto") Affitto
          .filters__filter
            label.menu-label Tipologia Immobile
            .select
              select(v-model="tipologiaImmobile" @change="filterByTipologiaImmobile()")
                option(value="") Tutti
                option(value="residenziale") Residenziale
                option(value="non residenziale") Non residenziale
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
    tipologiaAnnuncio: '$fetch'
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
      let queryParam: string = 'document.type'
      let queryValue: string = 'immobile'
      if (this.tipologiaAnnuncio.length) {
        queryParam = 'my.immobile.tipologia_annuncio'
        queryValue = this.tipologiaAnnuncio
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
  max-width: 400px;
  display: inline-flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-bottom: 2.5em;
  &__filter {
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
