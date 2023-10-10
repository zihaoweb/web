import { defineStore } from 'pinia'
import { TabsMenuProps, TabsState } from '../interface'
import { useKeepAliveStore } from './keepAlive'
import router from '@/router'

const keepAliveStore = useKeepAliveStore()

export const useTabStore = defineStore({
  id: 'tabs',
  state: (): TabsState => ({
    tabList: []
  }),
  getters: {
    getTabList: store => store.tabList
  },
  actions: {
    async setTabItem(item: TabsMenuProps) {
      if (this.tabList.every(v => v.path !== item.path)) {
        this.tabList.push(item)
      }
      if (!keepAliveStore.keepAliveName.includes(item.name) && item.isKeepAlive) {
        keepAliveStore.addKeepAliveName(item.name)
      }
    },
    async removeTabItem(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.tabList.forEach((item, index) => {
          if (item.path !== tabPath) return
          const nextPath = this.tabList[index + 1] || this.tabList[index - 1]
          if (!nextPath) return
          router.push(nextPath.path)
        })
      }
      //移除tabItem
      const tabItem = this.tabList.find(v => v.path === tabPath)
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.name)
      //set tabList 
      this.tabList = this.tabList.filter(v => v.path !== tabPath)
    }
    //关闭当前  close Current Tab
    //关闭右边  close Right Tab
    //关闭其他  close Other Tab
    //关闭全部  colse All Tab
  }
})