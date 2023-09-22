<script lang="ts" setup>
  import { variablesLog } from '~/shorthand/logger'

  const mode = useRuntimeConfig().public.appMode
  variablesLog({ mode })

  const user = useUser().user
</script>

<template>
  <div>
    Page: index {{ mode }}
    <p>User Name: {{ user.name }}</p>
  </div>
</template>

<style scoped>
  /** */
</style>
