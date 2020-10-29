<template>
  <div>
    <app-level />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import AppLevel from '@/components/AppLevel.vue'

export default {
  components: {
    AppLevel
  }
}
</script>
