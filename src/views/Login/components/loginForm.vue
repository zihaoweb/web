<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="账号"
      prop="user_name"
    >
      <el-input
        v-model="ruleForm.user_name"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="user_password"
    >
      <el-input
        v-model="ruleForm.user_password"
        type="user_password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        登录
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  ElNotification,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router";
import { loginApi } from "@/api";
import { getTimeState } from "@/utils";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import { HOME_URL } from "@/config";

const ruleFormRef = ref<FormInstance>();
const userStore = useUserStore();
const router = useRouter();
const ruleForm = reactive({
  user_name: "admin",
  user_password: "123456",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  user_password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
  user_name: [{ required: true, trigger: "blur", message: "账号不能为空" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      const { data } = await loginApi(ruleForm);
      userStore.setToken(data.token);
      await initDynamicRouter();
      // 3.清空 tabs、keepAlive 数据
      // tabsStore.closeMultipleTab();
      // keepAliveStore.setKeepAliveName();

      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: "欢迎登录 admin",
        type: "success",
        duration: 3000,
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
