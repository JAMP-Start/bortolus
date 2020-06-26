// #i18n
export default function({ app, store }) {

  app.i18n.onLanguageSwitched = async (_, newLocale: string): Promise<void> => {
    const lang = app.i18n.locales.find(locale => locale.code === newLocale).iso.toLowerCase()

    await store.dispatch('strings/getData', lang)
    await store.dispatch('header/getData', lang)
    await store.dispatch('footer/getData', lang)
  }

}
