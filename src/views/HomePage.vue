<template>
  <div>
    <Header></Header>
    <features class="features">
      <Index class="box1"></Index>
      <MainBody class="box2"></MainBody>
      <Curve class="box3"></Curve>
      <Video class="box4"></Video>
      <Inform class="box5"></Inform>
    </features>
    <div class="openopr" v-for="item in openmenus" :key="item.id">
      <button @click="openOpr(item.id)">打开第一路继电器</button>
    </div>
    <div class="closeopr" v-for="item in closemenus" :key="item.id">
      <button @click="closeOpr(item.id)">打开第一路继电器</button>
    </div>
    <div class="footer">
      <span>123{{ retMsg }}</span>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Index from "./components/Index.vue";
import MainBody from "./components/MainBody.vue";
import Video from "./components/Video.vue";
import Inform from "./components/Inform.vue";
import Curve from "./components/Curve.vue";

import { useWebSocket } from "../hooks";
import { register, damopr } from "../hooks/wbsockSend";

import { ref, reactive, inject, onMounted, watch, onUnmounted } from "vue";
import { webSocketStore } from "../stores/websocketMsg";
import { AdminStore } from "../stores/AdminStore";
import { EquipStore } from "../stores/EquipStore";

const adminStore = AdminStore();
const equipStore = EquipStore();

const webStore = webSocketStore();
const ws = useWebSocket(handleMessage);
// let ws;
let retMsg = ref({});

//菜单
let openmenus = [
  { name: "打开第一路继电器", id: 1 },
  { name: "打开第二路继电器", id: 2 },
];
let closemenus = [
  { name: "关闭第一路继电器", id: 1 },
  { name: "关闭第二路继电器", id: 2 },
];

//发起开启请求
const openOpr = (id) => {};

//发起关闭请求
const closeOpr = (id) => {};

// function doSendOpen(io) {
//   let params = {
//     opr: "open",
//     unid: equipStore.currentUnid,
//     io: io
//   }

//   let tempDamopr = damopr(params)
//   tempDamopr.token = adminStore.token;
//   const damoprMsg = JSON.stringify(tempDamopr);
//   // --------------可抽出来-------------

//   // console.log("damoprMsg = ", damoprMsg, "ws.readyState = ", ws.readyState);
//   // if (typeof ws === "undefined") {
//   //   console.log("websocket还没有连接，或者连接失败，情检测");
//   //   return false;
//   // }
//   // if (ws.readyState == 3 || ws.readyState == 2 || ws.readyState == 0) {
//   //   console.log("websocket已经关闭，或者连接失败，或者正在链接，情检测");
//   //   return false;
//   // }
//   // ws.send(damoprMsg);

//   sendToWebsocket(damoprMsg)

// }

onMounted(() => {
  startTimer();
});

function handleMessage(e) {
  console.log("handleMessage:", e.data);
  retMsg.value = e.data;
  console.log("pinia里的数据：", webStore);
}

let timerId;
const startTimer = () => {
  timerId = setTimeout(() => {
    sendRegister();
  }, 1000);
};

// 启动websocket

const sendRegister = () => {
  let tempregister = register();
  tempregister.token = adminStore.token;
  const registMsg = JSON.stringify(tempregister);
  // --------------可抽出来-------------

  // console.log("registMsg = ", registMsg, "ws.readyState = ", ws.readyState);
  // if (typeof ws === "undefined") {
  //   console.log("websocket还没有连接，或者连接失败，情检测");
  //   return false;
  // }
  // if (ws.readyState == 3 || ws.readyState == 2 || ws.readyState == 0) {
  //   console.log("websocket已经关闭，或者连接失败，情检测");
  //   return false;
  // }
  // ws.send(registMsg);

  sendToWebsocket(registMsg);
};

// 发送websocket请求
const sendToWebsocket = (Msg) => {
  console.log("Msg = ", Msg, "ws.readyState = ", ws.readyState);
  if (typeof ws === "undefined") {
    console.log("websocket还没有连接，或者连接失败，情检测");
    return false;
  }
  if (ws.readyState == 3 || ws.readyState == 2 || ws.readyState == 0) {
    console.log("websocket已经关闭，或者连接失败，或者正在链接，情检测");
    return false;
  }
  ws.send(Msg);
};

onUnmounted(() => {
  clearTimeout(timerId);
});

// 判断是否连接上websocket
// const prepare = () => {
//   console.log("ws.readyState = ", ws.readyState);
//   while (
//     ws.readyState == 0 ||
//     ws.readyState == 2 ||
//     ws.readyState == 3 ||
//     ws.readyState == "undefine"
//   ) {
//     console.log("进入循环后ws.readyState = ", ws.readyState);
//     if (ws.readyState == 1) {
//       break;
//     }
//   }
//   let tempregister = register();
//   tempregister.token = adminStore.token;
//   const registMsg = JSON.stringify(tempregister);
//   console.log("registMsg = ", registMsg, "ws.readyState = ", ws.readyState);
//   if (typeof ws === "undefined") {
//     console.log("websocket还没有连接，或者连接失败，情检测");
//     return false;
//   }
//   if (ws.readyState == 3 || ws.readyState == 2 || ws.readyState == 0) {
//     console.log("websocket已经关闭，或者连接失败，情检测");
//     return false;
//   }
//   ws.send(registMsg);
// };
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "PingFang SC", "Microsoft Yahei", sans-serif;
  font-size: 14px;
}

a {
  text-decoration-line: none;
}

body {
  /* background-color: #e3e3e3; */
  background-image: url("../../static/img/full.png");
}

:root {
  --primary-color: #ff434f;
  --secondary-color: #e3e3e3;
  --text-color-lightest: #e7e9ec;
  --text-color-darker: #2e2e2e;
  --text-color-dark: #494949;
  --text-color-gray: #8b8b8b;
  --text-color-dark-gray: #727272;
  --text-color-light-gray: #c6c6c6;
  --backdrop-color: rgba(42, 42, 42, 0.69);
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.features {
  /* border: 2px solid grey; */
  display: grid;
  width: 100vw;
  grid-template-areas:
    "index mainbody video"
    "index mainbody inform"
    "index curve inform";
  grid-template-columns: 16.8% 63.5% 18%;
  grid-template-rows: 315px 133px 210px;
}

.box1 {
  grid-area: index;
  /* border: 1px solid grey; */
  /* padding: 10px; */
}

.box2 {
  grid-area: mainbody;
  /* border: 1px solid grey; */
  /* padding: 10px; */
}

.box3 {
  grid-area: curve;
  /* border: 1px solid grey; */
  /* padding: 10px; */
}

.box4 {
  grid-area: video;
  /* border: 1px solid grey; */
  /* padding: 27px; */
  margin-top: 5px;
}

.box5 {
  grid-area: inform;
  /* border: 1px solid grey; */
  /* padding: 10px; */
  margin-top: 5px;
}
</style>