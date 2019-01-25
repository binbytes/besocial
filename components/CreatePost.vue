<template>
  <div class="flex p-4 bg-teal-lightest">
    <img
      class="rounded-full w-8 h-8 mr-2"
      src="images/default-avatar.jpg"
      alt="User avatar">
    <form
      class="w-full text-right"
      @submit.prevent="postTweet">
      <textarea
        v-model="text"
        :class="{ focus : showInput }"
        class="shadow border rounded w-full py-2 px-3 text-grey-darker leading-tight resize-none new-post"
        @blur="tweetBlur(text)"
        @focus="showInput = true" />
      <button
        v-if="showInput"
        :disabled="!text"
        :class="{ disable : text }"
        class="mt-2 bg-transparent border text-teal border-teal py-2 px-6 rounded-full cursor-wait"
        type="submit">Tweet</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      showInput: false
    }
  },
  methods: {
    postTweet() {
      this.$axios.$post('/posts', { text: this.text }).then(res => {
        this.text = ''
        this.showInput = false
        this.$emit('add-post', res.data)
      })
    },
    tweetBlur(text) {
      if (!text) {
        this.showInput = false
      }
    }
  }
}
</script>

<style>
textarea.new-post {
  height: 40px;
  transition: height 0.2s ease-out;
}
textarea.new-post.focus {
  height: 80px;
}
.disable {
  @apply bg-teal-dark text-white cursor-pointer;
}
</style>
