export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()
  subscribe(nuxtApp, 'app:created', () => {
    useApp().actions.entry()
  })
})
