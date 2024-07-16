<template>
    <div class="container">
      <a-card style="width: 700px">
        <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
          @finish="onFinish" @finishFailed="onFinishFailed" :disabled="loading">
          <a-form-item label="Username" name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" :loading="loading">Lolgin</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useAuthentication } from '../composables/useAuthentication';
import { FormLoginState } from '../interfaces/user';
import { storeToRefs } from 'pinia';
///import { useUserStore } from '@/stores/user';
const { loginUser,loading } = useAuthentication()
//const { loading } = storeToRefs(useUserStore)

const formState = ref<FormLoginState>({
  email: 'cris_itg5@yahoo.es',
  password: 'Admin1234_',
  remember: true,
});
const onFinish = (values: any) => {
  //console.log('Success:', values);
  loginUser(formState.value)
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style scoped>
.container {
  display: flex;
  background-color: #eeeeee;
  height: 650px;
  justify-content: center;
  align-items: center; 
}
</style>