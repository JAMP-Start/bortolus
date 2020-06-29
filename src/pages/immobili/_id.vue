<template lang="pug">
  .container
    article.immobile
      .content
        section.section.my-0
          prismic-rich-text(:field="data.title")
          div rif. {{ data.rif }}
          div.has-text-weight-semibold € {{ data.price }}
        .immobile__details
          .immobile__details__item
            .immobile__details__item__icon X
            span {{ data.details_superficie }} mq
          .immobile__details__item
            .immobile__details__item__icon X
            span {{ data.details_camere }} camere
          .immobile__details__item
            .immobile__details__item__icon X
            span {{ data.details_bagni }} bagni
          .immobile__details__item
            .immobile__details__item__icon X
            span {{ data.details_piano }}° piano
        .immobile__tabs.my-4
          .immobile__tabs__tab(v-if="activeTab === 1")
            JSlider(:id="`foto-${data.rif}`" :images="data.images")
          .immobile__tabs__tab(v-if="hasPlanimetrie && activeTab === 2")
            JSlider(:id="`planimetria-${data.rif}`" :images="data.images1")
          .immobile__tabs__tab(v-if="activeTab === 3") Virtual Tour
          .immobile__tabs__tab(v-if="activeTab === 4") Mappa
        .immobile__details.immobile__details__links
          .immobile__details__item(@click="activeTab = 1" :class="{'active': activeTab === 1}")
            .immobile__details__item__icon X
            span {{data.images.length }} foto
          .immobile__details__item(v-if="hasPlanimetrie" @click="activeTab = 2" :class="{'active': activeTab === 2}")
            .immobile__details__item__icon X
            span {{data.images1.length }} planimetrie
          .immobile__details__item(@click="activeTab = 3" :class="{'active': activeTab === 3}")
            .immobile__details__item__icon X
            span virtual tour
          .immobile__details__item(@click="activeTab = 4" :class="{'active': activeTab === 4}")
            .immobile__details__item__icon X
            span mappa
        section.section
          h2 Descrizione Immobile
          prismic-rich-text(v-if="data.content" :field="data.content")
        section.section
          h2 Dettagli Immobile
          ul.immobile__table
            li(v-for="(value, key) in details" :key="key")
              strong {{ key | label }}
              span {{ value }}
        section.section
          h2 Caratteristiche Immobile
        section.section
          h2 Classe Energetica
          .immobile__classeenergetica__wrapper
            .immobile__classeenergetica(:class="data.classe_energetica_class.toLowerCase()")
              span(v-if="data.classe_energetica_class") Classe {{ data.classe_energetica_class }}
              span(v-else) Non disponibile
          div
            strong Indice prestazione energetica
            span {{ data.classe_energetica_index }}
        section.section
          h2 Posizione
        section.section
          JForm(formType="immobile" formRef="123")
      section.section.post__footer.has-text-centered
        JLink(:linkUrl="{uid:'immobili'}" linkClasses="arrow") Tutti gli immobili
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import JSlider from '~/components/common/JSlider.vue'
import JForm from '~/components/common/JForm.vue'

import seo from '~/utils/seo.ts'

@Component({
  components: {
    JSlider, JForm
  },
  head() {
    const { data, lang } = this.$data
    return seo(data, lang, this.$route.path)
  }
})
export default class ImmobilePage extends Vue {

  data: any = {}
  activeTab: number = 1
  lang: string = 'en'

  get hasPlanimetrie(): any {
    return this.data.images1.length
  }

  get details(): any {
    return Object.keys(this.data).filter(key => !key.indexOf('details_')).reduce((obj, key) => {
      obj[key] = this.data[key]
      return obj
    }, {})
  }

  async asyncData({ app, params, error }): Promise<any> {
    try {
      const { data, lang } = await app.$prismic.api.getByUID('immobile', params.id)
      return { data, lang: lang.substr(0, 2) }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404, message: 'Immobile Not Found' })
    }
  }

}
</script>

<style lang="scss" scoped>
  .immobile {
    &__details {
      width: 100%;
      display: inline-grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
      &__item {
        &__icon {
          font-size: 4rem;
        }
        text-align: center;
        background-color: $primary-light;
        padding: 1rem;
        font-weight: 600;
      }
      &__links {
        .immobile__details__item {
          cursor: pointer;
          &.active, &:hover {
            background-color: $primary;
          }
        }
      }
    }
    &__tabs {
      // height: 60vh;
      background-color: $primary-light;
      overflow: hidden;
      &__tab {
        max-height: 100%;
      }
    }
    &__table {
      display: inline-grid;
      grid-template-columns: 1fr;
      grid-gap: 1rem;
      width: 100%;
      margin: 0;
      padding: 0;
      list-style-type: none;
      @media only screen and (min-width: 768px){
        grid-template-columns: 1fr 1fr;
      }
      li {
        display: inline-grid;
        grid-template-columns: 3fr 1fr;
        strong {
          text-transform: capitalize;
        }
      }
    }
    &__classeenergetica {
      &__wrapper {
        max-width: 300px;
      }
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 40px;
      padding: 0 1rem;
      color: $white;
      background-color: grey;
      position: relative;
      height: 40px;
      &:after {
        position: absolute;
        top: 0;
        right: -30px;
        content: '';
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 30px solid grey;
      }
      &.a4{
        background-color: #2D8E38;
        max-width: 50%;
        &:after {
          border-left-color: #2D8E38;
        }
      }
      &.a3 {
        background-color: #009F4B;
        max-width: 55%;
        &:after {
          border-left-color: #009F4B;
        }
      }
      &.a2 {
        background-color: #61AA5E;
        max-width: 60%;
                &:after {
          border-left-color: #61AA5E;
        }
      }
      &.a, .a1 {
        background-color: #A7C82A;
        max-width: 65%;
                &:after {
          border-left-color: #A7C82A;
        }
      }
      &.b {
        background-color: #D5D72A;
        max-width: 70%;
                &:after {
          border-left-color: #D5D72A;
        }
      }
      &.c {
        background-color: #FFEE30;
        max-width: 75%;
                &:after {
          border-left-color: #FFEE30;
        }
      }
      &.d {
        background-color: #FFCD28;
        max-width: 60%;
                &:after {
          border-left-color: #FFCD28;
        }
      }
      &.e {
        background-color: #FA9654;
        max-width: 85%;
                &:after {
          border-left-color: #FA9654;
        }
      }
      &.f {
        background-color: #D97A8C;
        max-width: 90%;
                &:after {
          border-left-color: #D97A8C;
        }
      }
      &.g {
        background-color: #F72B2D;
        max-width: 95%;
                &:after {
          border-left-color: #F72B2D;
        }
      }
    }
  }
</style>
