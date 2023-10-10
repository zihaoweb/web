<template>
  <component :is="LayoutComponent[layout]" />
</template>

<script setup lang="ts">
import { LayoutType } from "@/stores/interface";
import { computed, type Component } from "vue";
import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from "./LayoutClassic/index.vue";
import LayoutTransverse from "./LayoutTransverse/index.vue";
import LayoutColumns from "./LayoutColumns/index.vue";
import { useGlobalStore } from "@/stores/modules/global.ts";

const LayoutComponent: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
};

const globalStore = useGlobalStore();

const layout = computed(() => globalStore.layout);
</script>

<style scoped lang="scss">
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>
