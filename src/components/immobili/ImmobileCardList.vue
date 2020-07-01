<template lang="pug">
  .columns.is-multiline(v-if="immobili.length")
    .column.is-one-third(v-for="(immobile, index) in immobili" :key="index")
      ImmobileCard(:data="immobile")
  div(v-else) Nessun immobile trovato.
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import ImmobileCard from '~/components/immobili/ImmobileCard.vue'

@Component({
  name: 'immobile-card-list',
  components: {
    ImmobileCard
  }
})
export default class ImmobileCardListComponent extends Vue {

  @Prop()
  immobili!: any

}
</script>
