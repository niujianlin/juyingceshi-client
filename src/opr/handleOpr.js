//开启继电器请求
import { register, damopr, damreadall } from "../hooks/wbsockSend";


export default ({io}) => {

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
      
        // sendToWebsocket(damoprMsg);

        return damoprMsg
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
      
        // sendToWebsocket(damoprMsg);
        return damoprMsg
      };


      return {openOpr, closeOpr}

}
