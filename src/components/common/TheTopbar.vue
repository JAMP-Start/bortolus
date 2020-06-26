<template lang="pug">
  .topbar.is-hidden-touch
    .columns.container
      .topbar__left.column.has-text-centered.has-text-left-desktop(v-if="headerData.topbar_left")
        prismic-rich-text(:field="headerData.topbar_left")
      .topbar__center.column.has-text-centered(v-if="headerData.topbar_center")
        prismic-rich-text(:field="headerData.topbar_center")
      .topbar__right.column.has-text-centered.has-text-right-desktop(v-if="headerData.topbar_right")
        SocialIcons(:alignment="'right'")
        prismic-rich-text(:field="headerData.topbar_right")
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import SocialIcons from './SocialIcons.vue'

const headerModule = namespace('header')

@Component({
  name: 'the-topbar',
  components: {
    SocialIcons
  }
})
export default class TheTopbarComponent extends Vue {

  @headerModule.Getter('data')
  readonly headerData: any
}
</script>

<style lang="scss">
.topbar {
  background-color: $white;
  z-index: 99;
  position: relative;
  box-shadow: 0px 1px 4px $black;
  .columns {
    margin-bottom: 0;
  }
}
</style>
