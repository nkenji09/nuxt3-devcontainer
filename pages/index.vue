<script lang="ts" setup>
  useNuxtApp().$logger.info('test', useRuntimeConfig())
  const mode = useRuntimeConfig().public.appMode
</script>

<template>
  <div>Page: index {{ mode }}</div>
</template>

<style scoped>
  /** */
</style>
