import { Configuration } from '@nuxt/types'
import dotenv from 'dotenv'
import routes from './src/prismic/routes'

dotenv.config()

const config: Configuration = {
  mode: 'universal',
  head: {
    title: 'Bortolus - Mediazioni Immobiliari',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bortolus è un agenzia immobiliare di Pordenone. Tantissime offerte immobiliari vi aspettano.' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700&display=swap' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:300,400,500,600,700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDeWL0dWP8iN4Z0JSgH7XAtejJzN6s50Hk&language=it', async: true, defer: true
    }]
  },
  loading: { color: '#fff' },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/scss/style.scss'
  ],
  pageTransition: {
    name: 'page'
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv'
  ],
  plugins: [
    '~/plugins/components.js',
    '~/plugins/filters.js',
    '~/plugins/vue-formulate'
  ],
  modules: [
    '@nuxtjs/prismic',
    '@nuxtjs/style-resources',
    ['vue-scrollto/nuxt', { duration: 400 }]
  ],

  dotenv: {
    path: '.',
    systemvars: true
  },
  env: {
    SITE_NAME: process.env.SITE_NAME!,
    DOMAIN: process.env.DOMAIN!,
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE!
  },
  prismic: {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: '~/prismic/link-resolver.ts',
    htmlSerializer: '~/prismic/html-serializer.ts'
  },
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
      '~/assets/scss/helpers.scss',
      '~/assets/scss/sections.scss',
      '~/assets/scss/single-sections.scss',
      '~/assets/scss/elements.scss',
      '~/assets/scss/typography.scss'
    ]
  },
  generate: {
    fallback: true,
    routes
  },
  // build: {
  //   extend(config, ctx) {
  //   }
  // },
  srcDir: 'src',
  typescript: {
    typeCheck: {
      eslint: true
    }
  }
}

export default config
