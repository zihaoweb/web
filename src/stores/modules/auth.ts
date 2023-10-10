import { defineStore } from 'pinia'
import { AuthState } from '../interface'
import { getFlatMenuList, getShowMenuList } from '@/utils';
import { getAuthMenuListApi } from '@/api';

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: ""
  }),
  getters: {
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
  },
  actions: {
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi()
      this.authMenuList = data;
    },
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    }
  }

})