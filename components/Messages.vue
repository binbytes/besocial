<template>
  <div
    class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark pb-1 flex p-2"
    @click.self="toggleModal">
    <div class="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">
      <div v-show="showDirect">
        <div class="flex justify-between items-center border-b py-3 px-4">
          <span class="text-lg font-semibold">Direct Messages</span>
          <button
            class="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded-full mr-8"
            @click="[showNew = true, showDirect = false, showChat = false]">
            New message
          </button>
        </div>
        <div class="h-64 overflow-y-auto">
          <div
            v-for="n in 5"
            :key="n.index"
            class="flex py-2 px-6 border-b hover:bg-grey-lighter cursor-pointer"
            @click="[showNew = false, showDirect = false, showChat = true]">
            <img
              class="rounded-full w-10 h-10 my-1 ml-1"
              src="images/default-avatar.png"
              alt="User avatar">
            <div class="ml-3">
              <span class="text-grey-darkest font-normal leading-loose"> alex </span>
              <span class="text-grey-dark text-sm font-thin leading-loose">@alex</span><br>
              <span class="text-grey-darkest font-light leading-normal text-sm">hellow...... hoiiiiiiiii</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showNew">
        <div
          class="flex justify-center items-center border-b py-4 px-4">
          <span class="text-lg font-semibold">New Messages</span>
          <span
            class="absolute pin-t pin-l py-4 px-4"
            @click="[showNew = false, showDirect = true, showChat = false]">
            <left-arrow-svg
              class="fill-current text-grey"
              width="20"
              height="20"/>
          </span>
        </div>
        <div
          class="py-4">
          <span class="px-6">Send message to:</span>
          <div class="my-3 px-6">
            <input
              type="text"
              placeholder="Enter a name"
              class="shadow border border-teal-lighter rounded w-full py-2 px-3 text-grey-darker leading-tight">
          </div>
          <span class="px-6">Recent</span>
          <div class="h-64 overflow-y-auto">
            <div
              v-for="n in 5"
              :key="n.index"
              class="flex py-2 px-4 hover:bg-grey-lighter cursor-pointer"
              @click="[showNew = false, showDirect = false, showChat = true]">
              <img
                class="rounded-full w-8 h-8 my-1 ml-1"
                src="images/default-avatar.png"
                alt="User avatar">
              <div class="ml-3">
                <span class="text-grey-darkest font-normal leading-loose"> alex </span>
                <span class="text-grey-dark text-sm font-thin leading-loose">@alex</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showChat">
        <div
          class="flex justify-center items-center border-b py-3 px-4">
          <img
            class="rounded-full w-8 h-8 mr-2"
            src="images/default-avatar.png"
            alt="User avatar">
          <div>Chat with <span class="text-lg font-semibold">Alex</span></div>
          <span
            class="absolute pin-t pin-l py-4 px-4"
            @click="[showNew = true, showDirect = false, showChat=false]">
            <left-arrow-svg
              class="fill-current text-grey"
              width="20"
              height="20"/>
          </span>
        </div>
        <div>
          <div class="overflow-hidden">
            <div class="mt-2 p-4 overflow-hidden h-full w-full">
              <div class="clearfix flex justify-end items-center mb-4">
                <div class="p-2 inline-block border rounded bg-grey-light">
                  <p class="text-md pb-2">I am inviting you to start conversation with me</p>
                  <small class="text-grey-dark">01/28/2019 04:22</small>
                </div>
                <img
                  class="rounded-full w-8 h-8 ml-2"
                  src="images/default-avatar.png"
                  alt="User avatar">
              </div>
              <div class="clearfix flex justify-start items-center mb-4">
                <img
                  class="rounded-full w-8 h-8 mr-2"
                  src="images/default-avatar.png"
                  alt="User avatar">
                <div class="p-2 inline-block border rounded bg-grey-light">
                  <p class="text-md pb-2">I am inviting you to start conversation with me</p>
                  <small class="text-grey-dark">01/28/2019 04:22</small>
                </div>
              </div>
            </div>
            <div class="flex border-t align-bottom p-2 w-full">
              <textarea
                placeholder="Type your message"
                class="shadow border rounded w-full py-2 px-3 text-grey-darker leading-tight resize-none"/>
              <button class="bg-teal hover:bg-teal-dark text-white px-6 rounded-full ml-2">Send</button>
            </div>
            <div class="absolute"/>
          </div>
        </div>
      </div>
      <span
        class="absolute pin-t pin-r mt-3 mx-2"
        @click="toggleModal">
        <svg
          class="h-8 w-8 fill-current text-grey font-thin hover:text-grey-darkest"
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
import LeftArrowSvg from '@/static/images/left-arrow.svg'

export default {
  components: {
    LeftArrowSvg
  },
  data() {
    return {
      showDirect: true,
      showNew: false,
      showChat: false
    }
  },
  methods: {
    toggleModal() {
      this.$emit('close-modal')
    }
  }
}
</script>
