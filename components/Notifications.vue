<template>
  <on-click-outside :do="handleClickOutside">
    <div class="relative block mt-4 lg:inline-block lg:mt-0 mr-4">
      <div
        class="cursor-pointer text-teal-lighter hover:text-white"
        @click="showNotification = !showNotification">
        <notification-svg
          class="fill-current"
          width="18"
          height="16"/>
        <span>Notifications</span>
        <span
          v-if="unReadNotificationsCount > 0"
          class="rounded-full bg-teal-dark text-white px-1"
          v-text="unReadNotificationsCount"/>
      </div>
      <div
        v-if="showNotification"
        class="rounded shadow-md mt-2 absolute pin-t-1 pin-l z-10 bg-white">  
        <div
          v-if="notifications.length > 0"
          class="w-64 mx-auto">
          <notification
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
            @close-modal="showNotification = false"/>
        </div>
        <div
          v-else
          class="w-64 mx-auto flex justify-center py-3 px-2">No any notification</div>
        <nuxt-link
          to="/notifications">
          <span
            class="w-64 bg-teal-lightest text-grey-darker flex justify-center py-3" 
            @click="showNotification = false">View all</span>
        </nuxt-link>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import Notification from '~/components/Notification.vue'
import NotificationSvg from '@/static/images/notification.svg'
import OnClickOutside from '~/components/OnClickOutside.vue'

export default {
  components: {
    Notification,
    NotificationSvg,
    OnClickOutside
  },
  data() {
    return {
      showNotification: false,
      notifications: []
    }
  },
  computed: {
    unReadNotifications() {
      return this.notifications.filter(
        notification => notification.read_at == null
      )
    },
    unReadNotificationsCount() {
      return this.unReadNotifications.length
    }
  },
  mounted() {
    this.getNotifications()
    this.bindEchoNotificationEvent()
    this.$bus.$on('unread-count', () => {
      this.getNotifications()
    })
  },
  methods: {
    getNotifications() {
      this.$axios.$get(`notifications/recent`).then(res => {
        this.notifications = res
      })
    },
    bindEchoNotificationEvent() {
      this.$echo
        .private('App.User.' + this.$auth.user.id)
        .notification(notification => {
          this.notifications.unshift(notification)
        })
    },
    handleClickOutside() {
      if (this.showNotification) {
        this.showNotification = false
      }
    }
  }
}
</script>
