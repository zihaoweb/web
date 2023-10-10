<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "./stores/modules/global";

const globalStore = useGlobalStore();

// init theme
const { initTheme } = useTheme();
initTheme();
</script>

<style lang="scss"></style>
