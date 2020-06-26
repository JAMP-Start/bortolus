<template lang="pug">
  JLink.post(:linkUrl="post")
    .post__image
      JImage(ratio="1/1" :image="postData.image" :widths="[350, 450, 550, 650, 750]" imgClasses="image-cover")
    .post__content
      h4.post__title {{ $prismic.asText(postData.title) }}
      div.post__excerpt {{ $prismic.asText(postData.content) | excerpt }}
      div.post__date {{ postData.date | date }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'post-card'
})
export default class PostCardComponent extends Vue {

  @Prop({ type: Object, default() { return {} } })
  post!: object

  get postData(): number {
    return this.post['data']
  }

}
</script>

<style lang="scss" scoped>
.post {
  &__image {
    border: 1px solid $black;
  }
  &__title {
    text-transform: uppercase;
    padding: 2rem 0 1.5rem 0;
    border-bottom: 2px solid $primary;
  }
  &__date {
    color: $secondary;
    font-weight: 600;
  }
  &__content {
    margin-bottom: 3rem;
    color: $black!important;
  }
  &__excerpt {
    padding: .5rem 0 1rem 0;
  }
}
</style>
