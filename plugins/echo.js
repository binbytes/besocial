import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default ({ app }, inject) => {
  app.$echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.PUSHER_KEY,
    wsHost: process.env.WEBSOCKET_HOST,
    wsPort: 6001,
    disableStats: true
  })
}
