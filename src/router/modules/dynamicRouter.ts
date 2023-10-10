import { LOGIN_URL } from '@/config'
import router from '@/router/index'
import { useAuthStore } from '@/stores/modules/auth'
import { useUserStore } from '@/stores/modules/user'
import { ElNotification } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouter = async () => {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  try {
    await authStore.getAuthMenuList()
    if (!authStore.authMenuListGet.length) {
      ElNotification({
        title: '无权险限访问',
        message: '当前账号无任何菜单权限,请联系管理员',
        type: 'warning',
        duration: 3000
      })
      userStore.setToken("")
      router.replace(LOGIN_URL)
      return Promise.reject('No Premission')
    }
    authStore.flatMenuListGet.forEach(item => {
      item.children && delete item.children
      if (item.component && typeof item.component == 'string') {
        item.component = modules["/src/views" + item.component + ".vue"]
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw);
      } else {
        router.addRoute("layout", item as unknown as RouteRecordRaw);
      }
    })

  } catch (error) {
    userStore.setToken("")
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}