import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { it } from '@braid/vue-formulate-i18n'

const options = {
  plugins: [it],
  locale: 'it',
  classes: {
    outer: 'control',
    wrapper: 'field mt-4',
    element: 'control',
    input: 'input',
    error: 'help is-danger',
    errors: 'help is-danger',
    inputIsValid: 'is-success',
    inputHasErrors: 'is-danger'
  }
}

Vue.use(VueFormulate, options)
