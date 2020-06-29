<template lang="pug">
  footer.footer.has-background-primary
    .footer__columns
      .columns.container
        .column(v-for="(column, index) in footerData.body", :key="index")
          .footer__content(v-if="column.slice_type === 'content_section'")
            prismic-rich-text(:field="column.primary.content")
          .footer__content(v-if="column.slice_type === 'navigation'")
            NavigationMenu(:navigation="column.primary")
    .footer__bottom
      .container.columns
        .column.is-6.has-text-centered.has-text-left-desktop
          prismic-rich-text(v-if="footerData.footer_bottom", :field="footerData.footer_bottom")
        .column.is-6.has-text-center.has-text-right-desktop
          .d-flex
            nuxt-link.mr-4(to="/privacy-policy") Privacy Policy
            nuxt-link(to="/cookie-policy") Cookie Policy
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

import SocialIcons from './SocialIcons.vue'
import NavigationMenu from './NavigationMenu.vue'

const footerModule = namespace('footer')

@Component({
  name: 'the-footer',
  components: {
    NavigationMenu, SocialIcons
  }
})
export default class TheFooterComponent extends Vue {

  @footerModule.Getter('data')
  readonly footerData: any

}
</script>

<style lang="scss">
.footer {
  padding: 0;
  margin-top: 1rem;
  color: $black;
  &__columns {
    padding: 3rem 1.5rem 1.5rem 1.5rem;
    img {
      max-width: 245px;
      max-height: 45px;
    }
  }
  &__bottom {
    .container {
      border-top: 1px solid $black;
    }
    padding: .75rem 0 1rem 0;
    margin-top: 1.5rem;
    p, a {
      color: $grey!important;
    }
    .columns {
      align-items: center;
    }
  }
}
</style>
