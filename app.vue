<script setup>
  /**
   * 全ての画面で SSR内で完了させたい処理
   */
  if (process.server) {
    const context = useNuxtApp()
    const promises = await Promise.allSettled([
      // 待機
      waitHook(context, 'user:fetch:completed')
    ])
    promises.forEach((promise) => {
      if (promise.status !== 'rejected') return
      context.$logger.error(promise.reason)
    })
  }
</script>
<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
