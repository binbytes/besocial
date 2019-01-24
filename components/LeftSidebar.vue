<template>
  <div class="shadow-lg py-4 px-2 bg-white">
    <div class="header px-8 mb-6 text-center">
      <h3 v-text="authUser.name" />
      <h4
        class="text-grey-dark font-light"
        v-text="`@${authUser.username}`" />
      <img
        class="user-avatar"
        src="images/default-avatar.jpg"
        alt="User avatar">
    </div>
    <div class="flex justify-between px-5">
      <div>
        <h5 class="text-grey-darker">Tweets</h5>
        <span class="counts">312</span>
      </div>
      <div>
        <h5 class="text-grey-darker">Following</h5>
        <span class="counts">312</span>
      </div>
      <div>
        <h5 class="text-grey-darker">Followers</h5>
        <span class="counts">312</span>
      </div>
    </div>
    <div class="flex justify-center mt-3">
      <button class="bg-transparent hover:bg-teal-dark border text-teal border-teal hover:text-white p-2 w-24 rounded-full mr-2">Follow</button>
      <button class="bg-teal hover:bg-teal-dark text-white p-2 w-24 rounded-full">Following</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    authUser() {
      return this.$auth.user
    }
  }
}
</script>

<style>
.header {
  position: relative;
}
.user-avatar {
  border-radius: 50%;
  height: 70px;
  left: 3%;
  position: absolute;
  top: -90%;
  width: 70px;
}
.counts {
  @apply inline-block pt-1 text-xl font-semibold text-blue;
}
</style>
