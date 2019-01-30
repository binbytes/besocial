<template>
  <div>
    <div
      v-for="user in users"
      :key="user.id"
      @click="$emit('open-chat', user)">
      <div
        v-if="user.id != authUser.id"
        class="flex py-2 px-6 border-b hover:bg-grey-lighter cursor-pointer">
        <img
          class="rounded-full w-8 h-8 my-1 ml-1"
          src="images/default-avatar.png"
          alt="User avatar">
        <div class="ml-3">
          <span class="text-grey-darkest font-normal leading-loose"> {{ user.name }} </span>
          <span class="text-grey-dark text-sm font-thin leading-loose">@{{ user.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: null
    }
  },
  computed: {
    authUser() {
      return this.$auth.user
    }
  }
}
</script>
