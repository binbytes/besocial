<template>
  <section class="container">
    <div class="flex">
      <div class="w-1/4 mr-4">
        <left-sidebar
          v-if="$auth.user"
          :user="$auth.user"/>
      </div>
      <div class="w-3/5 mr-4 shadow-md bg-white">
        <div
          v-for="notification in notifications"
          :key="notification.id">
          <div class="border-b py-3 px-8">
            <div v-if="notification.type == 'App\\Notifications\\UserFollowed'">
              <img
                :src="notification.data.FollowedBy.avatar ? notification.data.FollowedBy.avatar : 'images/default-avatar.png'"
                class="rounded-full border bg-grey-darkest w-8 h-8 mr-2"
                alt="User avatar">
              <p class="text-sm leading-normal text-grey-darker pl-1">
                <nuxt-link
                  :to="`/${notification.data.FollowedBy.username}`">
                  <span
                    class="text-teal font-semibold text-base"
                    v-text="notification.data.FollowedBy.name"/>
                </nuxt-link>
                followed you
                <span
                  class="text-grey-dark text-hairline ml-2"
                  v-text="notification.created_at"/>
              </p>
            </div>
            <div v-if="notification.type == 'App\\Notifications\\PostLiked'">
              <img
                :src="notification.data.likedBy.avatar ? notification.data.likedBy.avatar : 'images/default-avatar.png'"
                class="rounded-full border bg-grey-darkest w-8 h-8 mr-2"
                alt="User avatar">
              <p class="text-sm leading-normal text-grey-darker pl-1">
                <span
                  class="text-teal font-semibold text-base"
                  v-text="notification.data.likedBy.name"/>
                liked your post
                <span
                  class="text-grey-dark text-hairline ml-2"
                  v-text="notification.created_at"/>
              </p>
              <div class="rounded-lg p-2 px-3 border border-grey-light my-2 hover:bg-grey-lighter">
                <nuxt-link
                  :to="`/${notification.data.likedBy.username}`">
                  <p class="text-sm leading-normal text-grey-dark">
                    <span
                      class="text-teal font-semibold text-base"
                      v-text="notification.data.likedBy.name"/> 
                    @{{ notification.data.likedBy.username }}
                  </p>
                </nuxt-link>
                <p
                  class="text-sm leading-normal text-grey-darker"
                  v-text="notification.data.text" />
              </div>
            </div>
            <div v-if="notification.type == 'App\\Notifications\\PostCommented'">
              <img
                :src="notification.data.CommentedBy.avatar ? notification.data.CommentedBy.avatar : 'images/default-avatar.png'"
                class="rounded-full border bg-grey-darkest w-8 h-8 mr-2"
                alt="User avatar">
              <p class="text-sm leading-normal text-grey-darker pl-1">
                <span
                  class="text-teal font-semibold text-base"
                  v-text="notification.data.CommentedBy.name"/>
                commented your post 
                <span
                  class="text-grey-dark text-hairline ml-2"
                  v-text="notification.created_at"/>
              </p>
              <div class="rounded-lg p-2 px-3 border border-grey-light my-2 hover:bg-grey-lighter">
                <nuxt-link
                  :to="`/${notification.data.CommentedBy.username}`">
                  <p class="text-sm leading-normal text-grey-dark">
                    <span
                      class="text-teal font-semibold text-base"
                      v-text="notification.data.CommentedBy.name"/> 
                    @{{ notification.data.CommentedBy.username }}
                  </p>
                </nuxt-link>
                <p
                  class="text-sm leading-normal text-grey-darker"
                  v-text="notification.data.text" />
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LeftSidebar from '~/components/LeftSidebar.vue'

export default {
  components: {
    LeftSidebar
  },
  data() {
    return {
      notifications: ''
    }
  },
  mounted() {
    this.getNotifications()
  },
  methods: {
    getNotifications() {
      this.$axios.$get(`all-notifications`).then(res => {
        this.notifications = res
        this.$bus.$emit('unread-count')
      })
    }
  }
}
</script>
