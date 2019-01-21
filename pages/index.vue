<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">besocial</h1>
      <h2
        v-if="visible"
        class="subtitle">My extraordinary Nuxt.js project</h2>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  middleware: 'auth',
  components: {
    Logo
  },
  data() {
    return {
      visible: true
    }
  }
}
</script>
