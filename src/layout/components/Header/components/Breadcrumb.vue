<template>
  <div
    :class="[
      'breadcrumb-box mask-image',
      !globalStore.breadcrumbIcon && 'no-icon',
    ]"
  >
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
        <div class="is-link" @click="onBreadcrumbClick(item, index)">
          <el-icon v-show="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon" >
            <component :is="item.meta.icon"></component>
          </el-icon>
        </div>
      </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import { ArrowRight } from "@element-plus/icons-vue";
import { computed } from "vue";

const globalStore = useGlobalStore();

const breadcrumbList = computed(() => {});
</script>

<style scoped lang="scss"></style>
