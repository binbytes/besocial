<template>
  <on-click-outside :do="handleClickOutside">
    <div class="inline-block mr-2 relative mt-4 lg:mt-0">
      <input
        v-model="searchText"
        type="text"
        placeholder="Search user"
        class="border border-grey-light bg-teal-lightest text-sm px-4 py-2 leading-none rounded-full">
      <div class="absolute pin-t pin-r my-2 mr-3">
        <search class="w-4 h-4"/>
      </div>
      <div
        v-if="showSearch"
        class="rounded shadow-md mt-2 w-64 absolute pin-t-1 pin-l z-10 bg-white">
        <div
          v-for="user in users"
          :key="user.id">
          <nuxt-link
            :to="`/${user.username}`"
            class="flex p-2 border-b hover:bg-grey-lighter">
            <img
              :src="user.avatar ? user.avatar : 'images/default-avatar.png'"
              class="rounded-full w-8 h-8 my-1 ml-1"
              alt="User avatar">
            <div class="ml-3">
              <span class="text-grey-darkest font-normal leading-loose"> {{ user.name }} </span>
              <span class="text-grey-dark text-sm font-thin leading-loose">@{{ user.username }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import Search from '@/static/images/search.svg'
import OnClickOutside from '~/components/OnClickOutside.vue'

export default {
  components: {
    Search,
    OnClickOutside
  },
  data() {
    return {
      searchText: '',
      users: [],
      showSearch: false
    }
  },
  watch: {
    searchText: {
      handler() {
        if (!this.searchText) {
          this.users = []
        } else {
          this.$axios
            .$post(`users/search`, { query: this.searchText })
            .then(res => {
              this.users = res.data
              this.showSearch = true
            })
        }
      },
      deep: true
    },
    $route: {
      handler() {
        this.showSearch = false
        this.searchText = ''
      },
      deep: true
    }
  },
  methods: {
    handleClickOutside() {
      if (this.showSearch) {
        this.showSearch = false
      }
    }
  }
}
</script>
