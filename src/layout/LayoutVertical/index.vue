<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div
          class="aside-box"
          :style="{ width: isCollapse ? '65px' : '210px' }"
        >
          <div class="logo flex-center">
            <img
              class="logo-img"
              src="@/assets/images/logo-img.webp"
              alt="举国欢庆"
            />
            <span
              v-show="!isCollapse"
              class="logo-text"
            >
              举国欢庆
            </span>
          </div>
          <el-scrollbar>
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="accordion"
              :collapse-transition="false"
            >
              <SubMenu :menu-list="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderLeftBar />
          <HeaderRightBar />
        </el-header>
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/modules/global";
import { useAuthStore } from "@/stores/modules/auth";
import SubMenu from "../components/Menu/SubMenu.vue";
import Main from "../components/Main/index.vue";
import HeaderRightBar from "../components/Header/HeaderRightBar.vue";
import HeaderLeftBar from "../components/Header/HeaderLeftBar.vue";

const authStore = useAuthStore();
const globalStore = useGlobalStore();
const route = useRoute();

const activeMenu = computed(
  () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);

const menuList = computed(() => authStore.showMenuListGet);
const accordion = computed(() => globalStore.accordion);
const isCollapse = ref(false);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
