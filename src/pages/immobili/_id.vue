<template lang="pug">
  .container
    article.immobile
      .content
        section.section.my-0
          prismic-rich-text(:field="data.title")
          div rif. ?
          div.has-text-weight-semibold € 172.000
        .immobile__details
          .immobile__details__item
            .immobile__details__item__icon X
            span 120mq
          .immobile__details__item
            .immobile__details__item__icon X
            span 3 camere
          .immobile__details__item
            .immobile__details__item__icon X
            span 2 bagni
          .immobile__details__item
            .immobile__details__item__icon X
            span 3° piano
        .immobile__tabs.my-4
          .immobile__tabs__tab(v-if="activeTab === 1")
            JSlider(id="123" :images="foto")
          .immobile__tabs__tab(v-if="activeTab === 2") Planimetria
          .immobile__tabs__tab(v-if="activeTab === 3") Virtual Tour
          .immobile__tabs__tab(v-if="activeTab === 4") Mappa
        .immobile__details.immobile__details__links
          .immobile__details__item(@click="activeTab = 1" :class="{'active': activeTab === 1}")
            .immobile__details__item__icon X
            span 20 foto
          .immobile__details__item(@click="activeTab = 2" :class="{'active': activeTab === 2}")
            .immobile__details__item__icon X
            span 1 planimetria
          .immobile__details__item(@click="activeTab = 3" :class="{'active': activeTab === 3}")
            .immobile__details__item__icon X
            span virtual tour
          .immobile__details__item(@click="activeTab = 4" :class="{'active': activeTab === 4}")
            .immobile__details__item__icon X
            span mappa
        section.section.post__content
          prismic-rich-text(v-if="data.content" :field="data.content")
        Slice(v-for="(slice, index) in data.body",
          :data="slice",
          :key="index")
      section.section.post__footer.has-text-centered
        JLink(:linkUrl="{uid:'immobili'}" linkClasses="arrow") Tutti gli immobili
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Slice from '~/components/sections/Slice.vue'
import JSlider from '~/components/common/JSlider.vue'

import seo from '~/utils/seo.ts'

@Component({
  components: {
    Slice, JSlider
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
  foto: any = [
    {
      image: {
        url: 'https://source.unsplash.com/1600x900/?home,interior'
      }
    },
    {
      image: {
        url: 'https://source.unsplash.com/600x1200/?home,interior'
      }
    },
    {
      image: {
        url: 'https://source.unsplash.com/2000x500/?home,interior'
      }
    }
  ]

  async asyncData({ app, params, error }): Promise<any> {
    try {
      const { data, lang } = await app.$prismic.api.getByUID('post', params.id)
      return { data, lang: lang.substr(0, 2) }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404, message: 'Post Not Found' })
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
  }
</style>
