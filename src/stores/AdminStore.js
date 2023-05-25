import { defineStore } from 'pinia'

export const AdminStore = defineStore("admin", {

    state: () => {
        return {
            // userid: 0,
            userName: [],// 长度 即 用户断线重连了多少次
            token: ""
        }
    },
    actions: {
        pushUserName(name){
            this.userName.push( name)
        },
        pushToken(token) {
            this.token = token
        }

    },
    getters: {}

})
