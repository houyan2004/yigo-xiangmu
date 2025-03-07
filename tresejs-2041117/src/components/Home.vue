<template>
  <div class="admin-container">
    <div class="header">
      <div class="logo">
        <img class="logo-img" src="https://mp-8dd34d12-2d1e-44ef-b563-4e772d50f668.cdn.bspapp.com/yigo/hy/image/img/001.png" alt="logo" />
      </div>
      <div class="title">
        <h1>颐购-管理系统</h1>
      </div>
      <div class="user">
        <div class="user-name">{{user.username}}</div>
        <div class="user-role">{{ "管理员" }}</div>
        <img class="avatar" :src="user.touxianimg?user.touxianimg:'https://mp-8dd34d12-2d1e-44ef-b563-4e772d50f668.cdn.bspapp.com/yigo/hy/image/img/suang.png'" alt="头像" />
      </div>
      <div class="logout">
        <button @click="goout_click" class="btn">退出</button>
      </div>
    </div>
    <div class="body">
      <div class="sidebar">
        <el-scrollbar class="el-scrollbar">
          <router-link class="scrollbar_item" :to="{ path: '/user' }">用户管理</router-link>
          <router-link class="scrollbar_item" to="/product">商品管理</router-link>
          <router-link class="scrollbar_item" to="/ai">Ai对话</router-link>
        </el-scrollbar>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {useUserStore} from "@/store/user.ts"
import {storeToRefs} from "pinia"
import router from "@/router/index.js";

let userStore = useUserStore()
let user = storeToRefs(userStore).user
console.log(user)

const goout_click = () => {

  // 删除指定的键值对，比如删除对应的缓存
  async function do_ccc() {
    console.log("goout", localStorage.getItem('token'))
    localStorage.removeItem('token')
    await router.push('/login')
  }
  do_ccc()
}


</script>

<style scoped>

h1{
  font-size: 30px;
}

.admin-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #111111, #333333); /* 整体背景采用从黑色到深灰色的墨风渐变，更凸显层次感 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  background: linear-gradient(to right, #111111, #333333); /* 头部背景调整为从黑色到深灰色的墨风渐变 */

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    background: rgba(0, 0, 0, 0.2); /* 调暗 logo 区域背景透明度 */
    .logo-img {
      position: relative;
      top: 6px;
      width: 140px;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    background: linear-gradient(to bottom, #111111, #333333); /* 标题区域背景采用从黑色到深灰色的墨风渐变 */
    color: #fff; /* 标题文字设为白色 */
    border-radius: 10px;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    background: linear-gradient(to right, #111111, #333333); /* 用户区域背景调整为从黑色到深灰色的墨风渐变 */
    .user-name,
    .user-role {
      color: #fff; /* 用户名字和角色文字设为白色 */
    }
    .avatar {
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }

  .logout {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    background: linear-gradient(to bottom, #111111, #333333); /* 退出按钮区域背景采用从黑色到深灰色的墨风渐变 */
    .btn {
      height: 100%;
      width: 100%;
      color: #fff; /* 按钮文字设为白色 */
      background: rgba(255, 0, 0, 0.5); /* 按钮背景设为半透明红色，契合红黑配色主题 */
      border: none; /* 去掉原有的边框 */
      transition: background 0.3s ease; /* 按钮悬停过渡效果 */
    }
    .btn:hover {
      background: rgba(255, 0, 0, 0.7); /* 悬停时加深按钮背景色，更凸显交互效果 */
    }
  }
}

.body {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
}

.sidebar {
  width: 14%;
  height: 100%;
  background: linear-gradient(to bottom, #111111, #333333); /* 侧边栏背景采用从黑色到深灰色的墨风渐变 */
}

.scrollbar_item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5px;
  min-height: 40px;
  font-size: 20px;
  box-sizing: border-box;
  border: 1px solid #444444; /* 侧边栏链接边框颜色调暗 */
  color: #fff; /* 侧边栏链接文字设为白色 */
  &:hover {
    background: rgba(255, 0, 0, 0.1); /* 悬停时稍微提亮背景，显示为淡淡的红色，体现交互 */
    transition: background 0.3s ease;
  }
}

.content {
  width: calc(100% - 200px);
  height: 100%;
  background: linear-gradient(to bottom right, #111111, #333333); /* 内容区域背景采用从黑色到深灰色的墨风渐变 */
}
</style>