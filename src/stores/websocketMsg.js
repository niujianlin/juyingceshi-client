import { defineStore } from "pinia";

export const webSocketStore = defineStore("webSocket", {
    state: () => ({
        // 推送消息
        data:[]
    }),
    actions: {
        addMsg(msg){
            this.data.push(msg)
        }
    },

    getters:{},



})