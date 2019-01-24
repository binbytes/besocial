<template>
  <div
    v-if="modal"
    class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex"
    @click.self="toggleModal">
    <div class="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">
      <single-post :post="post"/>

      <form
        class="flex flex-col bg-teal-lightest py-3 px-8"
        @submit.prevent="postComment">
        <textarea
          v-model="text"
          :class="{ focus : show }"
          class="shadow border rounded w-full py-2 px-3 text-grey-darker leading-tight resize-none"
          @blur="postBlur(text)"
          @focus="show = true" />
        <button
          v-if="show"
          :disabled="!text"
          class="ml-auto mt-2 bg-transparent hover:bg-teal-dark border text-teal border-teal hover:text-white py-2 px-6 rounded-full"
          type="submit">Comment</button>
      </form>

      <div
        v-if="showLoader"
        class="flex justify-center p-2">
        <div class="loader"/>
      </div>

      <div
        v-for="comment in comments"
        :key="comment.id"
        class="mt-2 border-b">
        <div class="flex py-2 px-6">
          <img
            class="user-avatar rounded-full mx-1 p-1"
            src="images/default-avatar.jpg"
            height="40"
            width="40"
            alt="User avatar">
          <div class="ml-4"> 
            <span class="text-black font-bold">{{ comment.author.name }}</span><br>
            <span class="text-grey-dark font-light">@<b>foodpandaIndia</b> 8am</span><br>
            <span class="text-sm leading-loose">{{ comment.comment }}</span>
          </div>
        </div>
      </div>
      <span
        class="absolute pin-t pin-r"
        @click="toggleModal">
        <svg
          class="h-8 w-8 fill-current text-grey p-1 hover:text-grey-darkest"
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
import ChatSvg from '@/static/images/comment.svg'
import LikeSvg from '@/static/images/like.svg'
import SinglePost from '~/components/SinglePost.vue'

export default {
  components: {
    ChatSvg,
    LikeSvg,
    SinglePost
  },
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      modal: true,
      text: '',
      comments: [],
      show: false,
      showLoader: false
    }
  },
  mounted() {
    this.getComments()

    this.$bus.$on('open-post-show', () => {
      this.modal = true
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
        .then(() => {
          this.text = ''
          this.show = false
          this.getComments()
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
        this.show = false
      }
    }
  }
}
</script>

<style>
textarea {
  height: 40px;
}
textarea.focus {
  height: 80px;
}
.bg-smoke-dark,
.hover\:bg-smoke-dark:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.loader {
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid blue;
  border-bottom: 6px solid blue;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>