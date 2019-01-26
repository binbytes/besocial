<template>
  <div
    class="flex px-4 py-2 cursor-pointer hover:bg-grey-lighter"
    @click="showPost">
    <div class="w-12 py-1">
      <nuxt-link
        :to="`/${post.author.username}`">
        <img
          class="rounded-full w-10 h-10"
          src="images/default-avatar.jpg"
          alt="User avatar">
      </nuxt-link>
    </div>
    <div class="w-full pl-1">
      <nuxt-link
        :to="`/${post.author.username}`">
        <span
          class="text-black font-bold leading-loose"
          v-text="post.author.name" />
        <span class="text-grey-dark font-light leading-loose">@<b>{{ post.author.name }}</b> 8am</span>
      </nuxt-link>
      <p
        class="font-thin leading-normal"
        v-text="post.text" />
      <div class="flex mt-3">
        <div class="flex items-center mr-6">
          <chat-svg
            class="fill-current text-grey mr-1"
            width="20"
            height="20"/>
          <span
            class="text-grey-darker"
            v-text="post.totalComment" />
        </div>

        <div class="flex items-center mr-6">
          <like-svg
            :class="{ liked : post.isLiked }"
            class="fill-current text-grey mr-1"
            width="20"
            height="20"
            @click="toggleLike"/>
          <span
            class="text-grey-darker"
            v-text="post.likedCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatSvg from '@/static/images/comment.svg'
import LikeSvg from '@/static/images/like.svg'

export default {
  components: {
    ChatSvg,
    LikeSvg
  },
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  methods: {
    showPost() {
      this.$emit('post-selected', this.post)
    },
    toggleLike() {
      this.$axios.$post(`posts/${this.post.id}/like`).then(() => {
        this.updateLikeCounts()
      })
    },
    updateLikeCounts() {
      this.$emit('update-post-like', {
        isLiked: !this.post.isLiked,
        likedCount: this.post.isLiked
          ? parseInt(this.post.likedCount) - 1
          : parseInt(this.post.likedCount) + 1
      })
    }
  }
}
</script>

<style>
.liked {
  color: config('colors.red-light');
}
</style>
