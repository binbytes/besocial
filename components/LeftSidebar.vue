<template>
  <div class="left-sidebar shadow-lg bg-white">
    <div class="header">
      <div class="h-24 bg-teal-light"/>
      <img
        class="user-avatar"
        src="images/default-avatar.png"
        alt="User avatar">
      <div class="py-1 text-grey-darker pl-24 tracking-wide">
        <h3 v-text="user.name" />
        <h4
          class="text-grey-dark font-light tracking-wide"
          v-text="`@${user.username}`" />
      </div>
    </div>
    <div class="flex justify-between py-2 px-5">
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
      class="flex justify-center pb-2">
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
        this.$bus.$emit('unread-count')
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
  width: 70px;
  height: 70px;
  left: 4%;
  position: absolute;
  top: 45%;
  border: 3px solid white;
}
.counts {
  @apply inline-block leading-normal text-xl font-semibold text-blue;
}
</style>
