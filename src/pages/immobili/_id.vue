<template lang="pug">
  .container
    article.immobile
      .content.mb-0
        section.section.my-0
          .is-flex.is-space-between
            div
              prismic-rich-text(:field="data.title")
              div.has-text-weight-bold.is-size-4.has-text-grey
                span rif. {{ data.rif }}
                span.has-text-weight-normal.is-size-6.ml-2 - Pubblicato il {{ data.date | date }}
            div.has-text-weight-bold.is-size-2
              template(v-if="data.price") € {{ data.price }}
              template(v-else) Prezzo su richiesta
        .immobile__details
          .immobile__details__item(v-if="data.details_superficie")
            .immobile__details__item__icon.jicon.is-large
              i.superficie
            span {{ data.details_superficie }} m
              sup 2
          .immobile__details__item(v-if="data.details_camere")
            .immobile__details__item__icon.jicon.is-large
              i.camere
            span {{ data.details_camere }} {{ data.details_camere > 1 ? 'camere' : 'camera' }}
          .immobile__details__item(v-if="data.details_bagni")
            .immobile__details__item__icon.jicon.is-large
              i.bagni
            span {{ data.details_bagni }} {{ data.details_bagni > 1 ? 'bagni' : 'bagno' }}
          .immobile__details__item(v-if="data.details_piano")
            .immobile__details__item__icon.jicon.is-large
              i.piano
            span {{ data.details_piano }}
          .immobile__details__item(v-if="data.details_box")
            .immobile__details__item__icon.jicon.is-large
              i(:class="hasAutorimessa ? 'autorimessa' : 'postoauto'")
            span {{ data.details_box }}
        .immobile__tabs.my-4
          .immobile__tabs__tab(v-if="activeTab === 1")
            JSlider(:id="`foto-${data.rif | slug}`" :images="data.images" :key="'foto'")
          .immobile__tabs__tab(v-if="hasPlanimetrie && activeTab === 2")
            JSlider(:id="`planimetria-${data.rif | slug}`" :images="data.images1" :key="'planimetrie'")
          .immobile__tabs__tab(v-if="hasVirtualTour && activeTab === 3")
            JVirtualTour(:data="data.virtual_tour" :key="'virtual_tour'")
          .immobile__tabs__tab(v-if="activeTab === 4")
            JMap(:data="data.map" type="map" :key="'map'")
          .immobile__tabs__tab(v-if="activeTab === 5")
            JMap(:data="data.map" type="streetview" :key="'streetview'")
        .immobile__details.immobile__details__links
          .immobile__details__item(@click="activeTab = 1" :class="{'active': activeTab === 1}")
            .immobile__details__item__icon.jicon.is-large
              i.foto
            span {{data.images.length }} foto
          .immobile__details__item(v-if="hasPlanimetrie" @click="activeTab = 2" :class="{'active': activeTab === 2}")
            .immobile__details__item__icon.jicon.is-large
              i.planimetrie
            span {{ data.images1.length }} {{ data.images1.length > 1 ? 'planimetrie' : 'planimetria' }}
          .immobile__details__item(v-if="hasVirtualTour" @click="activeTab = 3" :class="{'active': activeTab === 3}")
            .immobile__details__item__icon.jicon.is-large
              i.virtualtour
            span virtual tour
          .immobile__details__item(@click="activeTab = 4" :class="{'active': activeTab === 4}")
            .immobile__details__item__icon.jicon.is-large
              i.mappa
            span mappa
          .immobile__details__item(@click="activeTab = 5" :class="{'active': activeTab === 5}")
            .immobile__details__item__icon.jicon.is-large
              i.streetview
            span street view
        section.section
          h2 Descrizione Immobile
          prismic-rich-text.section__content(v-if="data.content" :field="data.content")
        section.section
          h2 Dettagli Immobile
          .section__content
            ul.immobile__table
              li(v-for="(value, key) in details" :key="key" v-if="value")
                strong {{ key | label }}
                span {{ value }}
        section.section(v-if="data.classe_energetica_class")
          h2 Classe Energetica
          .columns
            .column
              .immobile__classeenergetica__wrapper.fadeIn(v-if="!showClasseEnergeticaLegend" @click="showClasseEnergeticaLegend = true")
                .immobile__classeenergetica(:class="data.classe_energetica_class.toLowerCase()")
                  span(v-if="data.classe_energetica_class") Classe {{ data.classe_energetica_class }}
                  span(v-else) Non disponibile
              .immobile__classeenergetica__wrapper.immobile__classeenergetica__wrapper--legend.fadeIn(v-if="showClasseEnergeticaLegend" @click="showClasseEnergeticaLegend = false")
                .immobile__classeenergetica(v-for="(c,index) in classiEnergetiche" :key="index" :class="[c, {'active': c === data.classe_energetica_class.toLowerCase()}]")
                  span Classe {{ c.toUpperCase() }}
            div.column(v-if="data.classe_energetica_index")
              strong Indice prestazione energetica
              br
              span {{ data.classe_energetica_index }}
        section.section(v-if="data.caratteristiche")
          h2 Caratteristiche Immobile
          .buttons.immobile__caratteristiche
            .button(v-for="(c, index) in data.caratteristiche.split(',')" :key="`c-${index}`") {{ c }}
        section.section
          h2 Posizione
          address.mt-4
            h4 Indirizzo:
            a(target="_blank" :href="`https://www.google.com/maps/search/?api=1&query=${addressQuery}`")
              prismic-rich-text(:field="data.indirizzo")
            br
            strong.mr-2 Zona:
            span {{ data.zona }}
        section.section#form
          h2 {{ strings.ctaTitle }}
          JForm(formType="immobile" formRif="123")
      section.section.has-text-centered.pt-0
        JLink(:linkUrl="{uid:'immobili'}" linkClasses="arrow-left") {{ strings.immobiliListButton }}
    .form__cta.fadeInUp(v-show="showCta" v-scroll-to="{el: `#form`}") {{ strings.ctaTitle }} Contattaci ⟶
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

import JSlider from '~/components/common/JSlider.vue'
import JMap from '~/components/common/JMap.vue'
import JVirtualTour from '~/components/common/JVirtualTour.vue'
import JForm from '~/components/common/JForm.vue'

import seo from '~/utils/seo.ts'

const stringsModule = namespace('strings')

@Component({
  components: {
    JSlider, JForm, JMap, JVirtualTour
  },
  head() {
    const { data } = this.$data
    return {
      ...seo(data, this.$route.path),
      // script: [{ src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDqstP8RWMwkuJYsaWQ29dZFim3506MteA&language=it', async: true, defer: true }]
      script: [{ src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCjrMNikptyuNaCOzgdxtg1ZXLPpnYGfqw&language=it', async: true, defer: true }]
    }
  }
})
export default class ImmobilePage extends Vue {

  data: any = {}
  activeTab: number = 1
  lang: string = 'en'
  showCta: boolean = true

  showClasseEnergeticaLegend: boolean = false
  classiEnergetiche: any = ['a4', 'a3', 'a2', 'a', 'b', 'c', 'd', 'e', 'f', 'g']

  get hasPlanimetrie(): any {
    return this.data.images1.length
  }

  get hasVirtualTour(): any {
    return this.data.virtual_tour && this.data.virtual_tour.url
  }

  get hasAutorimessa(): any {
    return this.data.details_box.toLowerCase().includes('autorimessa') || this.data.details_box.toLowerCase().includes('garage')
  }

  get details(): any {
    return Object.keys(this.data).filter(key => !key.indexOf('details_')).reduce((obj, key) => {
      obj[key] = this.data[key]
      return obj
    }, {})
  }

  get addressQuery(): string {
    return this.$prismic.asText(this.data.indirizzo).replace('\n', ' ')
  }

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const form:any = document.getElementById('form')
    if (form) {
      form.offsetTop < window.scrollY + 500 ? this.showCta = false : this.showCta = true
    }
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

  @stringsModule.Getter('data')
  readonly strings: any
}
</script>

<style lang="scss" scoped>
  .immobile {
    &__details {
      width: 100%;
      display: inline-grid;
      grid-gap: .25rem;
      @media only screen and (min-width: 768px){
        grid-gap: 1rem;
      }
      grid-template-columns: repeat(auto-fit, minmax(10%, 1fr));
      &__item {
        text-align: center;
        background-color: $grey-lighter;
        color: $grey;
        font-weight: 600;
        font-size: 12px;
        padding: .25rem;
        border-radius: 6px;
        @media only screen and (min-width: 768px){
          padding: 1rem;
          font-size: 1.2rem;
        }
        &__icon {
          opacity: .4;
        }
      }
      &__links {
        .immobile__details__item {
          color: $black;
          background-color: $primary-light;
          &__icon {
            opacity: 1;
          }
          cursor: pointer;
          border: 4px solid transparent;
          transition: all .4s;
          &.active {
            background-color: $primary;
          }
          &:hover {
            border-color: $primary;
          }
        }
      }
    }
    &__tabs {
      position: relative;
      min-height: 60vh;
      max-height: 80vh;
      background-color: $primary-light;
      background-color: $light;
      overflow: hidden;
      &__tab {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
    &__table {
      display: inline-grid;
      align-items: center;
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
    &__caratteristiche .button {
      text-transform: capitalize;
      font-weight: 400;
      font-size: 1rem;
    }
    &__classeenergetica {
      &__wrapper {
        cursor: pointer;
        max-width: 300px;
        &--legend {
          .immobile__classeenergetica {
            opacity: .25;
            &.active {
              opacity: 1;
            }
          }
        }
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
        max-width: 80%;
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
  .form__cta {
    cursor: pointer;
    position: fixed;
    right: 0;
    bottom: 1rem;
    border-radius: 6px;
    @media only screen and (max-width: 480px){
      left: 0;
      bottom: 0;
    }
    background-color: $secondary;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    color: $white;
    z-index: 5;
    &:hover {
      background-color: $secondary-dark;
    }
  }
</style>
