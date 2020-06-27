<template lang="pug">
    section.section
      h4 Richiedi maggiori informazioni
      FormulateForm(v-model="formData" :name="formType" netlify)
        FormulateInput(type="hidden" name="ref")
        FormulateInput(type="text" name="nome" placeholder="il tuo nome" validation="required")
        FormulateInput(type="tel" name="telefono" placeholder="il tuo numero di telefono" validation="required|number")
        FormulateInput(type="email" name="email" placeholder="la tua e-mail" validation="required|email")
        FormulateInput(type="textarea" name="messaggio" placeholder="scrivi qui il tuo messaggio" input-class="textarea" validation="required")
        FormulateInput(type="submit" name="Invia la tua richiesta" input-class="button is-primary")
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
    ref: this.formRef
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
