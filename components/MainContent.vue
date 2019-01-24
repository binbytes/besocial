<template>
  <div class="shadow-lg bg-white">
    <create-post @add-post="addPost"/>
    
    <single-post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @post-selected="postSelected" />

    <show-post
      v-if="selectedPost"
      :post="selectedPost"
      @update-post-comment="updatePostCommentCount"/>

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
  data() {
    return {
      posts: [],
      nextPage: 1,
      showLoader: false,
      selectedPost: null
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
        .$get('/posts', {
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
    postSelected(post) {
      this.selectedPost = post
      this.$bus.$emit('open-post-show')
    }
  }
}
</script>

<style>
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
