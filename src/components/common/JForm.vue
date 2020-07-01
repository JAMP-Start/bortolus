<template lang="pug">
    div
      .section__content(style="max-width: 960px;")
        h4 Richiedi maggiori informazioni
        FormulateForm(v-model="formData" :id="formType" :name="formType" method="post" netlify data-netlify-honeypot="bot-field" @submit.prevent="")
          FormulateInput(type="hidden" name="form-name")
          FormulateInput(type="hidden" name="type")
          FormulateInput(type="hidden" name="ref")
          FormulateInput(type="text" name="nome" placeholder="il tuo nome" validation="required")
          FormulateInput(type="tel" name="telefono" placeholder="il tuo numero di telefono" validation="required|number")
          FormulateInput(type="email" name="email" placeholder="la tua e-mail" validation="required|email")
          FormulateInput(type="textarea" name="messaggio" placeholder="scrivi qui il tuo messaggio" input-class="textarea" validation="required")
          FormulateInput(type="checkbox" name="privacy" element-class="checkbox" input-class="checkbox" validation="required")
            template(#label) Accetto il trattamento dei miei dati personali -
              a(target="_blank" class="ml-1" href="/privacy-policy") Privacy Policy
      FormulateInput(type="submit" @click.prevent="handleSubmit" name="Invia la tua richiesta" input-class="button mt-2 is-primary-important")
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
  formRef!: string

  formData: any = {
    'form-name': this.formType,
    type: this.formType,
    ref: this.formRef || ''
  }

  beforeMount() {
    const el = document.getElementById(this.formType)
    if (el) {
      el.setAttribute('name', this.formType)
    }
  }

  createFormDataObj(data) {
    const params = new URLSearchParams()
    for (const key of Object.keys(data)) {
      params.append(key, data[key])
    }
    return params
  }

  handleSubmit () {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: this.createFormDataObj(this.formData)
    })
    .then((res) => console.log(res))
    .catch(error => console.log(error))
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
