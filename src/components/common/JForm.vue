<template lang="pug">
  div(style="max-width: 960px;")
    FormulateForm(@submit="handleSubmit" v-model="formData" :id="formType" :name="formType" method="post" netlify data-netlify-honeypot="bot-field")
      .section__content
        h3 {{ strings.formTitle }}
        FormulateInput(type="hidden" name="form-name")
        FormulateInput(type="hidden" name="type")
        FormulateInput(type="hidden" name="rif")
        FormulateInput(type="text" name="nome" :placeholder="strings.formNameLabel" validation="required")
        FormulateInput(type="tel" name="telefono" :placeholder="strings.formPhoneLabel" validation="required|number")
        FormulateInput(type="email" name="email" :placeholder="strings.formEmailLabel" validation="required|email")
        FormulateInput(type="textarea" name="messaggio" :placeholder="strings.formMessageLabel" input-class="textarea" validation="required")
        //- FormulateInput(type="checkbox" name="termini" element-class="checkbox" input-class="checkbox" validation="accepted")
        //-   template(#label)
        //-     span.ml-2 Accetto il trattamento dei miei dati personali -
        //-       a(target="_blank" class="ml-1" href="/privacy-policy") Privacy Policy
        FormulateInput(type="checkbox" name="condizioni" element-class="checkbox" input-class="checkbox mr-2" :label="strings.formTermsLabel" validation="accepted")
      FormulateInput(type="submit" :name="strings.formSubmitLabel" :disabled="isSubmitting" input-class="button mt-2 is-primary-important")
      .notifications.mt-4
        .notification.is-success(v-if="isSubmitted") {{ strings.formSuccess }}
        .notification.is-danger(v-if="isNotSubmitted")
          span {{ strings.formError }}
          br
          span
            | Altrimenti, chiamaci allo
            a.ml-1(href="tel:+39043421121") 0434 21121.
            | Grazie.
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'

const stringsModule = namespace('strings')

@Component({
  name: 'JForm'
})
export default class JFormComponent extends Vue {

  @Prop()
  formType!: string

  @Prop()
  formRif!: string

  formData: any = {
    'form-name': this.formType,
    type: this.formType,
    rif: this.formRif || ''
  }

  isSubmitting: boolean = false
  isSubmitted: boolean = false
  isNotSubmitted: boolean = false

  handleSubmit () {
    this.isSubmitting = true
    this.isSubmitted = false
    this.isNotSubmitted = false
    const params = new URLSearchParams()
    for (const key of Object.keys(this.formData)) {
      params.append(key, this.formData[key])
    }
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    })
      .then(() => {
        this.isSubmitted = true
        this.$formulate.reset(this.formType, {})
      })
      .catch(() => { this.isNotSubmitted = true })
    this.isSubmitting = false
  }

  @stringsModule.Getter('data')
  readonly strings: any

}
</script>

<style lang="scss">
.input, .textarea {
  // border: 2px dashed $black;
  background-color: $white;
  border: none;
  box-shadow: none;
  font-family: $font-secondary;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: none!important;
  font-size: 1.1rem;
  &:focus {
    border-style: solid;
  }
}
label {
  font-weight: 600;
}
ul.help {
  margin: 0;
}
</style>
