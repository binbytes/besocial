<template>
  <div class="flex border-t items-center p-2 w-full">
    <textarea
      v-model="text"
      placeholder="Type your message"
      class="shadow border rounded w-full py-2 px-3 text-grey-darker leading-tight resize-none"/>
    <button
      :disabled="!text"
      class="bg-teal text-white px-6 rounded-full ml-2 py-2 px-6 cursor-pointer btn-send-message"
      @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.text !== null) {
        this.$emit('newMessage', this.text)
        this.text = null
      }
    }
  }
}
</script>

<style>
.btn-send-message:disabled {
  @apply bg-teal-lighter cursor-not-allowed;
}
</style>
