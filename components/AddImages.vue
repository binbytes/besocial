<template>
  <div class="relative w-24 h-24 m-2 cursor-pointer">
    <img
      :src="image"
      class="w-24 h-24 rounded image">
    <span
      class="absolute pin-t pin-r bg-black rounded-full px-1 m-1">
      <close-svg
        class="fill-current text-white hover:text-grey-dark"
        width="10"
        height="10"
        @click="$emit('remove-image', image)"/>
    </span>
  </div>
</template>

<script>
import CloseSvg from '@/static/images/close.svg'

export default {
  components: {
    CloseSvg
  },
  props: {
    image: {
      type: String,
      default: null
    }
  }
}
</script>

<style>
.image:hover {
  opacity: 0.5;
  filter: alpha(opacity=100);
}
</style>
