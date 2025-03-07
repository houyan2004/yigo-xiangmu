<template>
  <div class="body">
    <div class="title">
      <div style="color: white; margin-top: 10px;text-align: center; font-size: 25px">Ai 对话聊天</div>
    </div>
    <div class="jilu">
      <el-scrollbar ref="scrollbarRef">
        <div v-for="(item, index) in chatMessages" :key="index">
          <div v-if="item.role === 'user'" class="user-message">
            <div class="mess1">
              <div class="avatar"><img class="tou_img" :src="user.touxianimg||'https://mp-8dd34d12-2d1e-44ef-b563-4e772d50f668.cdn.bspapp.com/yigo/hy/image/img/suang.png'" ></div>
              <div class="user-name">{{user.username}}</div>
            </div>
            <div class="user-content" v-html="markdownToHtml(item.content)"></div>
            <div class="user-timestamp">{{ item.timestamp }}</div>
          </div>
          <div v-else class="ai-message">
            <div class="mess1">
              <div class="avatar"><img class="tou_img" src="/public/pic/114.png"></div>
              <div class="ai-name">AI</div>
            </div>
            <div class="ai-content" v-html="markdownToHtml(item.content)"></div>
            <div class="ai-timestamp">{{ item.timestamp }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="input">
      <el-input
          size="large"
          v-model="inputText"
          placeholder="请输入内容"
          class="input-box"
          @keyup.enter="sendMessage"
      ></el-input>
      <el-button size="large" type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<style scoped>
.avatar{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  box-sizing: border-box;
  background: #111111;
  overflow: hidden;
}
.tou_img {
  width: 100%;
  height: 100%;
}
.mess1{
  display: flex;
  align-items: center;
}

.body {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  background:url("/public/pic/112360863.gif");
  color: #333;
}

.jilu {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.input {
  display: flex;
  align-items: center;
  padding: 10px;
}

.input-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  flex: 1;
  margin-right: 10px;
}

.el-button {
  border-radius: 5px;
}

.user-message {
  background-color: #dcf8c6;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.ai-message {
  background-color: #c6e2ff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.user-content{
  box-sizing: border-box;
  padding-left: 40px;
}
.ai-content{
  box-sizing: border-box;
  padding-left: 40px;
}
</style>

<script>
import { ref, reactive, onMounted, nextTick } from "vue";
import { ElMessage, ElNotification, ElButton, ElInput } from "element-plus";
import MarkdownIt from "markdown-it";
import {useUserStore} from "@/store/user.ts";
import {storeToRefs} from "pinia";
import http from "@/utils/api.js";

// 引入markdown - it库
const md = new MarkdownIt(); // 创建markdown - it实例

export default {
  name: "Ai",
  setup() {
    const inputText = ref(""); // 绑定输入框的值
    const chatMessages = ref([]); // 用于存储聊天记录，是一个数组，每个元素包含角色和内容等信息
    let userStore = useUserStore()
    let user = storeToRefs(userStore).user
    const token = ref("");
    onMounted(() => {
        token.value = localStorage.getItem("token");
      console.log("token", token)
    });

    const markdownToHtml = (text) => {
      return md.render(text); // 将markdown文本转换为html，用于展示
    };

    const getChartAi = (text) => {
      console.log("token", token.value)
      console.log("text", text);
      http.post("/ai/chat", {
        msg: text
      }).then(res => {
        if (res.code === 1) {
          // 将AI回复添加到聊天记录中，角色设为 'ai' 等（根据实际后端返回调整）
          chatMessages.value.push({ role: "ai", content: res.data });
          // 在添加消息后调用滚动到底部的方法，使用nextTick确保DOM更新后再执行
        } else {
          ElMessage({
            message: res.msg,
            type: "error",
            duration: 1000
          });
        }
      }).catch(err => {
        console.log(err);
        ElNotification({
          title: "Error",
          message: "请联系管理员",
          type: "error"
        });
      });
    };

    const sendMessage = () => {
      if (inputText.value.trim() === "") {
        ElMessage({
          message: "请输入内容",
          type: "warning",
          duration: 1000
        });
        return;
      }
      // 将用户输入的消息添加到聊天记录中，角色设为 'user'
      chatMessages.value.push({ role: "user", content: inputText.value });
      getChartAi(inputText.value);
      inputText.value = ""; // 清空输入框
    };

    // 滚动到底部的方法

    return {
      inputText,
      chatMessages,
      sendMessage,
      markdownToHtml,
      user,
    };
  }
};
</script>