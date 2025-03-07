<script>
import {ref, onMounted} from 'vue';
import http from '@/utils/api.js'
import router from "@/router/index.js"
import {useUserStore} from "@/store/user.ts";
import {storeToRefs} from 'pinia'
import {ElMessage} from "element-plus";


export default {
  setup() {
    const password = ref('')
    const username = ref('')
    const userStore = useUserStore()
    onMounted(() => {
      http.post("/login_h_kuai").then(
          res => {
            console.log('login_h_kuai')
            console.log(res)
            if(res.code === 0){
              ElMessage({
                message:`${res.msg}`,
                type:'error',
                duration: 2000
              })
              return;
            }
            if (res.code === 1){
              userStore.user = res.data
              ElMessage({
                message:`快登成功`,
                type:'success',
                duration: 10000
              })
              console.log("存入全局user中的数据:",useUserStore().user)
              router.push('/user')
            }
          }
      ).catch(
          err => {
            console.log(err)
          }
      )
    })
    const handleLogin = async () => {
      try {
        const response = await http.post("/login_h", {
          username: username.value,
          password: password.value
        })
        console.log(response.msg)
        if (response.code===1) {
          ElMessage({
            message:`登录成功`,
            type:'success',
            duration: 1000
          })
          localStorage.setItem('token', response.msg)
          userStore.user = response.data
          console.log("存入全局user中的数据:",useUserStore().user)
          await router.push('/user')
        }else{
          ElMessage({
            message:`${response.msg}`,
            type:'error',
            duration: 2000
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
    return {
      username,
      password,
      handleLogin
    }

  }
}
</script>
<template>
  <div class="flex items-center justify-content-center w-72">
    <div class="frosted-glass p-10 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-center text-[#6495ED] text-2xl mb-5">登陆</h1>
      <p class="text-center text-[#ADD8E6] text-sm mb-5">每一次登陆都是与你的邂逅。</p>
      <form @submit.prevent>
        <input type="text" v-model="username" placeholder="用户名" class="input-field mb-5" />
        <input type="password" v-model="password" placeholder="密码" class="input-field mb-5" />
        <div class="flex justify-between items-center mb-5">
          <label class="text-gray-600 text-sm">
            <input type="checkbox" class="mr-2" />
            记住密码
          </label>
          <a href="/zhuce.html" class="text-[#6495ED] text-sm no-underline">注册</a>
        </div>
        <button @click="handleLogin" style="margin: 0 20px" class="w-40 bg-[#6495ED] text-white p-2 rounded-md text-base cursor-pointer">
          登陆
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 这里可以添加额外的样式 */
.frosted-glass {
  background: rgba(70, 130, 180, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid #404040;
}
.input-field {
  color: #000000;
  width: 100%;
  padding: 10px;
  border: 1px solid #6495ED;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* 输入框聚焦时的样式 */
.input-field:focus {
  border-color: #87CEFA;
  box-shadow: 0 0 10px rgba(100, 149, 237, 0.5);
  outline: none;
  color: #0064ff;
}
</style>
