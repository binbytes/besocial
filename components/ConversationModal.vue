<template>
  <div
    class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark pb-1 flex p-2"
    @click.self="toggleModal">
    <div class="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center bg-white md:rounded w-full md:shadow flex flex-col">
      <!-- Conversations -->
      <div v-show="showDirect">
        <div class="flex justify-between items-center border-b py-3 px-4">
          <span class="text-lg font-semibold">Direct Messages</span>
          <button
            class="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded-full mr-8"
            @click="[showNew = true, showDirect = false, showChat = false]">
            New message
          </button>
        </div>
        <div class="h-102 overflow-y-auto">
          <conversations
            v-for="conversation in conversations"
            :key="conversation.index"
            :conversation="conversation"
            @open-chat="startConversation"
            @update-unread-message-count="updateUnreadMessageCount"/>
        </div>
      </div>

      <!-- New Conversation -->
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
        <div class="py-4">
          <span class="px-6">Send message to:</span>
          <form
            class="my-3 px-6"
            @submit.prevent="">
            <input
              v-model="findUser"
              type="text"
              placeholder="Enter a name"
              class="shadow border border-teal-lighter rounded w-full py-2 px-3 text-grey-darker leading-tight">
          </form>
          <span class="px-6 font-semibold">{{ findUser ? 'Pepole' : 'Recent' }}</span>
          <div class="h-84 overflow-y-auto border-t mt-2">
            <new-conversation
              v-if="findUser"
              :users="finderUser"
              @open-chat="startConversation"/>

            <new-conversation
              v-for="conversation in conversations"
              v-else
              :key="conversation.index"
              :users="conversation.users"
              @open-chat="startConversation"/>
          </div>
        </div>
      </div>

      <!-- show Conversation -->
      <div v-if="showChat">
        <div
          class="flex justify-center items-center border-b py-3 px-4">
          <img
            class="rounded-full w-8 h-8 mr-2"
            src="images/default-avatar.png"
            alt="User avatar">
          <div>
            <span class="text-lg font-semibold">{{ user.name }}</span><br>
            <span class="text-grey">@{{ user.username }}</span>
          </div>
          <span
            class="absolute pin-t pin-l py-4 px-4"
            @click="[showNew = false, showDirect = true, showChat=false]">
            <left-arrow-svg
              class="fill-current text-grey"
              width="20"
              height="20"/>
          </span>
        </div>
        <div
          v-scroll-bottom
          class="h-94 overflow-y-auto px-4 py-2">
          <div 
            v-for="message in conversation.messages"
            :key="message.id">
            <conversation :message="message"/>
          </div>
        </div>
        <chat-new-message @newMessage="sendMessage"/>
      </div>

      <!-- Close Modal -->
      <span
        class="absolute pin-t pin-r mt-5 mx-4"
        @click="toggleModal">
        <close-svg
          class="fill-current text-grey hover:text-grey-dark"
          width="17"
          height="17"/>
      </span>
    </div>
  </div>
</template>

<script>
import LeftArrowSvg from '@/static/images/left-arrow.svg'
import CloseSvg from '@/static/images/close.svg'
import Conversations from '~/components/Conversations.vue'
import NewConversation from '~/components/NewConversation.vue'
import Conversation from '~/components/Conversation.vue'
import ChatNewMessage from '~/components/ChatNewMessage.vue'

export default {
  components: {
    LeftArrowSvg,
    CloseSvg,
    Conversations,
    NewConversation,
    Conversation,
    ChatNewMessage
  },
  directives: {
    scrollBottom: {
      componentUpdated(el) {
        el.scrollTop = el.scrollHeight
      }
    }
  },
  data() {
    return {
      showDirect: true,
      showNew: false,
      showChat: false,
      conversations: '',
      conversation: '',
      user: '',
      findUser: '',
      finderUser: []
    }
  },
  watch: {
    findUser() {
      if (this.findUser) {
        this.$axios.$get(`users/search/${this.findUser}`).then(res => {
          this.finderUser = res.data
        })
      }
    }
  },
  mounted() {
    this.getAllConversation()
  },
  methods: {
    toggleModal() {
      this.$emit('close-modal')
    },
    getAllConversation() {
      this.$axios.$get(`conversations`).then(res => {
        this.conversations = res
      })
    },
    startConversation(user) {
      this.showNew = false
      this.showDirect = false
      this.showChat = true
      this.user = user
      this.$axios.$post(`conversations/${user.id}`).then(conversation => {
        this.$axios
          .$get(`conversations/${conversation.id}`)
          .then(conversation => {
            this.conversation = conversation
            this.bindEchoListner(conversation)
          })
      })
    },
    bindEchoListner(conversation) {
      this.$echo
        .private('conversation.' + conversation.id)
        .listen('\\App\\Events\\MessageSent', data => {
          this.conversation.messages.push(data.message)
        })
    },
    sendMessage(message) {
      this.$axios
        .$post(`conversations/${this.conversation.id}/message`, {
          text: message
        })
        .then(res => {
          //
        })
    },
    updateUnreadMessageCount(e) {
      let index = this.conversations.findIndex(x => x.id == e.id)

      if (index > -1) {
        this.conversations[index].unread_message_count = 0
      }
    }
  }
}
</script>
