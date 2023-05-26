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
    <div class="openopr" v-for="item in openmenus" :key="item.io">
      <button @click="openOpr(item.io)">打开第{{ item.io }}路继电器</button>
    </div>
    <div class="closeopr" v-for="item in closemenus" :key="item.io">
      <button @click="closeOpr(item.io)">打开第{{ item.io }}路继电器</button>
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

import { ref, reactive, inject, onMounted, watch, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// import { useWebSocket } from "../hooks";
import { register, damopr } from "../hooks/wbsockSend";

import { webSocketStore } from "../stores/websocketMsg";
import { AdminStore } from "../stores/AdminStore";
import { EquipStore } from "../stores/EquipStore";
import { ws_ADDRESS } from "../configs";

const router = useRouter();

const adminStore = AdminStore();
const equipStore = EquipStore();

const webStore = webSocketStore();
// let ws = useWebSocket(handleMessage);
let ws;

let retMsg = ref({});

// --------------- websocket服务-------------------
useWebSocket(handleMessage);

function useWebSocket(handleMessage) {
  ws = new WebSocket(ws_ADDRESS);

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    ws.addEventListener("open", handleOpen, false);
    ws.addEventListener("close", handleClose, false);
    ws.addEventListener("error", handleError, false);
    ws.addEventListener("message", handleMessage, false);
  }

  function handleOpen(e) {
    console.log("---------------打开websocket连接了--------------");
    console.log("webSocket open", e);
    webStore.addMsg(e);
    console.log("webSocketStore存入pinia", webStore);
  }

  function handleClose(e) {
    console.log("webSocket close", e);
    console.log("---------------正在关闭--------------");
    console.log("---------------正在重启--------------");
    returnWebsocket();
  }

  function handleError(e) {
    console.log("webSocket error", e);
    chongreturnWebsocketqifuwu();
  }

  init();
}

// 重启websocket服务
function returnWebsocket() {
  useWebSocket(handleMessage);
  startTimer();
}

// ----------------------------------------------

//菜单
let openmenus = [
  { name: "打开第一路继电器", io: 1 },
  { name: "打开第二路继电器", io: 2 },
];
let closemenus = [
  { name: "关闭第一路继电器", io: 1 },
  { name: "关闭第二路继电器", io: 2 },
];

//开启继电器请求
const openOpr = (io) => {
  let params = {
    opr: "open",
    unid: equipStore.currentUnid[0],
    io: io,
  };
  let tempdamopr = damopr(JSON.parse(JSON.stringify(params)));
  tempdamopr.token = adminStore.token;
  const damoprMsg = JSON.stringify(tempdamopr);
  console.log("!!!!!开启请求了吗？");

  sendToWebsocket(damoprMsg);
};

//关闭继电器请求
const closeOpr = (io) => {
  let params = {
    opr: "close",
    unid: equipStore.currentUnid[0],
    io: io,
  };
  let tempdamopr = damopr(params);
  tempdamopr.token = adminStore.token;
  const damoprMsg = JSON.stringify(tempdamopr);

  sendToWebsocket(damoprMsg);
};

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

// function secStart() {
//   ws = useWebSocket(handleMessage);

//   let secTimer = setTimeout(() => {
//     console.log("还有没有ws：", ws);
//     if (ws.readyState === 3) {
//       sendRegister();
//     }
//   }, 2000);
// }

// 接收到消息、打印pinia、在这处理数据
function handleMessage(e) {
  console.log("handleMessage:", e.data);
  let returnmsg = JSON.parse(e.data);

  console.log("e.data.infotype：", returnmsg.infotype);
  console.log("JSON.parse( e.data ):", returnmsg);

  try {
    // 将当前设备存到pinia
    if (returnmsg.infotype === "EquipInfoNow") {
      equipStore.updateCurrentid(returnmsg.sn);
    }
    retMsg.value = e.data;
    console.log("pinia里的webStore数据：", webStore);
    console.log("pinia里的equipStore数据：", equipStore);
    console.log("pinia里的adminStore数据：", adminStore);
  } catch (err) {
    console.log("错误是：", err);
  }
  // 测试断开连接
  if (returnmsg.infotype === "EquipInfoNow") {
    ws.close();
  }
  // secStart();
}

let timerId;
const startTimer = () => {
  timerId = setTimeout(() => {
    // if(ws.readyState==0 || ws.readyState>1){
    //   try{
    //     console.log("断线需要重连")
    //     // 看看会不会影响到pinia里的数据
    //     console.log("看看会不会影响到pinia里的数据: adminStore.token=",adminStore.token)
    //   }catch(e){
    //     console.log("websocket断线重连出现了问题")
    //   }
    // }
    sendRegister();
  }, 1000);
};

// 注册websocket用户（登录后立即执行）
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
    console.log(
      "websocket已经关闭，或者连接失败，或者正在链接，情检测，ws.readyState = ",
      ws.readyState
    );
    return false;
  }
  ws.send(Msg);
};

onUnmounted(() => {
  clearTimeout(timerId);
  // clearTimeout(secTimer);
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