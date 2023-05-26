import { defineStore } from 'pinia'

export const EquipStore = defineStore("equip", {

    state: () => {
        return {
            // 是否为一个，或者是数组？
            currentUnid: [],
            // 所有设备状态
            allEquipState: [],
            allEquipStatemMsg: ["没有请求（默认）"]
        }
    },
    actions: {
        // getCurrentUnid(unid) {
        //     this.currentUnid.push( unid)
        // },
        updateCurrentid(unid){
            this.currentUnid = []
            this.currentUnid.push(unid)
        },
        updateAllEquipState(allEquipState) {
            this.allEquipState = []
            // 错误处理，万一接收到的数据有问题（放在前面处理也行）
            this.allEquipState = allEquipState
        },
        updateAllEquipStatemMsg(info) {
            this.allEquipStatemMsg.push(info)
        }
    },
    getters: {}

})
