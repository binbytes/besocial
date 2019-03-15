<template>
  <transition :name="isMine ? 'fade-right' : 'fade-left'">
    <div
      :class="['clearfix flex items-center text-b my-2', isMine ? 'flex-row-reverse' : 'justify-start']">
      <img
        :class="['rounded-full w-8 h-8', isMine ? 'ml-2' : 'mr-2']"
        :src="message.sender.avatar ? message.sender.avatar : 'images/default-avatar.png'"
        alt="User avatar">
      <div class="inline-block w-auto max-w-xs">
        <p
          :class="['text-md py-2 px-3', isMine ? 'bg-teal-lighter rounded-t-full rounded-bl-full' : 'bg-blue-lighter rounded-t-full rounded-br-full']"
          v-text="message.body"/>
        <small
          class="text-grey-dark"
          v-text="message.created_at"/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: null
    }
  },
  computed: {
    isMine() {
      return this.$auth.user.id === this.message.user_id
    }
  }
}
</script>
