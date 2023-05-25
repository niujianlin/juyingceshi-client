import { defineStore } from 'pinia'

export const EquipStore = defineStore("equip", {

    state: () => {
        return {
            // 是否为一个，或者是数组？
            currentUnid: []
        }
    },
    actions: {
        // getCurrentUnid(unid) {
        //     this.currentUnid.push( unid)
        // },
        updateCurrentid(unid){
            this.currentUnid = []
            this.currentUnid.push(unid)
        }
    },
    getters: {}

})
