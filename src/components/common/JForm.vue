<template lang="pug">
  div(style="max-width: 960px;")
    h4 Richiedi maggiori informazioni
    FormulateForm(@submit="handleSubmit" v-model="formData" :id="formType" :name="formType" method="post" netlify data-netlify-honeypot="bot-field")
      .section__content
        FormulateInput(type="hidden" name="form-name")
        FormulateInput(type="hidden" name="type")
        FormulateInput(type="hidden" name="rif")
        FormulateInput(type="text" name="nome" placeholder="il tuo nome" validation="required")
        FormulateInput(type="tel" name="telefono" placeholder="il tuo numero di telefono" validation="required|number")
        FormulateInput(type="email" name="email" placeholder="la tua e-mail" validation="required|email")
        FormulateInput(type="textarea" name="messaggio" placeholder="scrivi qui il tuo messaggio" input-class="textarea" validation="required")
        //- FormulateInput(type="checkbox" name="termini" element-class="checkbox" input-class="checkbox" validation="accepted")
        //-   template(#label)
        //-     span.ml-2 Accetto il trattamento dei miei dati personali -
        //-       a(target="_blank" class="ml-1" href="/privacy-policy") Privacy Policy
        FormulateInput(type="checkbox" name="condizioni" element-class="checkbox" input-class="checkbox" label="Accetto il trattamento dei dati personali." validation="accepted")
      FormulateInput(type="submit" name="Invia la tua richiesta" :disabled="isSubmitting" input-class="button mt-2 is-primary-important")
      .notifications.mt-4
        .notification.is-success(v-if="isSubmitted") Grazie per averci contattato. Ti risponderemo il prima possibile.
        .notification.is-danger(v-if="isNotSubmitted")
          | Ops, si è verificato un errore. Controlla i dati inseriti e riprova.
          br
          | Oppure, chiamaci allo 0434 21121. Grazie.
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

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
        // reset form
      })
      .catch(() => { this.isNotSubmitted = true })
    this.isSubmitting = false
  }

}
</script>

<style lang="scss">
.input, .textarea {
  border: 2px dashed $black;
  box-shadow: none;
  border-radius: 0;
}
ul.help {
  margin: 0;
}
</style>
