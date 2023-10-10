import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createPinia} from 'pinia'

const pinia = createPinia()

//本地数据持久化
pinia.use(piniaPluginPersistedstate)

export default pinia