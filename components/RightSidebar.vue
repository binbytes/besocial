<template>
  <div class="shadow-lg p-6 bg-white">
    <h2
      v-if="visible"
      class="subtitle">Right Sidebar</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    }
  }
}
</script>
