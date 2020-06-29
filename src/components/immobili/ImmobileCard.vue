<template lang="pug">
  JLink.immobile(:linkUrl="data")
    .immobile__image
      JImage(ratio="1/1" :image="immobile.images[0].image" :widths="[350, 450, 550, 650, 750]" imgClasses="image-cover")
    .immobile__content
      h4.immobile__title {{ $prismic.asText(immobile.title) }}
      div.immobile__details {{ immobile.details_superficie }} mq - {{ immobile.details_camere }} camere
      div.immobile__rif rif. {{ immobile.rif }}
      div.immobile__price € {{ immobile.price }}
      .button {{ strings.discoverMore }}
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'

const stringsModule = namespace('strings')

@Component({
  name: 'immobile-card'
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
  display: block;
  &:hover {
    background-color: $primary-light;
    text-decoration: none!important;
  }
  &__image {
    border: 1px solid $black;
  }
  &__title {
    text-transform: uppercase;
  }
  &__date {
    color: $secondary;
    font-weight: 600;
  }
  &__content {
    padding: 1rem;
    margin-bottom: 2rem;
    color: $black!important;
  }
  &__price {
    text-align: right;
    font-weight: 600;
    font-size: 1.5rem;
  }
}
</style>
