<template>
  <div class="absolute w-64 mx-auto">
    <ul class="list-reset">
      <li class="flex border-b p-4">
        <img
          class="rounded-full border bg-grey-darkest w-8 h-8 mr-2"
          src="images/default-avatar.png"
          alt="User avatar">
        <div class="text-sm leading-tight text-grey-darker">
          <p>
            <span class="text-base text-teal leading-tight">Bit </span>
            Followed
            <span class="text-base text-teal leading-tight"> you </span>
          </p>
          <p>Jan 23</p>
        </div>
      </li>
      <li class="flex border-b p-4">
        <img
          class="rounded-full border bg-grey-darkest w-8 h-8 mr-2"
          src="images/default-avatar.png"
          alt="User avatar">
        <div class="text-sm leading-tight text-grey-darker">
          <p>
            <span class="text-base text-teal leading-tight">Directus </span>
            Liked
            <span class="text-base text-teal leading-tight">  your post </span>
          </p>
          <p>Jan 23</p>
        </div>
      </li>
      <li class="flex border-b p-4">
        <img
          class="rounded-full border bg-grey-darkest w-8 h-8 mr-2"
          src="images/default-avatar.png"
          alt="User avatar">
        <div class="text-sm leading-tight text-grey-darker">
          <p>
            <span class="text-base text-teal leading-tight">Directus </span>
            Commented
            <span class="text-base text-teal leading-tight">  your post </span>
          </p>
          <p>Jan 23</p>
        </div>
      </li>
    </ul>
  </div> 
</template>

<script>
export default {
  props: {
    do: {
      type: Object,
      default: null
    }
  },
  mounted() {
    const listener = e => {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.do()
      }
    }
    document.addEventListener('click', listener)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', listener)
    })
  },
  render() {
    return this.$slots.default[0]
  }
}
</script>
