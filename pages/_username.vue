<template>
  <section class="container">
    <div
      v-if="user"
      class="flex">
      <div class="w-1/4 mr-4">
        <left-sidebar
          :user="user"
          @refresh-user="refreshUser()"/>
      </div>
      <div class="w-3/5 mr-4">
        <main-content :user-id="user.id"/>
      </div>
      <div class="w-1/5">
        <right-sidebar/>
      </div>
    </div>
  </section>
</template>

<script>
import LeftSidebar from '~/components/LeftSidebar.vue'
import RightSidebar from '~/components/RightSidebar.vue'
import MainContent from '~/components/MainContent.vue'

export default {
  components: {
    RightSidebar,
    LeftSidebar,
    MainContent
  },
  asyncData({ params, redirect, $axios, app }) {
    if (app.$auth.user.username == params.username) {
      return { user: app.$auth.user, username: params.username }
    }

    return $axios
      .$get(`/user/username/${params.username}`)
      .then(res => {
        return { user: res.data, username: params.username }
      })
      .catch(err => {
        return redirect('/')
      })
  },
  data() {
    return {
      username: null,
      user: null
    }
  },
  methods: {
    refreshUser() {
      this.$axios.$get(`/user/username/${this.username}`).then(res => {
        this.user = res.data
      })
    }
  }
}
</script>
