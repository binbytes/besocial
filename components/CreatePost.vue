<template>
  <div class="flex p-4 bg-blue-lightest">
    <div class="w-12 text-right pr-1">
      <img
        class="rounded-full w-8 h-8"
        src="images/default-avatar.png"
        alt="User avatar">
    </div>
    <div class="w-full pl-1">
      <form
        class="w-full text-right"
        @submit.prevent="addPost">
        <textarea
          v-model="text"
          :class="{ focus : showInput }"
          class="shadow border rounded w-full py-2 px-3 text-grey-darker leading-tight resize-none new-post"
          placeholder="Post"
          @blur="postBlur(text)"
          @focus="showInput = true" />
        <button
          v-if="showInput"
          :disabled="!text"
          :class="{ disable : text }"
          class="mt-2 bg-transparent border text-teal border-teal py-2 px-6 rounded-full cursor-wait"
          type="submit">Tweet</button>
      </form>
    </div>
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
    addPost() {
      this.$axios.$post('/posts', { text: this.text }).then(res => {
        this.text = ''
        this.showInput = false
        this.$emit('add-post', res.data)
      })
    },
    postBlur(text) {
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
