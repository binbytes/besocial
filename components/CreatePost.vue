<template>
  <div class="flex p-4 bg-teal-lightest">
    <img
      class="user-avatar mx-1 p-1 rounded-full"
      src="images/default-avatar.jpg"
      height="40"
      width="40"
      alt="user avatar">
    <form
      class="w-full text-right"
      @submit.prevent="postTweet">
      <textarea
        v-model="text"
        :class="{ focus : show }"
        class="shadow border rounded w-full py-2 px-3 text-grey-darker leading-tight resize-none new-post"
        @blur="tweetBlur(text)"
        @focus="show = true" />
      <button
        v-if="show"
        :disabled="!text"
        class="mt-2 bg-teal border-teal text-white py-2 px-6 rounded-full"
        type="submit">Tweet</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      show: false
    }
  },
  methods: {
    postTweet() {
      this.$axios.$post('/posts', { text: this.text }).then(res => {
        this.text = ''
        this.show = false
        this.$emit('add-post', res.data)
      })
    },
    tweetBlur(text) {
      if (!text) {
        this.show = false
      }
    }
  }
}
</script>

<style>
textarea.new-post {
  height: 40px;
}
textarea.new-post.focus {
  height: 80px;
}
</style>
