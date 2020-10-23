<template lang="pug">
  .immobili__list.columns.is-multiline(v-if="immobili.length")
    .immobili__list__item.column.is-half.is-one-third-desktop(v-for="(immobile, index) in immobili" :key="index" v-if="immobile.data.stato")
      ImmobileCard(:data="immobile")
  div(v-else)
    h4 {{ strings.immobiliNotFound }}
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'

import ImmobileCard from '~/components/immobili/ImmobileCard.vue'

const stringsModule = namespace('strings')

@Component({
  name: 'immobile-card-list',
  components: {
    ImmobileCard
  }
})
export default class ImmobileCardListComponent extends Vue {

  @Prop()
  immobili!: any

  @stringsModule.Getter('data')
  readonly strings: any

}
</script>
