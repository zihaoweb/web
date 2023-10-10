<template>
  <Tabs v-show="tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition
        appear
        name="fade-transform"
        mode="out-in"
      >
        <keep-alive :include="keepAliveName">
          <component
            :is="Component"
            v-if="isRouterShow"
            :key="route.fullPath"
          ></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-show="footer">
    <Footer />
  </el-footer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Tabs from "../Tabs/index.vue";
import { storeToRefs } from "pinia";
import Footer from "../Footer/index.vue";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const { footer, tabs, layout } = storeToRefs(globalStore);

const isRouterShow = ref(true);
const keepAliveStore = useKeepAliveStore();
const { keepAliveName } = storeToRefs(keepAliveStore);

watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute("class", layout.value);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
