<script lang="ts" setup>
  const mode = useRuntimeConfig().public.appMode
  useNuxtApp().$logger.variables({ mode })

  const { isGuest, currentUser } = storeToRefs(useUser())
</script>

<template>
  <div>
    <p>Page: index {{ mode }}</p>
    <p>User isGuest: {{ isGuest }}</p>
    <p>User Name: {{ currentUser.name }}</p>
  </div>
</template>

<style scoped>
  /** */
</style>
