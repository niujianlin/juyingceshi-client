import {ws_ADDRESS} from '../configs'
import {webSocketStore} from '../stores/websocketMsg'

const webStore = webSocketStore();

function useWebSocket (handleMessage) {
    const ws  = new WebSocket(ws_ADDRESS)

    const init = () => {
        bindEvent()
    }

    function bindEvent() {
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
    }

    function handleOpen(e) {
        console.log("webSocket open", e)
        webStore.addMsg(e)
        console.log("webSocketStore存入pinia", webStore)
    }

    function handleClose(e) {
        console.log("webSocket close", e)
    }

    function handleError(e) {
        console.log("webSocket error", e)
    }


    init()


    return ws

}

export default useWebSocket