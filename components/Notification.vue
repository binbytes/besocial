<template>
  <div class="w-64 mx-auto">
    <div
      class="flex border-b py-3 px-2" >
      <img
        class="rounded-full border bg-grey-darkest w-8 h-8 mt-1 mr-2"
        src="images/default-avatar.png"
        alt="User avatar">
      <div v-if="notification.type == 'App\\Notifications\\UserFollowed'">
        <p class="text">
          <span class="header-lable">{{ notification.data.likedBy.name }} </span>
          Followed
          <span class="header-lable"> you </span>
          Jan 23
        </p>
        <p
          class="text"
          v-text="notificationText" />
      </div>
      <div v-if="notification.type == 'App\\Notifications\\PostLiked'">
        <p class="text">
          <span class="header-lable">{{ notification.data.likedBy.name }} </span>
          Liked
          <span class="header-lable">  your post </span>
          Jan 23
        </p>
        <p
          class="text"
          v-text="notificationText" />
      </div>
      <div v-if="notification.type == 'App\\Notifications\\PostCommented'">
        <p>
          <span class="header-lable">{{ notification.data.likedBy.name }} </span>
          Commented
          <span class="header-lable">  your post </span>
          Jan 23
        </p>
        <p
          class="text"
          v-text="notificationText" />
      </div>
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
      if (this.notification) {
        return this.notification.data.text.length > 20
          ? this.notification.data.text.substr(0, 20) + '...'
          : this.notification.data.text
      }
    }
  }
}
</script>

<style>
.text {
  @apply text-sm leading-normal text-grey-dark;
}
.header-lable {
  @apply text-teal;
}
</style>
