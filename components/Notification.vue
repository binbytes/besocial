<template>
  <div
    :class="['flex border-b py-3 px-2', notification.read_at == null ? 'bg-grey-lighter' : '']"
    @click="markAsRead">
    <img
      class="rounded-full border bg-grey-darkest w-8 h-8 mt-1 mr-2"
      src="images/default-avatar.png"
      alt="User avatar">
    <div v-if="notification.type == 'App\\Notifications\\UserFollowed'">
      <p class="text">
        <nuxt-link
          :to="`/${notification.data.FollowedBy.username}`">
          <span
            class="header-lable"
            @click="$emit('close-modal')">{{ notification.data.FollowedBy.name }} </span>
        </nuxt-link>
        Followed
        <span class="header-lable"> you </span>
        {{ notification.created_at }}
      </p>
    </div>
    <div v-if="notification.type == 'App\\Notifications\\PostLiked'">
      <p class="text">
        <nuxt-link
          :to="`/${notification.data.likedBy.username}`">
          <span
            class="header-lable"
            @click="$emit('close-modal')">{{ notification.data.likedBy.name }} </span>
        </nuxt-link>
        Liked
        <span class="header-lable">  your post </span>
        {{ notification.created_at }}
      </p>
      <p
        class="text"
        v-text="notificationText" />
    </div>
    <div v-if="notification.type == 'App\\Notifications\\PostCommented'">
      <p class="text">
        <nuxt-link
          :to="`/${notification.data.CommentedBy.username}`">
          <span
            class="header-lable"
            @click="$emit('close-modal')">{{ notification.data.CommentedBy.name }} </span>
        </nuxt-link>
        Commented
        <span class="header-lable">  your post </span>
        {{ notification.created_at }}
      </p>
      <p
        class="text"
        v-text="notificationText" />
    </div>
  </div> 
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      default: null
    }
  },
  computed: {
    notificationText() {
      if (this.notification.data) {
        return this.notification.data.text.length > 20
          ? this.notification.data.text.substr(0, 20) + '...'
          : this.notification.data.text
      }
    }
  },
  methods: {
    markAsRead() {
      this.$axios
        .$get('/notifications/mark-read/' + this.notification.id)
        .then(() => {
          this.$bus.$emit('unread-count')
        })
    }
  }
}
</script>

<style>
.text {
  @apply text-xs leading-normal text-grey-dark;
}
.header-lable {
  @apply text-teal text-base;
}
</style>
