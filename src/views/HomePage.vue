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
    <div>
      <button @click="readAllState">获取用户所有设备信息</button>
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

// 封装发送消息
import { register, damopr, damreadall } from "../hooks/wbsockSend";

import { webSocketStore } from "../stores/websocketMsg";
import { AdminStore } from "../stores/AdminStore";
import { EquipStore } from "../stores/EquipStore";
import { ws_ADDRESS } from "../configs";

const router = useRouter();

const adminStore = AdminStore();
const equipStore = EquipStore();

const webStore = webSocketStore();
// let ws = useWebSocket(handleMessage);
let ws; // websocket实例
let timerId; // 定时器

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

// -------------------继电器操作--------------------
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
  console.log("准备完数据，开始发送");
  // console.log("!!!!!开启请求了吗？");

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
// -------------------继电器操作--------------------

// -------------------获取用户所有设备信息------------------
const readAllState = () => {
  // 不需要参数
  // let params = {
  //   opr: "open",
  //   unid: equipStore.currentUnid[0],
  //   io: io,
  // };
  let tempAllState = damreadall();
  tempAllState.token = adminStore.token;
  const tempAllStateMsg = JSON.stringify(tempAllState);
  console.log("准备完数据，开始发送");

  sendToWebsocket(tempAllStateMsg);
};

// -------------------获取用户所有设备信息------------------

onMounted(() => {
  startTimer();
});

// ------------定时处理任务-----------------

// ------------定时处理任务-----------------

// ---------------接收到websocket传来的消息-------------------
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
    // else if(returnmsg.infotype === "damreadall"){
    //   // 做错误处理：1、初始化关键的信息2、获取设备个数.length>=0(等于零说明用户没设备或是删了)
    //   console.log("获取的所有设备有几个，个数=", returnmsg.info.length)

    //   // 1、初始化关键信息可以使用上一次传过来保存到pinia的信息（以备当前收到的数据有问题）
    //   if(equipStore.allEquipState.length == 0){
    //     // Pinia里没信息
    //     let deflaultAllEquipInfo = {
    //       infotype: "初始化信息类型",
    //       info: [{
    //         ID: "default",
    //         Addr:"default",
    //         SN:"default",
    //         regdi:["default"],
    //         regdo:["default"],
    //         regai:["default"],
    //         AITime:"default",
    //         DOTime:"default",
    //         DITime:"default",
    //         AOTime:"default",
    //         ip: "default",
    //         mbInfo:"default",
    //         teamsn:"default",
    //         ainum: "default",
    //         aonum:"default",
    //         dinum:"default",
    //         donum:"default",
    //         aimode:"default",
    //         IsInverse:"default",
    //         equiptype:"default",
    //         IsTiming:"default",
    //         IsOnLine:"default",
    //         SOC:"default",
    //         IsAIValueChg:"default"
    //       }]
    //     }
    //     // 是否一直没信息判断依据变量
    //     let isUseDefault = 1
    //     equipStore.updateAllEquipState(deflaultAllEquipInfo)

    //   }
    //   // 2、一直收到有问题的数据或者长时间收不到数据，需要报告给pinia
    //   let getTimer = setInterval(() => {

    //   }, 10);
    //   // 3、信息有效的话，发送给pinia

    // }

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
}
// ---------------接收到websocket传来的消息-------------------

// -------------连接websocket后首次发送注册用户信息-------------------
const startTimer = () => {
  timerId = setTimeout(() => {
    sendRegister();
  }, 1000);
};

// 注册websocket用户（登录后立即执行）
const sendRegister = () => {
  let tempregister = register();
  tempregister.token = adminStore.token;
  const registMsg = JSON.stringify(tempregister);

  sendToWebsocket(registMsg);
};
// -------------连接websocket后首次发送注册用户信息-------------------

//--------------------所有请求的发送（判断websocket状态没问题后发送）---------------------
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
//--------------------所有请求的发送（判断websocket状态没问题后发送）---------------------

onUnmounted(() => {
  clearTimeout(timerId);
  // clearTimeout(secTimer);
});
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