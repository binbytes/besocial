<template>
  <div class="shadow-lg bg-white">
    <create-post @add-post="addPost"/>

    <transition-group
      name="fade-left"
      tag="div">
      <single-post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        class="border-t hover:bg-grey-lighter"
        @post-selected="postSelected" 
        @update-post-like="updatePostLikeCount"/>
    </transition-group>

    <show-post @update-post-comment="updatePostCommentCount"/>

    <div
      v-if="showLoader & nextPage"
      class="flex justify-center p-2">
      <div class="loader"/>
    </div>
  </div>
</template>

<script>
import CreatePost from '~/components/CreatePost.vue'
import ShowPost from '~/components/ShowPost.vue'
import SinglePost from '~/components/SinglePost.vue'

export default {
  components: {
    CreatePost,
    ShowPost,
    SinglePost
  },
  props: {
    userId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      posts: [],
      nextPage: 1,
      showLoader: false
    }
  },
  mounted() {
    this.getPost()
    this.bindScrollEvent()
  },
  methods: {
    bindScrollEvent() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.getPost()
        }
      }
    },
    getPost() {
      this.showLoader = true

      this.$axios
        .$get('/posts/' + (this.userId ? this.userId : ''), {
          params: {
            page: this.nextPage
          }
        })
        .then(res => {
          this.posts = this.posts.concat(res.data)
          if (res.meta.last_page) {
            this.nextPage++
          } else {
            this.nextPage = null
          }
          this.showLoader = false
        })
    },
    addPost(post) {
      this.posts.unshift(post)
    },
    updatePostCommentCount(e) {
      let index = this.posts.findIndex(x => x.id == e.id)

      if (index > -1) {
        this.posts[index].totalComment = e.totalComment
      }
    },
    updatePostLikeCount(e) {
      let index = this.posts.findIndex(x => x.id == e.id)

      if (index > -1) {
        this.posts[index].isLiked = e.isLiked
        this.posts[index].likedCount = e.likedCount
      }
    },
    postSelected(post) {
      this.$bus.$emit('open-post-show', post)
    }
  }
}
</script>
