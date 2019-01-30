<template>
  <div
    :class="['clearfix flex items-center text-b my-2', isMine ? 'flex-row-reverse' : 'justify-start']">
    <img
      :class="['rounded-full w-8 h-8', isMine ? 'ml-2' : 'mr-2']"
      src="images/default-avatar.png"
      alt="User avatar">
    <div :class="['p-2 inline-block rounded-lg', isMine ? 'bg-blue-lighter' : 'bg-teal-lighter']">
      <p
        class="text-md pb-2 w-auto max-w-xs"
        v-text="message.body"/>
      <small
        class="text-grey-dark"
        v-text="message.created_at"/>
    </div>
  </div>
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
