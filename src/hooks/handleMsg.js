// ---------------接收到websocket传来的消息-------------------
// 接收到消息、打印pinia、在这处理数据
import Ws from "./Ws"

//     function handleMessage(e) {
//     const {data} = JSON.parse(e)

//     console.log("收消息的js，进来没？")
//     console.log("infotype = ", data.infotype)

//     switch(data.infotype) {
//         case "register":
//             console.log("注册信息：", JSON.parse( e))
//             break
//         case "EquipInfoNow":
//             console.log("当前设备信息：",JSON.parse( e))
//             // 测试断开连接后重连
//             this.close()
//             break
//         default:
//             break
//     }
//   }

  function handleMessage() {

  Ws.onmessage = function (e){
        const {data} = JSON.parse( e)

    console.log("收消息的js，进来没？")
    console.log("infotype = ", data.infotype)

    switch(data.infotype) {
        case "register":
            console.log("注册信息：", JSON.parse( e))
            break
        case "EquipInfoNow":
            console.log("当前设备信息：",JSON.parse( e))
            // 测试断开连接后重连
            this.close()
            break
        default:
            break
    }
  }
}


export {handleMessage}
