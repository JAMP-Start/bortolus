<template lang="pug">
  .immobile
    .immobile__image
      JSlider(:id="`thumb-${immobile.rif | slug}`" :images="immobile.images" ratio="4/3" :key="`thumb-${immobile.rif | slug}`")
    .immobile__content
      .immobile__content__top
        h6.immobile__zone {{ immobile.zona }}
        JLink(:linkUrl="data")
          h4.immobile__title {{ $prismic.asText(immobile.title) }}
        .immobile__rif rif. {{ immobile.rif }}
      .immobile__content__bottom
        .immobile__details.is-inline-flex.mb-2
          .immobile__details__item(v-if="immobile.details_superficie")  {{ immobile.details_superficie }} m
            sup 2
          .immobile__details__item(v-if="immobile.details_camere") {{ immobile.details_camere }} {{ immobile.details_camere > 1 ? 'camere' : 'camera' }}
          .immobile__details__item(v-if="immobile.details_bagni")  {{ immobile.details_bagni }} {{ immobile.details_bagni > 1 ? 'bagni' : 'bagno' }}
          .immobile__details__item(v-if="immobile.details_piano")  {{ immobile.details_piano }}
          .immobile__details__item(v-if="immobile.details_box") {{ immobile.details_box }}
        .is-flex.is-space-between
          JLink.immobile__button.button.is-primary.mt-0(:linkUrl="data") {{ strings.discoverMore }}
          div.immobile__price
            template(v-if="immobile.price") € {{ immobile.price }}
            template(v-else) Prezzo su richiesta
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'

import JSlider from '~/components/common/JSlider.vue'

const stringsModule = namespace('strings')

@Component({
  name: 'immobile-card',
  components: {
    JSlider
  }
})
export default class ImmobileCardComponent extends Vue {

  @Prop({ type: Object, default() { return {} } })
  data!: object

  get immobile(): number {
    return this.data['data']
  }

  @stringsModule.Getter('data')
  readonly strings: any

}
</script>

<style lang="scss" scoped>
.immobile {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: block;
  background-color: $lighter;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(8, 8, 8, 0.1);
  display: flex;
  flex-direction: column;
  border: 4px solid $lighter;
  transition: all .4s;
  &:hover {
    box-shadow: 0 0.1em 1em 0 rgba(8, 8, 8, 0.1);
    transform: scale(.99);
    border-color: $primary;
    text-decoration: none!important;
  }
  &__image {
    flex: 1;
  }
  &__zone {
    font-size: 1.2rem;
    color: $secondary!important;
  }
  &__title {
    text-transform: uppercase;
    font-size: 1rem;
  }
  &__date {
    color: $secondary;
    font-weight: 600;
  }
  &__content {
    padding: 1.25rem;
    color: $black!important;
    flex: 1;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
  }
  &__details {
    font-size: .9rem;
    &__item {
      background-color: $grey-lighter;
      font-weight: 600;
      color: $grey-dark;
      border-radius: 3px;
      padding: .2rem .6rem;
      margin: .25rem;
      &:hover {
        background-color: $grey-light;
      }
    }
    // &__item {
    //   border-left: 1px solid gray;
    //   padding: 0 .6rem;
    //   margin: .25rem auto;
    //   &:first-of-type {
    //     border-left: none;
    //   }
    // }
  }
  &__price{
    font-weight: 600;
    font-size: 1.5rem;
  }
  &__rif {
    color: $grey;
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>
