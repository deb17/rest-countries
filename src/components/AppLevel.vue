<template>
  <div class="box is-radiusless" id="heading">
    <div class="container">
      <div class="level is-mobile">
        <div class="level-left">
          <h3 class="title is-3 is-size-6-mobile">Where in the world?</h3>
        </div>

        <div class="level-right">
          <app-dark-mode />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDarkMode from '@/components/AppDarkMode.vue'
export default {
  components: {
    AppDarkMode
  }
}
</script>

<style scoped></style>
