<template>
  <div>
    <app-nav />

    <div class="page-content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import appNav from '@/components/AppNav.vue'

export default {
  middleware: 'auth',
  components: {
    appNav
  }
}
</script>

<style>
.page-content {
  @apply min-h-screen flex justify-center bg-grey-lighter p-6;
}
</style>
