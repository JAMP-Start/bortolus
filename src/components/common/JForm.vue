<template lang="pug">
    div
      .section__content(style="max-width: 800px;")
        h4 Richiedi maggiori informazioni
        FormulateForm(v-model="formData" :name="formType" @submit="formSubmit" netlify)
          FormulateInput(type="hidden" name="type")
          FormulateInput(type="hidden" name="ref")
          FormulateInput(type="text" name="nome" placeholder="il tuo nome" validation="required")
          FormulateInput(type="tel" name="telefono" placeholder="il tuo numero di telefono" validation="required|number")
          FormulateInput(type="email" name="email" placeholder="la tua e-mail" validation="required|email")
          FormulateInput(type="textarea" name="messaggio" placeholder="scrivi qui il tuo messaggio" input-class="textarea" validation="required")
          FormulateInput(type="checkbox" name="privacy" element-class="checkbox" input-class="checkbox" validation="required")
            template(#label) Acconsento al trattamento dei dati
              a(target="_blank" class="ml-1" href="/privacy-policy") Privacy Policy
      FormulateInput(type="submit" name="Invia la tua richiesta" input-class="button mt-2 is-primary-important")
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
    type: this.formType,
    ref: this.formRef
  }

  formSubmit () {
    console.log(this.formData)
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
