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
          v-if="notifications.length > 0 "
          class="rounded-full bg-red px-1">{{ notifications.length }}</span>
      </div>
      <div
        v-show="showNotification"
        class="rounded shadow-md mt-2 absolute pin-t-1 pin-l z-10 bg-white h-64 overflow-y-auto">
        <notification
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"/>
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
  mounted() {
    this.bindEchoNotificationEvent()
  },
  methods: {
    bindEchoNotificationEvent() {
      this.$echo
        .private('App.User.' + this.$auth.user.id)
        .notification(notification => {
          console.log(notification)
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
