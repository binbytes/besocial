<template>
  <div class="left-sidebar shadow-lg py-4 px-2 bg-white">
    <div class="header px-8 mb-6 text-center">
      <h3 v-text="user.name" />
      <h4
        class="text-grey-dark font-light"
        v-text="`@${user.username}`" />
      <img
        class="user-avatar"
        src="images/default-avatar.jpg"
        alt="User avatar">
    </div>
    <div class="flex justify-between px-5">
      <div>
        <h5 class="text-grey-darker">Tweets</h5>
        <span class="counts">{{ user.postsCount }}</span>
      </div>
      <div>
        <h5 class="text-grey-darker">Following</h5>
        <span class="counts">{{ user.followingCount }}</span>
      </div>
      <div>
        <h5 class="text-grey-darker">Followers</h5>
        <span class="counts">{{ user.followersCount }}</span>
      </div>
    </div>
    <div 
      v-if="$auth.user.username != user.username"
      class="flex justify-center mt-3">
      <button
        v-if="!user.isFollowing"
        class="bg-transparent hover:bg-teal-dark border text-teal border-teal hover:text-white p-2 w-24 rounded-full mr-2"
        @click="toggleFollow">Follow</button>
      <button
        v-else
        class="bg-teal hover:bg-teal-dark text-white p-2 w-24 rounded-full"
        @click="toggleFollow">Following</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  methods: {
    toggleFollow() {
      this.$axios.$post(`users/${this.user.id}/follow`).then(res => {
        this.updateUser()
        this.$auth.fetchUser()
      })
    },
    updateUser() {
      this.$emit('refresh-user')
    }
  }
}
</script>

<style>
.header {
  position: relative;
}
.left-sidebar .user-avatar {
  border-radius: 50%;
  height: 70px;
  left: 3%;
  position: absolute;
  top: -90%;
  width: 70px;
}
.counts {
  @apply inline-block leading-normal text-xl font-semibold text-blue;
}
</style>
