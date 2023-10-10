<template>
  <el-icon
    class="collapse-icon"
    @click="changeClooapse"
  >
    <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const changeClooapse = () =>
  globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
  color: var(--el-header-text-color);
}
</style>
