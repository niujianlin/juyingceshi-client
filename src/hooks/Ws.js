const WS_MODE = {
    REGISTER: 'register',
    EQUIPINFONOW: 'EquipInfoNow'
}

// import { handleMessage } from "../hooks/handleMsg";


class Ws extends WebSocket {
    constructor (url, wsReConnect) {
    // constructor (url, wsReConnect, handleMessage) {
        super(url)
        // this.connectedStatus = false
        this.wsUrl = url

        this.wsReConnect = wsReConnect
        // this.handleMessage = handleMessage
        
        this.init()
    }

    init(){
        this.bindEvent()
    }

    bindEvent () {
        this.addEventListener('open', this.handleOpen, false)
        this.addEventListener('close', this.handleClose, false)
        this.addEventListener('error', this.handleError, false)
        this.addEventListener('message', this.handleMessage, false)
    }

    handleOpen() {
        console.log("---------------websocket连接打开----------")
        this.connectedStatus = true
    }

    handleClose() {
        console.log("---------------websocket连接关闭----------")
        this.reconnect()
    }

    handleError(e) {
        console.log("---------------websocket发生错误----------",e)
        this.connectedStatus = false

    }

    // handleMessage(data) {
    //     const {infotype} = this.receiveMsg(data)


    //     switch(infotype) {
    //         case WS_MODE.REGISTER:
    //             console.log("注册信息：", data)
    //             break
    //         case WS_MODE.EQUIPINFONOW:
    //             console.log("当前设备信息：",data)
    //             // 测试断开连接后重连
    //             this.close()
    //             break
    //         default:
    //             break
    //     }
        
    // }

    reconnect() {
        this.wsReConnect()
    }


    receiveMsg({data}) {
        return JSON.parse(data)
    }

    sendMsg(data) {
        return this.send(JSON.stringify(data))
    }

    // static create(url, wsReConnect,handleMessage) {
    static create(url, wsReConnect) {
        // return new Ws(url, wsReConnect, handleMessage)
        return new Ws(url, wsReConnect)
    }

}

export default Ws