<template>
  <div>
    <transition-group name="fade-left">
      <div
        v-for="user in conversation.users"
        :key="user.id"
        @click="openChat(user)">
        <div
          v-if="user.id != authUser.id"
          :class="['flex justify-between py-2 px-6 border-b hover:bg-grey-lighter cursor-pointer', conversation.unread_message_count > 0 ? 'bg-grey-lighter' : '']">
          <div class="flex">
            <img
              :src="user.avatar ? user.avatar : 'images/default-avatar.png'"
              class="rounded-full w-10 h-10 my-1 ml-1"
              alt="User avatar">
            <div class="ml-3">
              <span class="text-grey-darkest font-semibold leading-loose">{{ user.name }}</span>
              <span class="text-grey-dark text-sm font-medium leading-loose">@{{ user.name }}</span><br>
              <span class="text-grey-dark font-light leading-normal text-sm">
                {{ conversation.last_message ? conversation.last_message.body : '' }}
              </span>
            </div>
          </div>
          <div class="mt-2 bg-teal-light w-5 h-5 rounded-full flex items-center justify-center">
            <span class="text-white font-medium">{{ conversation.unread_message_count }}</span>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    conversation: {
      type: Object,
      default: null
    }
  },
  computed: {
    authUser() {
      return this.$auth.user
    }
  },
  methods: {
    openChat(user) {
      this.$emit('open-chat', user)
      this.$emit('update-unread-message-count', this.conversation)
    }
  }
}
</script>
