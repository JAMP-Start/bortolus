<template lang="pug">
  header#top
    nav.navbar(role="navigation", aria-label="main navigation")
      .container
        .navbar-brand
          a.navbar-burger.burger(role="button",
            aria-label="menu",
            aria-expanded="false",
            data-target="navbarMain",
            @click="toggleMenu = !toggleMenu"
            :class="{ 'is-active': toggleMenu }")
            span(aria-hidden="true")
            span(aria-hidden="true")
            span(aria-hidden="true")
          nuxt-link.navbar-item(to="/")
            prismic-image(:field="headerData.logo")
          a.cta--mobile.is-flex(href="tel:+39043421121")
            .jicon.mr-1
              i.phone
            | 0434 21121
        .navbar-menu(:class="{ 'is-active': toggleMenu }" @click="toggleMenu = !toggleMenu")
          .navbar-end
            .navbar-item.is-hoverable(v-for="(item, index) in menu",
              :key="index",
              :class="{ 'has-dropdown': hasDropdown(item.items) }")
              JLink(:linkUrl="item.primary.nav_link",
                :linkAnchor="item.primary.nav_anchor"
                :linkClasses="hasDropdown(item.items) ? 'navbar-item navbar-link' : 'nav-item'",
                :linkIcon="item.primary.nav_icon") {{ item.primary.nav_text }}
              .navbar-dropdown(v-if="hasDropdown(item.items)")
                .navbar-item.is-hoverable(v-for="(item2, index2) in item.items",
                  :key="index + index2",
                  :class="{ 'has-dropdown': hasDropdown(item2.items) }")
                  JLink(:linkUrl="item2.primary.nav_link",
                    :linkAnchor="item2.primary.nav_anchor"
                    :linkClasses="hasDropdown(item2.items) ? 'navbar-item navbar-link' : 'nav-item'",
                    :linkIcon="item2.primary.nav_icon") {{ item2.primary.nav_text }}
                  .navbar-dropdown(v-if="hasDropdown(item2.items)")
                    .navbar-item(v-for="(item3, index3) in item2.items",
                      :key="index + index2 + index3")
                      JLink(:linkUrl="item3.nav_link",
                      :linkAnchor="item3.nav_anchor"
                      :linkIcon="item3.nav_icon") {{ item3.nav_text }}
          .navbar-end
            .navbar-item
              a.cta.is-flex(href="tel:+39043421121")
                .jicon.is-medium.mr-3
                  i.phone.ring
                | 0434 21121
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import SocialIcons from './SocialIcons.vue'

const headerModule = namespace('header')

@Component({
  name: 'the-header',
  components: {
    SocialIcons
  }
})
export default class TheHeaderComponent extends Vue {

  toggleMenu: boolean = false
  menu: any[] = []

  @headerModule.Getter('data')
  readonly headerData: any

  mounted(): void {
    let parentIndex = -1
    this.headerData.body.forEach((item: any, index: number) => {
      if (item.slice_type === '1st_level') {
        this.menu.push({ ...item, items: [] })
        parentIndex = index
      } else {
        this.menu[parentIndex].items.push(item)
      }
    })
  }

  hasDropdown(items = []): boolean {
    return items.length > 0
  }

}
</script>

<style lang="scss">
.navbar, .navbar-menu {
  background-color: $primary;
}
.is-sticky {
  position: sticky;
  top: 0;
  z-index: 4;
}
.navbar-brand {
  justify-content: space-between;
  img {
    max-height: 40px;
    @media screen and (min-width: 400px) {
      max-height: 50px;
    }
    @media screen and (min-width: 768px) {
      max-height: 80px;
    }
  }
}
.navbar-burger {
  height: auto;
  margin-left: 0;
  margin-right: 0;
}
.navbar-item {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.1rem;
  .nuxt-link-exact-active {
    text-decoration: underline;
  }
}

@media screen and (min-width: 1024px) {
  .navbar-item .navbar-dropdown .navbar-item {
    &.navbar-link:not(.is-arrowless):after {
      transform: rotate(225deg);
    }

    &.is-hoverable > .navbar-dropdown {
      display: none !important;
    }

    &.is-hoverable:hover > .navbar-dropdown {
      display: block !important;
    }

    .navbar-dropdown {
      top: 0;
      left: 100%;
    }
  }
  .navbar-end {
    .buttons {
      .button {
        margin-top: 0!important;
      }
    }
  }
}
.cta {
  &--mobile {
    align-self: center;
    text-align: right;
    margin-right: .5rem;
    font-weight: 600;
    @media screen and (min-width: 1024px) {
      display: none!important;
    }
  }
  @media screen and (max-width: 1024px) {
    display: none!important;
  }
  font-size: 1.75rem;
  .jicon, i {
    width: 3rem;
    height: 3rem;
  }
}
</style>
