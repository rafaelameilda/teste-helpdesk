import VueNativeSock from 'vue-native-websocket'
import env from '../enviroments/env'

export default ({ Vue }) => {
    Vue.use(VueNativeSock, env.wsURL, {
        reconnection: true, // (Boolean) whether to reconnect automatically (false)
        reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
        reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
        format: 'json',        
    })
}