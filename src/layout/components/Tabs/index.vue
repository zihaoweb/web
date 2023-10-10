<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        v-model="tabMenuValue"
        type="card"
        @tab-click="clickTab"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in TabListMenu"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <el-icon
              v-show="item.icon && showIcons"
              class="tabs-icon"
            >
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTabStore } from "@/stores/modules/useTabStore";
import MoreButton from "./components/MoreButton.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { TabPaneName, TabsPaneContext } from 'element-plus'
import router from "@/router";

const route = useRoute();
const tabList = useTabStore();
const globalStore = useGlobalStore();
const tabMenuValue = ref(route.fullPath);
const authStore = useAuthStore();

const TabListMenu = computed(() => tabList.getTabList);
const showIcons = computed(() => globalStore.tabsIcon);

onMounted(() => {
  initTabs();
});

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    tabMenuValue.value = route.fullPath;
    const tabParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean,
    };
    tabList.setTabItem(tabParams);
  },
  { immediate: true }
);

const initTabs = () => {
  authStore.authMenuList.forEach(v => {
    if (v.meta.isAffix && !v.meta.isHide && !v.meta.isFull) {
      const tabParams = {
        icon: route.meta.icon as string,
        title: route.meta.title as string,
        path: route.fullPath,
        name: route.name as string,
        close: !route.meta.isAffix,
        isKeepAlive: route.meta.isKeepAlive as boolean,
      }; 
      tabList.setTabItem(tabParams);
    }
  });
};

// Click Tab 
const clickTab = (tabItem:TabsPaneContext) => {
  const fullPath = tabItem.props.name as string
  router.push(fullPath)
}

// Remove Tab
const removeTab = (fullPath: TabPaneName) => {
  tabList.removeTabItem(fullPath as string, fullPath == route.fullPath )
  
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
