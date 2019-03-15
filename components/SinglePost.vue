<template>
  <div
    class="flex px-4 py-3">
    <div class="w-12 py-1">
      <nuxt-link
        :to="`/${post.author.username}`">
        <img
          :src="post.author.avatar? post.author.avatar : 'images/default-avatar.png'"
          class="rounded-full w-10 h-10"
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
        class="cursor-pointer">
        <p
          class="text-grey-darkest font-light leading-normal text-sm"
          @click="showPost"
          v-text="post.text"/>
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
                class="w-full rounded-lg"
                @click="imageModal = true">
            </div>
            <div
              v-if="imageModal"
              class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark pb-1 flex">
              <div class="animated fadeInUp fixed md:relative pin-b pin-x align-top m-auto w-full h-full flex justify-center">
                <carousel
                  :center-mode="true"
                  :per-page="1"
                  :pagination-enabled="false"
                  :navigation-enabled="true"
                  class="flex justify-center m-10">
                  <slide
                    v-for="image in post.images"
                    :key="image.index"
                    class="text-center">
                    <img
                      :src="image"
                      class="w-102 h-102">
                  </slide>
                </carousel>
                <!-- Close Modal -->
                <span
                  class="absolute pin-t pin-r mt-5 mx-4"
                  @click="imageModal = false">
                  <close-svg
                    class="fill-current text-grey-lighter hover:text-grey"
                    width="17"
                    height="17"/>
                </span>
              </div>
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
import CloseSvg from '@/static/images/close.svg'

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
    LikeSvg,
    CloseSvg
  },
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      imageModal: false
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
.VueCarousel-navigation-button {
  color: config('colors.white');
}
</style>
