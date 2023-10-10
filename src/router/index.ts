import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRouter, errorRouter } from './modules/staticRouter'
import { useUserStore } from '@/stores/modules/user'
import NProgress from '@/config/progress'
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config'
import { useAuthStore } from '@/stores/modules/auth'
import { initDynamicRouter } from './modules/dynamicRouter'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore();

  NProgress.start()

  // 设置动态标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}`   : title;

  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (userStore.token) return next(from.fullPath);
    resetRouter();
    return next();
  }
  
  // // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // // 5.判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

  // // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuListGet.length) {
    // TODO:注册动态路由
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  // // 7.存储 routerName 做按钮权限筛选
  authStore.setRouteName(to.name as string);

  // 8.正常访问页面
  next();
})


/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  // const authStore = useAuthStore();
  // authStore.flatMenuListGet.forEach(route => {
  //   const { name } = route;
  //   if (name && router.hasRoute(name)) router.removeRoute(name);
  // });
};

router.afterEach(() => {
  NProgress.done();
});

export default router
