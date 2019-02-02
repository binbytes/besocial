<template>
  <div
    class="flex px-4 py-3">
    <div class="w-12 py-1">
      <nuxt-link
        :to="`/${post.author.username}`">
        <img
          class="rounded-full w-10 h-10"
          src="images/default-avatar.png"
          alt="User avatar">
      </nuxt-link>
    </div>
    <div class="w-full pl-1">
      <nuxt-link
        :to="`/${post.author.username}`">
        <span
          class="text-grey-darkest font-normal leading-loose"
          v-text="post.author.name" />
        <span class="text-grey-dark text-sm font-thin leading-loose">@{{ post.author.username }} 8am</span>
      </nuxt-link>
      <div
        class="cursor-pointer"
        @click="showPost">
        <p
          class="text-grey-darkest font-light leading-normal text-sm"
          v-text="post.text" />
        <div
          v-if="chunkedImages.length"
          class="flex items-center border rounded-lg mt-2 bg-white">
          <div
            v-for="(mediaGroup, index) in chunkedImages"
            :key="index"
            class="flex-1 self-stretch flex flex-col">
            <div
              v-for="(media, index) in mediaGroup"
              :key="index"
              class="flex-1 self-stretch">
              <img
                :src="media"
                class="w-full rounded-lg">
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-3">
        <div
          class="flex items-center mr-6 cursor-pointer"
          @click="showPost">
          <chat-svg
            class="fill-current text-grey mr-1"
            width="20"
            height="20"/>
          <span
            class="text-grey-darker"
            v-text="post.totalComment" />
        </div>

        <div class="flex items-center mr-6 cursor-pointer">
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
const chunkArray = (array, size) => {
  const chunked_arr = []
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1]
    if (!last || last.length === size) {
      chunked_arr.push([array[i]])
    } else {
      last.push(array[i])
    }
  }

  return chunked_arr
}

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
  computed: {
    chunkedImages() {
      return chunkArray(this.post.images, this.post.images.length > 2 ? 2 : 1)
    }
  },
  methods: {
    showPost() {
      this.$emit('post-selected', this.post)
    },
    toggleLike() {
      this.$axios.$post(`posts/${this.post.id}/like`).then(() => {
        this.updateLikeCounts()
        this.$bus.$emit('unread-count')
      })
    },
    updateLikeCounts() {
      this.$emit('update-post-like', {
        id: this.post.id,
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
