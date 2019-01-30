<template>
  <nav
    id="navbar"
    class="flex items-center justify-between flex-wrap bg-teal p-4">
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <nuxt-link
        to="/"
        class="font-semibold text-white text-xl tracking-tight">BeSocial</nuxt-link>
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
        <notifications/>
        <div
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter cursor-pointer hover:text-white mr-4"
          @click="showMessage = true">Messages
        </div>
        <conversation-modal
          v-if="showMessage"
          @close-modal="showMessage = false"/>
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
import Notifications from '~/components/Notifications.vue'
import ConversationModal from '~/components/ConversationModal.vue'

export default {
  components: {
    Notifications,
    ConversationModal
  },
  data() {
    return {
      isOpen: false,
      showMessage: false
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
    }
  }
}
</script>
