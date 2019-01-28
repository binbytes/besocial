<template>
  <div
    v-if="post && modal"
    class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark pb-1 flex"
    @click.self="toggleModal">
    <div class="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">
      <div class="px-3">
        <single-post 
          :post="post"
          @update-post-like="updatePostLikeCount"/>
      </div>
      <div class="flex bg-teal-lightest py-3 px-8">
        <div class="w-12 text-right pr-2">
          <img
            class="rounded-full w-8 h-8"
            src="images/default-avatar.png"
            alt="User avatar">
        </div>
        <form
          class="flex flex-col w-full bg-blue-lightest"
          @submit.prevent="postComment">
          <textarea
            v-model="text"
            :class="{ focus : showInput }"
            class="shadow border rounded w-full py-2 px-3 text-grey-darker leading-tight resize-none"
            placeholder="Comment"
            @blur="postBlur(text)"
            @focus="showInput = true" />
          <button
            v-if="showInput"
            :disabled="!text"
            :class="{ disable : text }"
            class="ml-auto mt-2 bg-transparent border text-teal border-teal py-2 px-6 rounded-full cursor-wait"
            type="submit">Comment</button>
        </form>
      </div>
      <div
        v-if="showLoader"
        class="flex justify-center p-2">
        <div class="loader"/>
      </div>

      <transition-group
        name="fade-left"
        tag="div">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="border-t hover:bg-grey-lighter">
          <div class="flex py-2 px-6">
            <img
              class="rounded-full w-10 h-10 my-1 ml-1"
              src="images/default-avatar.png"
              alt="User avatar">
            <div class="ml-3">
              <nuxt-link
                :to="`/${comment.author.username}`">
                <span class="text-grey-darkest font-normal leading-loose">{{ comment.author.name }}</span>
                <span class="text-grey-dark text-sm font-thin leading-loose">@{{ comment.author.username }} 8am</span><br>
              </nuxt-link>
              <span class="text-grey-darkest font-light leading-normal text-sm">{{ comment.comment }}</span>
            </div>
          </div>
        </div>
      </transition-group>

      <span
        class="absolute pin-t pin-r"
        @click="toggleModal">
        <svg
          class="h-10 w-10 fill-current text-grey p-2 hover:text-grey-darkest"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import SinglePost from '~/components/SinglePost.vue'

export default {
  components: {
    SinglePost
  },
  data() {
    return {
      modal: true,
      text: '',
      comments: [],
      showInput: false,
      showLoader: false,
      post: null
    }
  },
  mounted() {
    this.$bus.$on('open-post-show', post => {
      this.modal = true
      this.post = post

      this.getComments()
    })
  },
  methods: {
    getComments() {
      this.showLoader = true

      this.$axios.$get(`posts/${this.post.id}/comments`).then(res => {
        this.comments = res.data
        this.showLoader = false

        this.updatePostCounts()
      })
    },
    postComment() {
      this.$axios
        .$post(`posts/${this.post.id}/comments`, { text: this.text })
        .then(res => {
          this.text = ''
          this.showInput = false
          this.comments.unshift(res.data)
          this.updatePostCounts()
        })
    },
    updatePostCounts() {
      this.$emit('update-post-comment', {
        id: this.post.id,
        totalComment: this.comments.length
      })
    },
    toggleModal() {
      this.modal = !this.modal
    },
    postBlur(text) {
      if (!text) {
        this.showInput = false
      }
    },
    updatePostLikeCount(e) {
      this.post.likedCount = e.likedCount
      this.post.isLiked = e.isLiked
    }
  }
}
</script>

<style>
textarea {
  height: 40px;
  transition: height 0.2s ease-out;
}
textarea.focus {
  height: 80px;
}
.bg-smoke-dark,
.hover\:bg-smoke-dark:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.disable {
  @apply bg-teal-dark text-white cursor-pointer;
}
</style>
