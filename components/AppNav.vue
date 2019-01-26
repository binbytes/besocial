<template>
  <nav
    id="navbar"
    class="flex items-center justify-between flex-wrap bg-teal p-4">
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">BeSocial</span>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          @click="toggle">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="isOpen ? 'block': 'hidden'"
      class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <nuxt-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
          Home
        </nuxt-link>
        <div class="relative block mt-4 lg:inline-block lg:mt-0 mr-4">
          <div
            class="cursor-pointer text-teal-lighter hover:text-white"
            @click="showNotification = !showNotification">
            <notification-svg
              class="fill-current"
              width="18"
              height="16"/>
            <span>Notification</span>
          </div>
          <notification
            v-if="showNotification"
            :do="handleClickOutside"
            class="rounded shadow-md mt-2 absolute pin-t-1 pin-l z-10 bg-white"/>
        </div>
      </div>
      <div>
        <button
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
          @click="doLogout"
        >Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import Notification from '~/components/Notification.vue'
import NotificationSvg from '@/static/images/notification.svg'

export default {
  components: {
    Notification,
    NotificationSvg
  },
  data() {
    return {
      isOpen: false,
      showNotification: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    doLogout() {
      this.$auth.logout().then(res => {
        this.$router.replace({ path: '/auth/login' })
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
