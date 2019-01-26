<template>
  <section class="container">
    <div class="flex">
      <div class="w-1/4 mr-4">
        <left-sidebar
          v-if="$auth.user"
          :user="$auth.user"/>
      </div>
      <div class="w-3/5 mr-4">
        <main-content/>
      </div>
      <div class="w-1/5">
        <right-sidebar/>
      </div>
    </div>
  </section>
</template>

<script>
import LeftSidebar from '~/components/LeftSidebar.vue'
import RightSidebar from '~/components/RightSidebar.vue'
import MainContent from '~/components/MainContent.vue'

export default {
  // middleware: 'auth',
  components: {
    RightSidebar,
    LeftSidebar,
    MainContent
  }
}
</script>
