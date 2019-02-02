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
        class="w-full"
        @submit.prevent="addPost">
        <textarea
          v-model="text"
          :class="{ focus : showInput }"
          class="w-full border rounded py-2 px-3 text-grey-darker leading-tight resize-none new-post"
          placeholder="Post"
          @blur="postBlur(text)"
          @focus="showInput = true" />
        <div
          v-if="images.length"
          class="flex flex-wrap border rounded px-2">
          <add-image
            v-for="(image, index) in images"
            :key="index"
            :image="image"
            @remove-image="removeImage"/>
        </div>
        <div
          v-if="showInput"
          class="flex items-center justify-between mt-2">
          <button
            type="button"
            @click="selectImage">
            <picture-svg class="w-6 h-6"/>
          </button>
          <input
            ref="input_post_media"
            type="file"
            name="post_media"
            class="hidden"
            accept="image/jpeg,image/jpg,image/png,"
            multiple=""
            @change="fileChange">
          <button
            :disabled="!text"
            :class="{ disable : text }"
            class="bg-transparent border text-teal border-teal py-2 px-6 rounded-full cursor-wait"
            type="submit">Tweet</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PictureSvg from '@/static/images/picture.svg'
import AddImage from '~/components/AddImages.vue'

export default {
  components: {
    PictureSvg,
    AddImage
  },
  data() {
    return {
      text: '',
      showInput: false,
      images: [],
      imageFile: []
    }
  },
  methods: {
    addPost() {
      let formData = new FormData()
      formData.append('text', this.text)

      for (let i = 0; i < this.imageFile.length; i++) {
        formData.append('images[' + i + ']', this.imageFile[i])
      }

      this.$axios
        .$post('/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.text = ''
          this.images = []
          this.showInput = false
          this.$emit('add-post', res.data)
        })
    },
    postBlur(text) {
      if (!text) {
        // this.showInput = false
      }
    },
    selectImage() {
      this.$refs['input_post_media'].click()
    },
    fileChange(e) {
      if (!e.target.files) {
        return
      }
      this.imageFile = e.target.files

      for (let i = 0; i < e.target.files.length; i++) {
        // if (appendFile) {
        //   this.imageFile.push(e.target.files[i])
        // }

        var reader = new FileReader()
        reader.onload = e => {
          this.images.push(e.target.result)
        }

        reader.readAsDataURL(e.target.files[i])
      }
    },
    removeImage(image) {
      this.images.splice(this.images.indexOf(image), 1)
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
