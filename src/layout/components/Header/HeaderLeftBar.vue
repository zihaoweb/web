<template>
  <div class="left-bar">
    <CollapseIcon />
    <Breadcrumb />
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
</script>

<style scoped lang="scss">
.left-bar {
  display: flex;
  
}
</style>
