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
let timerId; // 定时器

let retMsg = ref({});

// --------------- websocket服务-------------------
// import { handleMessage } from "../hooks/handleMsg";

// useWebSocket(handleMessage);

// function useWebSocket(handleMessage) {
//   ws = new WebSocket(ws_ADDRESS);

//   const init = () => {
//     bindEvent();
//   };

//   function bindEvent() {
//     ws.addEventListener("open", handleOpen, false);
//     ws.addEventListener("close", handleClose, false);
//     ws.addEventListener("error", handleError, false);
//     ws.addEventListener("message", handleMessage, false);
//   }

//   function handleOpen(e) {
//     console.log("---------------打开websocket连接了--------------");
//     console.log("webSocket open", e);
//     webStore.addMsg(e);
//     // console.log("webSocketStore存入pinia", webStore);
//   }

//   function handleClose(e) {
//     console.log("webSocket close", e);
//     console.log("---------------正在关闭--------------");
//     console.log("---------------正在重启--------------");
//     reStartWebSocketAndInit();
//   }

//   function handleError(e) {
//     console.log("webSocket error", e);
//     // chongreStartWebSocketAndInitqifuwu();
//   }

//   init();
// }

// // 重启websocket服务（需要初始化很多东西）
// function reStartWebSocketAndInit() {
//   useWebSocket(handleMessage);
//   // 用户重新注册
//   startRegisterTimer();
//   // 需要定期收数据的定时器的初始化

//   //1、获取用户所有设备的定时任务
//   getAllEquipsCount = 0; // 收到几次
//   isAllEquipsUseDefault = 0; // 发送默认数据次数

//   // 定时器方法，开启定时
//   AllEquipsTimer = setInterval(storeDefaultOrLastone, 10000);
// }

// -------------连接websocket后首次发送注册用户信息-------------------
const startRegisterTimer = () => {
  timerId = setTimeout(() => {
    console.log("要sendRegister了");
    sendRegister();
  }, 1000);
};

// 注册websocket用户（登录后立即执行）
const sendRegister = () => {
  console.log("进入sendRegister了");
  let tempregister = register();
  tempregister.token = adminStore.token;
  const registMsg = JSON.stringify(tempregister);

  sendToWebsocket(registMsg);
};
// -------------连接websocket后首次发送注册用户信息-------------------

// ----------------websocket服务-------------------------

// 这里要

let ws = null; // websocket实例

import Ws from "../hooks/Ws.js";
import module from "../opr/handleRegist.js";

// 使用handleMessage处理消息
// import { handleMessage } from "../hooks/handleMsg.js";
// handleMessage();

function wsConnect() {
  // ws = Ws.create(ws_ADDRESS, wsReConnect, handleMessage);
  ws = Ws.create(ws_ADDRESS, wsReConnect);
  clearTimeout(timerId);
  console.log("往下走了吗？");

  ws.onmessage = function (e) {
    console.log("e = ", e);
    // const { data } = e;

    console.log(" AdminStore = ", adminStore);
    // console.log("收消息的js，进来没？");
    console.log("infotype = ", JSON.parse(e.data));
    let ret = JSON.parse(e.data);

    if (ret.info === "No Authority") {
      // 当连接出现问题时，重新建立连接
      console.log("设备出了故障，或者为授权");
    }

    switch (ret.infotype) {
      case "register":
        let a = 6;
        console.log("注册信息：", ret);
        const regis = module({ ret, a });
        const { handleRegist } = regis;
        handleRegist();
        break;
      case "EquipInfoNow":
        console.log("当前设备信息：", ret);
        // 测试断开连接后重连
        this.close();
        break;
      case "untoken":
        console.log("ret.infotype是untoken, 操作失败，重新登录");
        router.push("/login");
      default:
        console.log("当前的消息是：", ret);
        break;
    }
  };

  startRegisterTimer();
}
wsConnect();

function wsReConnect() {
  console.log("ws的状态：readystate = ", ws.readyState);
  if (ws.readyState == 0 || ws.readyState == 2 || ws.readyState == 3) {
    return wsConnect();
  }
}

// ws.onmessage = function (e) {
//   console.log("e = ", e);
//   // const { data } = e;

//   console.log("收消息的js，进来没？");
//   console.log("infotype = ", JSON.parse(e.data));
//   let ret = JSON.parse(e.data);

//   switch (ret.infotype) {
//     case "register":
//       console.log("注册信息：", ret);
//       break;
//     case "EquipInfoNow":
//       console.log("当前设备信息：", ret);
//       // 测试断开连接后重连
//       this.close();
//       break;
//     default:
//       break;
//   }
// };

// ---------------------websocket服务-------------------------

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
// import OprModule from '../opr/handleOpr'

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

// onMounted(() => {
//   startRegisterTimer();
// });

// ------------定时处理任务-----------------

// 防止过快的信息过来
let currentProcessTime, lastProcessTime;
let handleMsgTimeInterval = undefined;

// 处理消息迟迟不来

// Pinia里没信息
let deflaultAllEquipInfo = {
  infotype: "初始化信息类型",
  info: [
    {
      ID: "default",
      Addr: "default",
      SN: "default",
      regdi: ["default"],
      regdo: ["default"],
      regai: ["default"],
      AITime: "default",
      DOTime: "default",
      DITime: "default",
      AOTime: "default",
      ip: "default",
      mbInfo: "default",
      teamsn: "default",
      ainum: "default",
      aonum: "default",
      dinum: "default",
      donum: "default",
      aimode: "default",
      IsInverse: "default",
      equiptype: "default",
      IsTiming: "default",
      IsOnLine: "default",
      SOC: "default",
      IsAIValueChg: "default",
    },
  ],
};

//1、获取用户所有设备的定时任务
let getAllEquipsCount = 0; // 收到几次
let isAllEquipsUseDefault = 0; // 发送默认数据次数

// 定时器方法，开启定时
let AllEquipsTimer = setInterval(storeDefaultOrLastone, 10000);

// 处理应该定时来数据的任务
function storeDefaultOrLastone() {
  if (getAllEquipsCount == 0) {
    // 从开始就没接收到过正常数据
    if (isAllEquipsUseDefault < 3) {
      // 第一次超时，需要发送默认数据给pinia
      console.log(
        "---从连接建立，获取所有设备信息的消息一直没到，触发超时，getAllEquipsCount = ",
        getAllEquipsCount
      );
      equipStore.updateAllEquipState(deflaultAllEquipInfo); // 多更新了两次
      console.log("---超时后的equipStore=", equipStore.allEquipStatemMsg);
      isAllEquipsUseDefault++;
    } else {
      // 没正常应答且3次超时，销毁定时器,不再定时
      console.log("---第四次超时，getAllEquipsCount = ", getAllEquipsCount);
      equipStore.updateAllEquipStatemMsg(
        "从开始就未收到消息，这是第四次超时了，数据不再变化"
      );
      console.log("---4次超时equipStore=", equipStore.allEquipStatemMsg);
      clearInterval(AllEquipsTimer);
      console.log("消除定时了-------------------");
    }
  } else {
    // 有正常数据后又出现了收不到的情况
    if (isAllEquipsUseDefault < 3) {
      // 发送上次的数据给pinia，相当于pinia不用更改
      isAllEquipsUseDefault++;

      console.log(
        "---以前有有效数据，现在超时了，超时一次后的 equipStore=",
        equipStore.allEquipStatemMsg,
        "，isAllEquipsUseDefault（是否使用默认数据（以前的有效数据）） = ",
        isAllEquipsUseDefault
      );
    } else {
      //发送默认数据超过三次(store里存在上次的正常数据)，终止计时器
      equipStore.updateAllEquipStatemMsg(
        "发送过默认数据（以前的有效数据），现在是第四次超时了，设备状态有问题"
      );
      console.log(
        "---发送默认数据（以前的有效数据），这是第四次超时了，equipStore=",
        equipStore.allEquipStatemMsg
      );
      clearInterval(AllEquipsTimer);
      console.log("消除定时了-------------------");
    }
  }
}

// ------------定时处理任务-----------------

// ---------------接收到websocket传来的消息-------------------
// // 接收到消息、打印pinia、在这处理数据
// function handleMessage(e) {
//   currentProcessTime = Date.now();

//   if (handleMsgTimeInterval == undefined) {
//     // handleMsgTimeInterval初始化为currentProcessTime，处理第一次的结果
//     handleMsgTimeInterval = currentProcessTime;
//   } else {
//     handleMsgTimeInterval = currentProcessTime - lastProcessTime;
//   }

//   console.log(
//     "两次消息接收的间隔handleMsgTimeInterval =",
//     handleMsgTimeInterval,
//     "  currentProcessTime",
//     currentProcessTime,
//     "  lastProcessTime",
//     lastProcessTime
//   );

//   if (handleMsgTimeInterval > 3000) {
//     // 限制一秒处理一次
//     console.log("handleMessage(接收的消息):", e.data);
//     let returnmsg = JSON.parse(e.data);

//     console.log("消息类型infotype：", returnmsg.infotype);

//     try {
//       // 将当前设备存到pinia
//       if (returnmsg.infotype === "EquipInfoNow") {
//         equipStore.updateCurrentid(returnmsg.sn);
//       } else if (returnmsg.infotype === "damreadall") {
//         // 先做错误判断，后存store
//         // 一会写...
//         equipStore.updateAllEquipState(returnmsg);
//         console.log("收到获取用户所有设备的响应");
//         getAllEquipsCount++; //获取到数据的次数

//         //更新msg状态，方便调试
//         // isAllEquipsUseDefault代表存pinia数据是不是过期的，isAllEquipsUseDefault=0说明间隔器到期前存的是新数据！！！
//         if (isAllEquipsUseDefault > 0) {
//           // 说明pinia存的过期数据，此时触发了响应，所以msg要更新成正常
//           equipStore.updateAllEquipStatemMsg("触发了响应，正常");
//         }

//         isAllEquipsUseDefault = 0; // 开始发送了，因此置为0，代表不需要发送默认数据

//         resetTimer();
//       }
//       retMsg.value = e.data;
//       console.log("pinia里的webStore数据：", webStore);
//       console.log("pinia里的equipStore数据：", equipStore);
//       console.log("pinia里的adminStore数据：", adminStore);
//     } catch (err) {
//       console.log("错误是：", err);
//     }

//     // // 测试断开连接
//     // if (returnmsg.infotype === "EquipInfoNow") {
//     //   ws.close();
//     // }
//   }

//   lastProcessTime = currentProcessTime;
// }

// // 重启定时器方法
// function resetTimer() {
//   // 如果收到请求的值变化，则清除计时器，并重启计时器
//   console.log("重启定时了-------------------");
//   clearInterval(AllEquipsTimer);
//   AllEquipsTimer = setInterval(storeDefaultOrLastone, 10000);
// }

// ---------------接收到websocket传来的消息-------------------

//--------------------所有请求的发送（判断websocket状态没问题后发送）---------------------
// 发送websocket请求
const sendToWebsocket = (Msg) => {
  console.log("Msg（发送的消息） = ", Msg, "ws.readyState = ", ws.readyState);
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
  console.log("马上要发消息了，当前的ws是：", ws);
  ws.send(Msg);
};
//--------------------所有请求的发送（判断websocket状态没问题后发送）---------------------

onUnmounted(() => {
  clearInterval(timerId);
  // clearInterval(secTimer);
  clearInterval(AllEquipsTimer);
  // clearInterval(frequecyTimer);
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