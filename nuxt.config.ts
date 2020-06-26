import { Configuration } from '@nuxt/types'
import dotenv from 'dotenv'
import routes from './src/prismic/routes'

dotenv.config()

// #i18n
const locales = [
  { code: 'it', iso: 'it-IT', name: 'Italiano' },
  { code: 'en', iso: 'en-US', name: 'English' }
]

const config: Configuration = {
  mode: 'universal',
  head: {
    title: 'JAMP Start',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt boilerplate for Prismic' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,600,700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
    '~/plugins/i18n.ts' // #i18n
  ],
  modules: [
    '@nuxtjs/prismic',
    '@nuxtjs/style-resources',
    'nuxt-i18n' // #i18n
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
  // #i18n
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: process.env.DEFAULT_LOCALE!,
    locales,
    vueI18n: {
      fallbackLocale: process.env.DEFAULT_LOCALE!,
      vueI18nLoader: true,
      messages: {}
    },
    vuex: true,
    parsePages: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: `${process.env.SITE_NAME}_i18n_redirected`
    }
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
