<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        besocial
      </h1>
      <h2 class="subtitle">
        My extraordinary Nuxt.js project
      </h2>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
