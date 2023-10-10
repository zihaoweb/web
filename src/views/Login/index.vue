<template>
  <div class="login_container">
    <div class="login_mask">
      <div class="wrap_left">
        <img
          class="left_img"
          src=""
          alt=""
        />
      </div>
      <div class="wrap_right">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>欢迎回来~~</span>
            </div>
          </template>
          <div>
            <LoginFrom />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginFrom from "./components/loginForm.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
