import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Vue from 'vue'

export default ({ app }) => {
  Vue.prototype.$echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.PUSHER_KEY,
    wsHost: process.env.WEBSOCKET_HOST,
    wsPort: 6001,
    disableStats: true,
    authEndpoint: process.env.API_URL + '/broadcasting/auth',
    auth: {
      headers: {
        Authorization: app.$axios.defaults.headers.common['Authorization']
      }
    }
  })
}
