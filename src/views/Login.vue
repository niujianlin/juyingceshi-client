<template>
  <div class="login-panel">
    <n-card title="聚英云平台登录">
      <n-form :rules="rules" :model="admin">
        <n-form-item path="userName" label="账号">
          <n-input v-model:value="admin.userName" placeholder="请输入账号" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="admin.password"
            type="password"
            placeholder="请输入密码"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button @click="login">登录</n-button>
      </template>
    </n-card>
  </div>
</template>
  
  <script setup>
import { ref, reactive, inject } from "vue";
import { AdminStore } from "../stores/AdminStore";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const message = inject("message");
const axios = inject("axios");
const adminStore = AdminStore();

/**验证表单规则 */
let rules = {
  userName: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
  ],
};
/**管理员登录数据 */
const admin = reactive({
  userName: "",
  password: "",
});

/**登录 */
const login = async () => {
  let result = await axios.post(
    "https://oauthapi.juyingiot.com/api/v1/user/login-old",
    {
      clientType: "windowspcChrome",
      userName: admin.userName,
      password: admin.password,
    }
  );
  if (result.data.code == 200) {
    console.log("result = ", result);
    adminStore.pushUserName(admin.userName);
    // adminStore.userid = result.data.data.user.id;
    adminStore.pushToken(result.data.data.accesstoken);

    router.push("/home");
    message.info("登录成功");
  } else {
    console.log("result:", result);
    message.error("登录失败");
  }
};
</script>
  
  <style lang="scss" scoped>
</style>