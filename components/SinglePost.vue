<template>
  <div
    class="flex p-4 border-b cursor-pointer"
    @click="showPost">  
    <div class="w-12 py-1">
      <img
        class="rounded-full"
        src="images/default-avatar.jpg"
        height="40"
        width="40"
        alt="User avatar">
    </div>
    <div class="w-full pl-1">
      <span
        class="text-black font-bold leading-loose"
        v-text="post.author.name" />
      <span class="text-grey-dark font-light leading-loose">@<b>{{ post.author.name }}</b> 8am</span>
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
        
        <like-svg
          class="fill-current text-grey cursor-pointer"
          width="20"
          height="20"/>
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
    }
  }
}
</script>
