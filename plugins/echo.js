import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Vue from 'vue'

export default () => {
  Vue.prototype.$echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.PUSHER_KEY,
    wsHost: process.env.WEBSOCKET_HOST,
    wsPort: 6001,
    disableStats: true
  })
}
